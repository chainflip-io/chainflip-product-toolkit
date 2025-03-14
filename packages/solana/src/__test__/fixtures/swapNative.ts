import * as base58 from '@chainflip/utils/base58';
import { hexToBytes } from '@chainflip/utils/bytes';
import {
  assetConstants,
  assetContractId,
  chainContractId,
  ChainflipAsset,
} from '@chainflip/utils/chainflip';
import * as ss58 from '@chainflip/utils/ss58';
import { HexString } from '@chainflip/utils/types';
import { BorshInstructionCoder } from '@coral-xyz/anchor';
import { BN } from 'bn.js';
import { Bytes } from 'scale-ts';
import {
  vaultCcmCfParametersCodec,
  vaultCfParametersCodec,
  solVersionedCcmAdditionalDataCodec,
  SolanaCcmAdditionalData,
} from '@/scale/codecs';
import { devnet } from '../../idls';

export const swapNative = ({
  destinationAsset,
  destinationAddress,
  minPrice = 0n,
  refundAddress = '3yKDHJgzS2GbZB9qruoadRYtq8597HZifnRju7fHpdRC',
  brokerAccount = 'cFMTNSQQVfBo2HqtekvhLPfZY764kuJDVFG1EvnnDGYxc3LRW',
  brokerCommission = 0,
  dcaParams,
  affiliateFees = [],
  amount = 1e9,
  retryDurationBlocks = 100,
  ccmAdditionalData,
  ccmParameters = null,
}: {
  destinationAsset: ChainflipAsset;
  destinationAddress: Uint8Array;
  minPrice?: bigint;
  refundAddress?: string;
  brokerAccount?: string;
  brokerCommission?: number;
  dcaParams?: { chunkIntervalBlocks: number; numberOfChunks: number };
  affiliateFees?: { account: number; commissionBps: number }[];
  amount?: number;
  retryDurationBlocks?: number;
  ccmAdditionalData?: SolanaCcmAdditionalData;
  ccmParameters?: { message: HexString; gasAmount: number } | null;
}) => {
  const codec = (ccmAdditionalData ? vaultCcmCfParametersCodec : vaultCfParametersCodec)(Bytes(32));

  const coder = new BorshInstructionCoder(devnet);

  const info = {
    swap_native_params: {
      amount: new BN(amount),
      dst_chain: chainContractId[assetConstants[destinationAsset].chain],
      // must be type Buffer
      dst_address: Buffer.from(destinationAddress),
      dst_token: assetContractId[destinationAsset],
      ccm_parameters: ccmParameters && {
        message: Buffer.from(hexToBytes(ccmParameters.message)),
        gas_amount: new BN(ccmParameters.gasAmount),
      },
      // must be type Buffer
      cf_parameters: Buffer.from(
        codec.enc({
          tag: 'V0',
          value: {
            vaultSwapParameters: {
              refundParams: {
                retryDurationBlocks,
                // must be type Uint8Array
                refundAddress: base58.decode(refundAddress),
                minPriceX128: minPrice,
              },
              dcaParams,
              boostFee: 0,
              brokerFees: {
                // must be type Uint8Array
                account: ss58.decode(brokerAccount).data,
                commissionBps: brokerCommission,
              },
              affiliateFees,
            },
            // @ts-expect-error -- it's a union issue
            ccmAdditionalData:
              ccmAdditionalData &&
              solVersionedCcmAdditionalDataCodec.enc({
                tag: 'V0',
                value: {
                  additional_accounts: ccmAdditionalData.additionalAccounts.map((account) => ({
                    is_writable: account.isWritable,
                    pubkey: base58.decode(account.pubkey),
                  })),
                  cf_receiver: {
                    is_writable: ccmAdditionalData.cfReceiver.isWritable,
                    pubkey: base58.decode(ccmAdditionalData.cfReceiver.pubkey),
                  },
                  fallback_address: base58.decode(ccmAdditionalData.fallbackAddress),
                },
              }),
          },
        }),
      ),
    },
  };

  const bytes = coder.encode('x_swap_native', info);

  const data = base58.encode(bytes);

  return {
    jsonrpc: '2.0',
    result: {
      blockTime: 1741183512,
      meta: {
        computeUnitsConsumed: 20464,
        err: null,
        fee: 10000,
        innerInstructions: [
          {
            index: 0,
            instructions: [
              {
                parsed: {
                  info: {
                    lamports: 2282880,
                    newAccount: 'Cfjgf5FzbGkd8tnVEU83oL91SbiKLNacCpJskGh4ZnyY',
                    owner: 'DeL6iGV5RWrWh7cPoEa7tRHM8XURAaB4vPjfX5qVyuWE',
                    source: '3yKDHJgzS2GbZB9qruoadRYtq8597HZifnRju7fHpdRC',
                    space: 200,
                  },
                  type: 'createAccount',
                },
                program: 'system',
                programId: '11111111111111111111111111111111',
                stackHeight: 2,
              },
              {
                parsed: {
                  info: {
                    destination: '12MYcNumSQCn81yKRfrk5P5ThM5ivkLiZda979hhKJDR',
                    lamports: 222720,
                    source: '3yKDHJgzS2GbZB9qruoadRYtq8597HZifnRju7fHpdRC',
                  },
                  type: 'transfer',
                },
                program: 'system',
                programId: '11111111111111111111111111111111',
                stackHeight: 2,
              },
              {
                parsed: {
                  info: {
                    destination: '2BcYzxGN9CeSNo4dF61533xS3ytgwJxRyFYMoNSoZjUp',
                    lamports: 1500000000,
                    source: '3yKDHJgzS2GbZB9qruoadRYtq8597HZifnRju7fHpdRC',
                  },
                  type: 'transfer',
                },
                program: 'system',
                programId: '11111111111111111111111111111111',
                stackHeight: 2,
              },
            ],
          },
        ],
        logMessages: [
          'Program DeL6iGV5RWrWh7cPoEa7tRHM8XURAaB4vPjfX5qVyuWE invoke [1]',
          'Program log: Instruction: XSwapNative',
          'Program 11111111111111111111111111111111 invoke [2]',
          'Program 11111111111111111111111111111111 success',
          'Program 11111111111111111111111111111111 invoke [2]',
          'Program 11111111111111111111111111111111 success',
          'Program 11111111111111111111111111111111 invoke [2]',
          'Program 11111111111111111111111111111111 success',
          'Program DeL6iGV5RWrWh7cPoEa7tRHM8XURAaB4vPjfX5qVyuWE consumed 20464 of 200000 compute units',
          'Program DeL6iGV5RWrWh7cPoEa7tRHM8XURAaB4vPjfX5qVyuWE success',
        ],
        postBalances: [166621983183, 2282880, 1308480, 1500000000, 1, 1141440, 2025360],
        postTokenBalances: [],
        preBalances: [168124498783, 0, 1085760, 0, 1, 1141440, 2025360],
        preTokenBalances: [],
        rewards: [],
        status: {
          Ok: null,
        },
      },
      slot: 365289019,
      transaction: {
        message: {
          accountKeys: [
            {
              pubkey: '3yKDHJgzS2GbZB9qruoadRYtq8597HZifnRju7fHpdRC',
              signer: true,
              source: 'transaction',
              writable: true,
            },
            {
              pubkey: 'Cfjgf5FzbGkd8tnVEU83oL91SbiKLNacCpJskGh4ZnyY',
              signer: true,
              source: 'transaction',
              writable: true,
            },
            {
              pubkey: '12MYcNumSQCn81yKRfrk5P5ThM5ivkLiZda979hhKJDR',
              signer: false,
              source: 'transaction',
              writable: true,
            },
            {
              pubkey: '2BcYzxGN9CeSNo4dF61533xS3ytgwJxRyFYMoNSoZjUp',
              signer: false,
              source: 'transaction',
              writable: true,
            },
            {
              pubkey: '11111111111111111111111111111111',
              signer: false,
              source: 'transaction',
              writable: false,
            },
            {
              pubkey: 'DeL6iGV5RWrWh7cPoEa7tRHM8XURAaB4vPjfX5qVyuWE',
              signer: false,
              source: 'transaction',
              writable: false,
            },
            {
              pubkey: 'GpTqSHz4JzQimjfDiBgDhJzYcTonj3t6kMhKTigCKHfc',
              signer: false,
              source: 'transaction',
              writable: false,
            },
          ],
          instructions: [
            {
              accounts: [
                'GpTqSHz4JzQimjfDiBgDhJzYcTonj3t6kMhKTigCKHfc',
                '2BcYzxGN9CeSNo4dF61533xS3ytgwJxRyFYMoNSoZjUp',
                '3yKDHJgzS2GbZB9qruoadRYtq8597HZifnRju7fHpdRC',
                'Cfjgf5FzbGkd8tnVEU83oL91SbiKLNacCpJskGh4ZnyY',
                '12MYcNumSQCn81yKRfrk5P5ThM5ivkLiZda979hhKJDR',
                '11111111111111111111111111111111',
              ],
              data,
              programId: 'DeL6iGV5RWrWh7cPoEa7tRHM8XURAaB4vPjfX5qVyuWE',
              stackHeight: null,
            },
          ],
          recentBlockhash: '7nYqqDtojk5HmKWN1nectH4eXicrF5zUVjFPYf4z4RZv',
        },
        signatures: [
          '3fG2FkvUD3eFdpja9XBUsSa2stgENzZWKWqXZjfBEdBEnVE498kTXDaPFdRJnrwoBBp64wuoGKpkqNCnHhQRi8N1',
          '5NDhozJyqXkCC9x95vr3gBsCdTxe4BJBymbzKLLgtaPoDFrNctuCm4NGryGDviVup2CPoDiPMiBf8nbJpfQ2eKB5',
        ],
      },
    },
    id: '3b2d2603-d826-4f71-a0d8-83054df3580b',
  };
};
