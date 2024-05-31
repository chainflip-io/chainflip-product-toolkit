use base58::{FromBase58, ToBase58};
use bech32::{u5, FromBase32, ToBase32, Variant};
use itertools;
use std::convert::TryInto;
use utils::{sha2_256, SliceToArray};
use wasm_bindgen::prelude::*;

mod utils;

fn to_varint(value: u64) -> Vec<u8> {
    let mut result = Vec::default();
    let len = match value {
        0..=0xFC => 1,
        0xFD..=0xFFFF => {
            result.push(0xFD_u8);
            2
        }
        0x010000..=0xFFFFFFFF => {
            result.push(0xFE_u8);
            4
        }
        _ => {
            result.push(0xFF_u8);
            8
        }
    };
    result.extend(value.to_le_bytes().iter().take(len));
    result
}

#[wasm_bindgen]
pub enum BitcoinNetwork {
    Mainnet,
    Testnet,
    Regtest,
}

impl BitcoinNetwork {
    fn p2pkh_address_version(&self) -> u8 {
        match self {
            BitcoinNetwork::Mainnet => 0,
            BitcoinNetwork::Testnet | BitcoinNetwork::Regtest => 111,
        }
    }

    fn p2sh_address_version(&self) -> u8 {
        match self {
            BitcoinNetwork::Mainnet => 5,
            BitcoinNetwork::Testnet | BitcoinNetwork::Regtest => 196,
        }
    }

    fn bech32_and_bech32m_address_hrp(&self) -> &'static str {
        match self {
            BitcoinNetwork::Mainnet => "bc",
            BitcoinNetwork::Testnet => "tb",
            BitcoinNetwork::Regtest => "bcrt",
        }
    }
}

pub enum Error {
    /// The address is invalid
    InvalidAddress,
}

const SEGWIT_VERSION_ZERO: u8 = 0;
const SEGWIT_VERSION_TAPROOT: u8 = 1;
const SEGWIT_VERSION_MAX: u8 = 16;
const MIN_SEGWIT_PROGRAM_BYTES: u32 = 2;
const MAX_SEGWIT_PROGRAM_BYTES: u32 = 40;

#[derive(Clone, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub enum ScriptPubkey {
    P2PKH([u8; 20]),
    P2SH([u8; 20]),
    P2WPKH([u8; 20]),
    P2WSH([u8; 32]),
    Taproot([u8; 32]),
    OtherSegwit { version: u8, program: Vec<u8> },
}

impl SerializeBtc for ScriptPubkey {
    fn btc_encode_to(&self, buf: &mut Vec<u8>) {
        self.program().btc_encode_to(buf)
    }

    fn size(&self) -> usize {
        self.program().size()
    }
}

impl ScriptPubkey {
    fn program(&self) -> BitcoinScript {
        match self {
            ScriptPubkey::P2PKH(hash) => BitcoinScript::new(&[
                BitcoinOp::Dup,
                BitcoinOp::Hash160,
                BitcoinOp::PushArray20 { bytes: *hash },
                BitcoinOp::EqualVerify,
                BitcoinOp::CheckSig,
            ]),
            ScriptPubkey::P2SH(hash) => BitcoinScript::new(&[
                BitcoinOp::Hash160,
                BitcoinOp::PushArray20 { bytes: *hash },
                BitcoinOp::Equal,
            ]),
            ScriptPubkey::P2WPKH(hash) => BitcoinScript::new(&[
                BitcoinOp::PushVersion {
                    version: SEGWIT_VERSION_ZERO,
                },
                BitcoinOp::PushArray20 { bytes: *hash },
            ]),
            ScriptPubkey::P2WSH(hash) => BitcoinScript::new(&[
                BitcoinOp::PushVersion {
                    version: SEGWIT_VERSION_ZERO,
                },
                BitcoinOp::PushArray32 { bytes: *hash },
            ]),
            ScriptPubkey::Taproot(hash) => BitcoinScript::new(&[
                BitcoinOp::PushVersion {
                    version: SEGWIT_VERSION_TAPROOT,
                },
                BitcoinOp::PushArray32 { bytes: *hash },
            ]),
            ScriptPubkey::OtherSegwit { version, program } => BitcoinScript::new(&[
                BitcoinOp::PushVersion { version: *version },
                BitcoinOp::PushBytes {
                    bytes: program.clone(),
                },
            ]),
        }
    }

