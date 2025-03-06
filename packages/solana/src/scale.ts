import * as base58 from '@chainflip/utils/base58';
import { bytesToHex } from '@chainflip/utils/bytes';
import { CHAINFLIP_SS58_PREFIX } from '@chainflip/utils/consts';
import * as ss58 from '@chainflip/utils/ss58';
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

const vaultSwapParametersCodec = (address: Codec<Uint8Array>) =>
  Struct({
    refundParams: Struct({
      retryDurationBlocks: u32,
      refundAddress: address,
      minPriceX128: u256,
    }),
    dcaParams: Option(Struct({ numberOfChunks: u32, chunkIntervalBlocks: u32 })),
    boostFee: u8,
    brokerFees: Struct({ account: Bytes(32), commissionBps: u16 }),
    affiliateFees: Vector(Struct({ account: u8, commissionBps: u8 })),
  });

const solanaVaultSwapParametersCodec = vaultSwapParametersCodec(Bytes(32));

export const solanaVaultCcmCfParametersCodec = Enum({
  V0: Struct({
    ccmAdditionalData: Bytes(),
    vaultSwapParameters: solanaVaultSwapParametersCodec,
  }),
});

export const solanaVaultCfParametersCodec = Enum({
  V0: Struct({
    vaultSwapParameters: solanaVaultSwapParametersCodec,
  }),
});

const tryVariants = (data: Uint8Array) => {
  const errors = [];
  try {
    return {
      ok: true,
      value: {
        ccmAdditionalData: undefined,
        ...solanaVaultCfParametersCodec.dec(data).value,
      },
    } as const;
  } catch (e) {
    errors.push(e as Error);
    // noop
  }

  try {
    return { ok: true, value: solanaVaultCcmCfParametersCodec.dec(data).value } as const;
  } catch (e) {
    errors.push(e as Error);
  }

  return { ok: false, reason: errors } as const;
};

export const tryDecodeCfParams = (data: Uint8Array) => {
  const result = tryVariants(data);
  if (!result.ok) return result;
  const { ccmAdditionalData, vaultSwapParameters } = result.value;

  return {
    ok: true,
    value: {
      ccmAdditionalData: ccmAdditionalData ? bytesToHex(ccmAdditionalData) : null,
      refundParams: {
        retryDurationBlocks: vaultSwapParameters.refundParams.retryDurationBlocks,
        refundAddress: base58.encode(vaultSwapParameters.refundParams.refundAddress),
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

const solCcmAccountsCodec = Struct({
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
});

export const solVersionedCcmAdditionalDataCodec = Enum({
  V0: solCcmAccountsCodec,
});
