import * as base58 from '@chainflip/utils/base58';
import { bytesToHex } from '@chainflip/utils/bytes';
import { CHAINFLIP_SS58_PREFIX } from '@chainflip/utils/consts';
import * as ss58 from '@chainflip/utils/ss58';
import { type HexString } from '@chainflip/utils/types';
import {
  u32,
  Struct,
  Option,
  u16,
  u256,
  Bytes,
  Enum,
  Vector,
  u8,
  type Codec,
  bool,
} from 'scale-ts';

const vaultSwapParametersCodec = <T>(refundAddressCodec: Codec<T>) =>
  Struct({
    refundParams: Struct({
      retryDurationBlocks: u32,
      refundAddress: refundAddressCodec,
      minPriceX128: u256,
    }),
    dcaParams: Option(Struct({ numberOfChunks: u32, chunkIntervalBlocks: u32 })),
    boostFee: u8,
    brokerFees: Struct({ account: Bytes(32), commissionBps: u16 }),
    affiliateFees: Vector(Struct({ account: u8, commissionBps: u8 })),
  });

export const vaultCcmCfParametersCodec = <T>(refundAddressCodec: Codec<T>) =>
  Enum({
    V0: Struct({
      ccmAdditionalData: Bytes(),
      vaultSwapParameters: vaultSwapParametersCodec(refundAddressCodec),
    }),
  });

export const vaultCfParametersCodec = <T>(refundAddressCodec: Codec<T>) =>
  Enum({
    V0: Struct({
      vaultSwapParameters: vaultSwapParametersCodec(refundAddressCodec),
    }),
  });

export const solVersionedCcmAdditionalDataCodec = Enum({
  V0: Struct({
    cf_receiver: Struct({
      pubkey: Bytes(32),
      is_writable: bool,
    }),
    additional_accounts: Vector(
      Struct({
        pubkey: Bytes(32),
        is_writable: bool,
      }),
    ),
    fallback_address: Bytes(32),
  }),
});

export type SolanaCcmAdditionalData = {
  fallbackAddress: string;
  cfReceiver: { pubkey: string; isWritable: boolean };
  additionalAccounts: { pubkey: string; isWritable: boolean }[];
};

export const decodeSolanaAdditionalData = (
  data: Uint8Array,
): `0x${string}` | SolanaCcmAdditionalData => {
  try {
    const { value } = solVersionedCcmAdditionalDataCodec.dec(data);

    return {
      fallbackAddress: base58.encode(value.fallback_address),
      cfReceiver: {
        pubkey: base58.encode(value.cf_receiver.pubkey),
        isWritable: value.cf_receiver.is_writable,
      },
      additionalAccounts: value.additional_accounts.map((account) => ({
        pubkey: base58.encode(account.pubkey),
        isWritable: account.is_writable,
      })),
    };
  } catch {
    return bytesToHex(data);
  }
};

type DecodedParams<Address, CcmAdditionalData> = {
  ccmAdditionalData: CcmAdditionalData | null;
  refundParams: {
    retryDurationBlocks: number;
    refundAddress: Address;
    minPriceX128: string;
  };
  dcaParams: { numberOfChunks: number; chunkIntervalBlocks: number } | null;
  boostFee: number;
  brokerFees: { account: string; commissionBps: number };
  affiliateFees: { account: number; commissionBps: number }[];
};

type Result<T, E> =
  | { ok: true; value: T; reason?: undefined }
  | { ok: false; value?: undefined; reason: E };

export function createVaultParamsDecoder<T, U>(
  refundAddressCodec: Codec<T>,
  encodeAddress: (value: T) => U,
): (data: Uint8Array) => Result<DecodedParams<U, HexString | null>, Error[]>;
export function createVaultParamsDecoder<T, U, V>(
  refundAddressCodec: Codec<T>,
  encodeAddress: (value: T) => U,
  decodeAdditionalData: (data: Uint8Array) => V,
): (data: Uint8Array) => Result<DecodedParams<U, V | null>, Error[]>;
export function createVaultParamsDecoder<T, U, V>(
  refundAddressCodec: Codec<T>,
  encodeAddress: (value: T) => U,
  decodeAdditionalData?: (data: Uint8Array) => V,
): (data: Uint8Array) => Result<DecodedParams<U, HexString | V | null>, Error[]> {
  const basicCodec = vaultCfParametersCodec(refundAddressCodec);
  const additionalDataCodec = vaultCcmCfParametersCodec(refundAddressCodec);

  const tryVariants = (data: Uint8Array) => {
    const errors = [];
    try {
      return {
        ok: true,
        value: { ccmAdditionalData: null, ...basicCodec.dec(data).value },
      } as const;
    } catch (e) {
      errors.push(e as Error);
    }

    try {
      return { ok: true, value: additionalDataCodec.dec(data).value } as const;
    } catch (e) {
      errors.push(e as Error);
    }

    return { ok: false, reason: errors } as const;
  };

  const tryDecodeCfParams = (data: Uint8Array) => {
    const result = tryVariants(data);
    if (!result.ok) return result;
    const { ccmAdditionalData, vaultSwapParameters } = result.value;

    return {
      ok: true,
      value: {
        ccmAdditionalData:
          ccmAdditionalData && (decodeAdditionalData ?? bytesToHex)(ccmAdditionalData),
        refundParams: {
          retryDurationBlocks: vaultSwapParameters.refundParams.retryDurationBlocks,
          refundAddress: encodeAddress(vaultSwapParameters.refundParams.refundAddress),
          minPriceX128: vaultSwapParameters.refundParams.minPriceX128.toString(),
        },
        dcaParams: vaultSwapParameters.dcaParams
          ? {
              numberOfChunks: vaultSwapParameters.dcaParams.numberOfChunks,
              chunkIntervalBlocks: vaultSwapParameters.dcaParams.chunkIntervalBlocks,
            }
          : null,
        boostFee: vaultSwapParameters.boostFee,
        brokerFees: {
          account: ss58.encode({
            data: vaultSwapParameters.brokerFees.account,
            ss58Format: CHAINFLIP_SS58_PREFIX,
          }),
          commissionBps: vaultSwapParameters.brokerFees.commissionBps,
        },
        affiliateFees: vaultSwapParameters.affiliateFees,
      },
    } as const;
  };

  return tryDecodeCfParams;
}