    fn to_address(&self, network: &BitcoinNetwork) -> Result<String, JsError> {
        let (data, maybe_bech, version) = match self {
            ScriptPubkey::P2PKH(data) => (&data[..], None, network.p2pkh_address_version()),
            ScriptPubkey::P2SH(data) => (&data[..], None, network.p2sh_address_version()),
            ScriptPubkey::P2WPKH(data) => (&data[..], Some(Variant::Bech32), SEGWIT_VERSION_ZERO),
            ScriptPubkey::P2WSH(data) => (&data[..], Some(Variant::Bech32), SEGWIT_VERSION_ZERO),
            ScriptPubkey::Taproot(data) => {
                (&data[..], Some(Variant::Bech32m), SEGWIT_VERSION_TAPROOT)
            }
            ScriptPubkey::OtherSegwit { version, program } => {
                (&program[..], Some(Variant::Bech32m), *version)
            }
        };
        if let Some(variant) = maybe_bech {
            let version = u5::try_from_u8(version);
            bech32::encode(
                network.bech32_and_bech32m_address_hrp(),
                itertools::chain!(version, data.to_base32()).collect::<Vec<_>>(),
                variant,
            )
            .or(Err(JsError::new("Failed to encode bech32 address.")))
        } else {
            const CHECKSUM_LENGTH: usize = 4;
            let mut buf = Vec::with_capacity(1 + data.len() + CHECKSUM_LENGTH);
            buf.push(version);
            buf.extend_from_slice(data);
            let checksum =
                sha2_256(&sha2_256(&buf))[..CHECKSUM_LENGTH].as_array::<CHECKSUM_LENGTH>();
            buf.extend(checksum);
            Ok(buf.to_base58())
        }
    }

    fn try_from_address(address: &str, network: &BitcoinNetwork) -> Result<Self, Error> {
        // See https://en.bitcoin.it/wiki/Base58Check_encoding
        fn try_decode_as_base58(address: &str, network: &BitcoinNetwork) -> Option<ScriptPubkey> {
            const CHECKSUM_LENGTH: usize = 4;
            const PAYLOAD_LENGTH: usize = 21;

            let data: [u8; PAYLOAD_LENGTH + CHECKSUM_LENGTH] =
                address.from_base58().ok()?.try_into().ok()?;

            let (payload, checksum) = data.split_at(data.len() - CHECKSUM_LENGTH);

            if &sha2_256(&sha2_256(payload))[..CHECKSUM_LENGTH] == checksum {
                let [version, hash @ ..] = payload.as_array::<PAYLOAD_LENGTH>();
                if version == network.p2pkh_address_version() {
                    Some(ScriptPubkey::P2PKH(hash.as_array()))
                } else if version == network.p2sh_address_version() {
                    Some(ScriptPubkey::P2SH(hash.as_array()))
                } else {
                    None
                }
            } else {
                None
            }
        }

        // See https://en.bitcoin.it/wiki/BIP_0350
        fn try_decode_as_bech32_or_bech32m(
            address: &str,
            network: &BitcoinNetwork,
        ) -> Option<ScriptPubkey> {
            let (hrp, data, variant) = bech32::decode(address).ok()?;
            if hrp == network.bech32_and_bech32m_address_hrp() {
                let version = data.first()?.to_u8();
                let program = Vec::from_base32(&data[1..]).ok()?;
                match (version, variant, program.len() as u32) {
                    (SEGWIT_VERSION_ZERO, Variant::Bech32, 20) => {
                        Some(ScriptPubkey::P2WPKH(program.as_array()))
                    }
                    (SEGWIT_VERSION_ZERO, Variant::Bech32, 32) => {
                        Some(ScriptPubkey::P2WSH(program.as_array()))
                    }
                    (SEGWIT_VERSION_TAPROOT, Variant::Bech32m, 32) => {
                        Some(ScriptPubkey::Taproot(program.as_array()))
                    }
                    (
                        SEGWIT_VERSION_TAPROOT..=SEGWIT_VERSION_MAX,
                        Variant::Bech32m,
                        (MIN_SEGWIT_PROGRAM_BYTES..=MAX_SEGWIT_PROGRAM_BYTES),
                    ) => Some(ScriptPubkey::OtherSegwit {
                        version,
                        program: program
                            .try_into()
                            .expect("Checked for MAX_SEGWIT_PROGRAM_BYTES"),
                    }),
                    _ => None,
                }
            } else {
                None
            }
        }

        try_decode_as_base58(address, network)
            .or_else(|| try_decode_as_bech32_or_bech32m(address, network))
            .ok_or(Error::InvalidAddress)
    }
}

