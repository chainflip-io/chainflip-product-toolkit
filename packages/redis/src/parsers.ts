import { reverseBytes } from '@chainflip/utils/bytes';
import {
  getInternalAsset,
  type ChainflipChain,
  type AssetAndChain,
  isValidAssetAndChain,
  type UncheckedAssetAndChain,
} from '@chainflip/utils/chainflip';
import { CHAINFLIP_SS58_PREFIX } from '@chainflip/utils/consts';
import { hexEncodeNumber } from '@chainflip/utils/number';
import * as ss58 from '@chainflip/utils/ss58';
import { z } from 'zod';
import { transformKeysToCamelCase } from './utils';

const uncheckedAssetAndChain = z.object({
  asset: z.string(),
  chain: z.string(),
});

const assetAndChain = uncheckedAssetAndChain
  .refine(
    (value): value is AssetAndChain => isValidAssetAndChain(value as UncheckedAssetAndChain),
    (value) => ({ message: `Invalid asset and chain : ${value.asset} on ${value.chain}` }),
  )
  .transform((value) => getInternalAsset(value));

const numericString = z.string().regex(/^[0-9]+$/);
const hexString = z.string().refine((v): v is `0x${string}` => /^0x[0-9a-f]*$/i.test(v));
const u128 = z.union([z.number(), numericString, hexString]).transform((arg) => BigInt(arg));

const chainflipAddress = z.string().refine(
  (address) => ss58.decode(address).ss58Format === CHAINFLIP_SS58_PREFIX,
  (address) => ({ message: `${address} is not a valid Chainflip address` }),
);

const jsonString = z.string().transform((value) => JSON.parse(value) as unknown);

const bitcoinDeposit = z
  .object({
    tx_id: hexString.transform((value) => reverseBytes(value).slice(2)),
    vout: z.number().int(),
  })
  .transform((obj) => ({ ...obj, type: 'Bitcoin' as const }));

const evmDeposit = z
  .object({ tx_hashes: z.array(hexString) })
  .transform((obj) => ({ ...obj, type: 'EVM' as const }));

const assethubDeposit = z
  .object({ extrinsic_index: z.number() })
  .transform((obj) => ({ ...obj, type: 'Assethub' as const }));

export const depositSchema = jsonString.pipe(
  z.object({
    amount: u128,
    asset: assetAndChain,
    deposit_chain_block_height: z.number(),
    deposit_details: z.union([evmDeposit, bitcoinDeposit, assethubDeposit]).nullable(),
  }),
);

export type PendingDeposit = Omit<z.output<typeof depositSchema>, 'deposit_details'> & {
  tx_refs: string[];
};

export const broadcastParsers = {
  Ethereum: z.object({
    tx_out_id: z.object({
      signature: z.object({
        k_times_g_address: z.array(z.number()),
        s: z.array(z.number()),
      }),
    }),
    tx_ref: z
      .object({
        hash: hexString,
      })
      .transform(({ hash }) => hash),
  }),
  Assethub: z.object({
    tx_out_id: z.object({ signature: z.string() }),
    tx_ref: z
      .object({
        transaction_id: z.object({
          block_number: z.number(),
          extrinsic_index: z.number(),
        }),
      })
      .transform(
        ({ transaction_id }) => `${transaction_id.block_number}-${transaction_id.extrinsic_index}`,
      ),
  }),
  Bitcoin: z.object({
    tx_out_id: z.object({ hash: z.string() }),
    tx_ref: z
      .object({
        hash: z.string().transform((value) => (value.startsWith('0x') ? value.slice(2) : value)),
      })
      .transform(({ hash }) => hash),
  }),
  Arbitrum: z.object({
    tx_out_id: z.object({
      signature: z.object({
        k_times_g_address: z.array(z.number()),
        s: z.array(z.number()),
      }),
    }),
    tx_ref: z
      .object({
        hash: hexString,
      })
      .transform(({ hash }) => hash),
  }),
} as const satisfies Record<Exclude<ChainflipChain, 'Solana'>, z.ZodTypeAny>;

const accountFee = z
  .object({
    account: chainflipAddress,
    bps: z.number(),
  })
  .transform(({ account, bps }) => ({ account, commissionBps: bps }));

export const vaultDepositSchema = jsonString.pipe(
  z
    .object({
      amount: u128,
      destination_address: z.string(),
      input_asset: assetAndChain,
      output_asset: assetAndChain,
      deposit_chain_block_height: z.number().nullable().optional(),
      affiliate_fees: z.array(accountFee),
      broker_fee: accountFee.optional(),
      max_boost_fee: z.number().optional(),
      dca_params: z
        .object({
          chunk_interval: z.number(),
          number_of_chunks: z.number(),
        })
        .nullable()
        .optional(),
      refund_params: z
        .object({
          min_price: u128,
          retry_duration: z.number(),
          refund_address: z.string(),
        })
        .nullable()
        .optional(),
      ccm_deposit_metadata: z
        .object({
          channel_metadata: z.object({
            ccm_additional_data: z.any(),
            message: z.string(),
            gas_budget: z
              .union([numericString, hexString])
              .transform((n) => hexEncodeNumber(BigInt(n))),
          }),
        })
        .nullable()
        .optional(),
    })
    .transform(transformKeysToCamelCase),
);

type ChainBroadcast<C extends Exclude<ChainflipChain, 'Solana'>> = z.infer<
  (typeof broadcastParsers)[C]
>;

export type EthereumBroadcast = ChainBroadcast<'Ethereum'>;
export type AssethubBroadcast = ChainBroadcast<'Assethub'>;
export type BitcoinBroadcast = ChainBroadcast<'Bitcoin'>;
export type Broadcast = ChainBroadcast<Exclude<ChainflipChain, 'Solana'>>;

export const mempoolTransaction = jsonString.pipe(
  z.object({
    confirmations: z.number(),
    value: u128,
    tx_hash: z.string(),
    deposit_chain_block_height: z.number().optional(),
  }),
);