trait SerializeBtc {
    /// Encodes this item to a byte buffer.
    fn btc_encode_to(&self, buf: &mut Vec<u8>);
    /// The exact size this object will have once serialized.
    fn size(&self) -> usize;
    /// Returns a serialized bitcoin payload.
    fn btc_serialize(&self) -> Vec<u8> {
        let mut buf = Vec::with_capacity(self.size());
        self.btc_encode_to(&mut buf);
        buf
    }
}

impl<T: SerializeBtc> SerializeBtc for &[T] {
    fn btc_encode_to(&self, buf: &mut Vec<u8>) {
        buf.extend(to_varint(self.len() as u64));
        for t in self.iter() {
            t.btc_encode_to(buf);
        }
    }

    fn size(&self) -> usize {
        let s = self.iter().map(|t| t.size()).sum::<usize>();
        s + to_varint(s as u64).len()
    }
}

/// Subset of ops needed for Chainflip.
///
/// For reference see https://en.bitcoin.it/wiki/Script
#[derive(Clone, PartialEq, Eq)]
pub enum BitcoinOp {
    PushUint { value: u32 },
    PushBytes { bytes: Vec<u8> },
    Drop,
    CheckSig,
    Dup,
    Hash160,
    EqualVerify,
    Equal,
    // Not part of the bitcoin spec, implemented for convenience
    PushArray20 { bytes: [u8; 20] },
    PushArray32 { bytes: [u8; 32] },
    PushVersion { version: u8 },
}

#[derive(Clone, PartialEq, Eq)]
pub struct BitcoinScript {
    bytes: Vec<u8>,
}

impl BitcoinScript {
    fn new(ops: &[BitcoinOp]) -> Self {
        let mut bytes = Vec::with_capacity(ops.iter().map(|op| op.size()).sum::<usize>());
        for op in ops.iter() {
            op.btc_encode_to(&mut bytes);
        }
        Self {
            bytes: bytes.try_into().unwrap(),
        }
    }
}

impl AsRef<[u8]> for BitcoinScript {
    fn as_ref(&self) -> &[u8] {
        self.bytes.as_ref()
    }
}

impl SerializeBtc for BitcoinScript {
    fn btc_encode_to(&self, buf: &mut Vec<u8>) {
        buf.extend(to_varint(self.bytes.len() as u64));
        buf.extend(&self.bytes[..]);
    }

    fn size(&self) -> usize {
        let s = self.bytes.len();
        s + to_varint(s as u64).len()
    }
}

impl SerializeBtc for BitcoinOp {
    fn btc_encode_to(&self, buf: &mut Vec<u8>) {
        match self {
            BitcoinOp::PushUint { value } => match value {
                0 => buf.push(0),
                1..=16 => buf.push(0x50 + *value as u8),
                129 => buf.push(0x4f),
                _ => {
                    let num_bytes =
                        std::mem::size_of::<u32>() - (value.leading_zeros() / 8) as usize;
                    buf.push(num_bytes as u8);
                    buf.extend(value.to_le_bytes().iter().take(num_bytes));
                }
            },
            BitcoinOp::PushBytes { bytes } => {
                let num_bytes = bytes.len() as u32;
                match num_bytes {
                    0..=0x4b => buf.push(num_bytes as u8),
                    0x4c..=0xff => {
                        buf.push(0x4c);
                        buf.push(num_bytes as u8);
                    }
                    0x100..=0xffff => {
                        buf.push(0x4d);
                        buf.extend(num_bytes.to_le_bytes().iter().take(2));
                    }
                    0x10000..=0xffffffff => {
                        buf.push(0x4e);
                        buf.extend(num_bytes.to_le_bytes().iter().take(4));
                    }
                }
                buf.extend(bytes);
            }
            BitcoinOp::Drop => buf.push(0x75),
            BitcoinOp::CheckSig => buf.push(0xac),
            BitcoinOp::Dup => buf.push(0x76),
            BitcoinOp::Hash160 => buf.push(0xa9),
            BitcoinOp::EqualVerify => buf.push(0x88),
            BitcoinOp::Equal => buf.push(0x87),
            BitcoinOp::PushArray20 { bytes } => {
                buf.push(20u8);
                buf.extend(bytes);
            }
            BitcoinOp::PushArray32 { bytes } => {
                buf.push(32u8);
                buf.extend(bytes);
            }
            BitcoinOp::PushVersion { version } => {
                if *version == 0 {
                    buf.push(0);
                } else {
                    buf.push(0x50 + *version);
                }
            }
        }
    }

    fn size(&self) -> usize {
        match self {
            BitcoinOp::PushUint { value } => match value {
                0..=16 => 1,
                _ => {
                    let num_bytes =
                        std::mem::size_of::<u32>() - (value.leading_zeros() / 8) as usize;
                    1 + num_bytes
                }
            },
            BitcoinOp::PushBytes { bytes } => {
                let num_bytes = bytes.len();
                num_bytes
                    + match num_bytes {
                        0..=0x4b => 1,
                        0x4c..=0xff => 2,
                        0x100..=0xffff => 3,
                        _ => 5,
                    }
            }
            BitcoinOp::Drop
            | BitcoinOp::CheckSig
            | BitcoinOp::Dup
            | BitcoinOp::Hash160
            | BitcoinOp::EqualVerify
            | BitcoinOp::Equal => 1,
            BitcoinOp::PushArray20 { .. } => 21,
            BitcoinOp::PushArray32 { .. } => 33,
            BitcoinOp::PushVersion { .. } => 1,
        }
    }
}

fn decode_hex<const N: usize>(hex: &str) -> [u8; N] {
    let mut output = [0; N];

    let hex = &hex[2..];
    for (index, byte) in output.iter_mut().enumerate() {
        *byte = u8::from_str_radix(&hex[index * 2..index * 2 + 2], 16).unwrap();
    }

    output
}

#[wasm_bindgen]
pub enum AddressEncoding {
    P2WPKH,
    P2SH,
    P2PKH,
    P2WSH,
    Taproot,
}

#[wasm_bindgen]
pub fn decode(
    address: &str,
    encoding: AddressEncoding,
    network: BitcoinNetwork,
) -> Result<String, JsError> {
    match encoding {
        AddressEncoding::P2WPKH => ScriptPubkey::P2WPKH(decode_hex(address)).to_address(&network),
        AddressEncoding::P2SH => ScriptPubkey::P2SH(decode_hex(address)).to_address(&network),
        AddressEncoding::P2PKH => ScriptPubkey::P2PKH(decode_hex(address)).to_address(&network),
        AddressEncoding::P2WSH => ScriptPubkey::P2WSH(decode_hex(address)).to_address(&network),
        AddressEncoding::Taproot => ScriptPubkey::Taproot(decode_hex(address)).to_address(&network),
    }
}

#[wasm_bindgen(js_name = isValidAddressForNetwork)]
pub fn is_valid_address_for_network(address: &str, network: BitcoinNetwork) -> bool {
    ScriptPubkey::try_from_address(address, &network).is_ok()
}
