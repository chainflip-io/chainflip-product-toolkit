import { type HexString } from '@chainflip/utils/types';
import { Server } from 'http';
import { type AddressInfo } from 'net';
import { promisify } from 'util';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { type z } from 'zod';
import { spyOn } from '@/testing';
import { RpcRequest, type JsonRpcRequest, type RpcMethod } from '../common';
import { HttpClient } from '../index';
import { type AssetAndChain, type cfSwapRate } from '../parsers';
import {
  availablePools,
  boostPoolsDepth,
  brokerAccount,
  brokerAccountNoAffiliates,
  environment,
  failedCallEvm,
  fundingEnvironment,
  ingressEgressEnvironment,
  liquidityProviderAccount,
  poolOrderbook,
  poolOrders,
  poolPriceV2,
  poolsEnvironment,
  runtimeVersion,
  safeModeStatuses,
  supportedAssets,
  swapDepositAddress,
  swapParameterEncodingBitcoin,
  swapParameterEncodingEthereum,
  swapParameterEncodingSolana,
  swappingEnvironment,
  swapRateV2,
  swapRateV3,
  tradingStrategies,
  unregisteredAccount,
  validatorAccount,
} from './fixtures';

const isHexString = (value: unknown): value is HexString =>
  typeof value === 'string' && value.startsWith('0x');

describe(HttpClient, () => {
  it('returns all methods', () => {
    expect(new HttpClient('http://localhost:8080').methods()).toMatchInlineSnapshot(`
      [
        "broker_request_swap_deposit_address",
        "broker_request_swap_parameter_encoding",
        "cf_account_info",
        "cf_accounts",
        "cf_auction_state",
        "cf_authority_emission_per_block",
        "cf_available_pools",
        "cf_boost_pool_details",
        "cf_boost_pool_pending_fees",
        "cf_boost_pools_depth",
        "cf_environment",
        "cf_epoch_duration",
        "cf_eth_key_manager_address",
        "cf_eth_state_chain_gateway_address",
        "cf_failed_call_arbitrum",
        "cf_failed_call_ethereum",
        "cf_flip_supply",
        "cf_funding_environment",
        "cf_get_trading_strategies",
        "cf_ingress_egress_environment",
        "cf_pool_depth",
        "cf_pool_orderbook",
        "cf_pool_orders",
        "cf_pool_price_v2",
        "cf_pools_environment",
        "cf_request_swap_parameter_encoding",
        "cf_safe_mode_statuses",
        "cf_supported_assets",
        "cf_swap_rate",
        "cf_swap_rate_v2",
        "cf_swap_rate_v3",
        "cf_swapping_environment",
        "chain_getBlockHash",
        "lp_total_balances",
        "state_getMetadata",
        "state_getRuntimeVersion",
      ]
    `);
  });

  it('handles network errors when fetch throws', async () => {
    const client = new HttpClient('http://localhost:1313');

    await expect(client.sendRequest('cf_accounts')).rejects.toThrowErrorMatchingInlineSnapshot(
      `[Error: Network error]`,
    );
  });

  it('rejects unknown methods', async () => {
    const client = new HttpClient('http://localhost:8080');

    await expect(
      client.sendRequest('unknown_method' as any),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`[Error: Unknown method: unknown_method]`);
  });

  const LP_ACCOUNT_ID = 'cFMVtnPTJFYFvnHXK14HZ6XWDSCAByTPZDWrTeFEc2B8A3m7M';
  const BROKER_ACCOUNT_ID = 'cFJjZKzA5rUTb9qkZMGfec7piCpiAQKr15B4nALzriMGQL8BE';
  const BROKER_ACCOUNT_ID2 = 'cFJjZKzA5rUTb9qkZMGfec7piCpiAQKr15B4nALzriMGQL8BF';
  const VALIDATOR_ACCOUNT_ID = 'cFKzr7DwLCRtSkou5H5moKri7g9WwJ4tAbVJv6dZGhLb811Tc';

  describe('with server', () => {
    let server: Server;
    let callCounter = 0;

    let client: HttpClient;

    function handleRequest(body: JsonRpcRequest<RpcMethod>) {
      const respond = (result: unknown) => ({
        id: body.id,
        jsonrpc: '2.0',
        result,
      });

      if (body.method === 'cf_swap_rate') {
        const { chain, asset } = body.params[1] as AssetAndChain;

        if (!isHexString(body.params.at(-1))) {
          return {
            id: body.id,
            jsonrpc: '2.0',
            error: { code: -32602, message: 'invalid parameter type' },
          };
        }

        return respond({
          intermediary: chain === 'Ethereum' && asset === 'USDC' ? null : '0x1',
          output: '0x1',
        } as z.input<typeof cfSwapRate>);
      }

      switch (body.method) {
        case 'cf_account_info':
          switch (body.params[0]) {
            case LP_ACCOUNT_ID:
              return respond(liquidityProviderAccount);
            case BROKER_ACCOUNT_ID:
              return respond(brokerAccount);
            case BROKER_ACCOUNT_ID2:
              return respond(brokerAccountNoAffiliates);
            case VALIDATOR_ACCOUNT_ID:
              return respond(validatorAccount);
            default:
              return respond(unregisteredAccount);
          }
        case 'broker_request_swap_parameter_encoding':
          switch ((body.params[0] as { chain?: string }).chain) {
            case 'Ethereum':
              return respond(swapParameterEncodingEthereum);
            case 'Solana':
              return respond(swapParameterEncodingSolana);
            default:
              return respond(swapParameterEncodingBitcoin);
          }
        case 'cf_request_swap_parameter_encoding':
          switch ((body.params[0] as { chain?: string }).chain) {
            case 'Ethereum':
              return respond(swapParameterEncodingEthereum);
            case 'Solana':
              return respond(swapParameterEncodingSolana);
            default:
              return respond(swapParameterEncodingBitcoin);
          }
        case 'broker_request_swap_deposit_address':
          return respond(swapDepositAddress);
        case 'cf_boost_pools_depth':
          return respond(boostPoolsDepth);
        case 'cf_environment':
          return respond(environment);
        case 'cf_funding_environment':
          return respond(fundingEnvironment);
        case 'cf_ingress_egress_environment':
          return respond(ingressEgressEnvironment);
        case 'cf_pool_orders':
          return respond(poolOrders);
        case 'cf_pool_price_v2':
          return respond(poolPriceV2);
        case 'cf_pools_environment':
          return respond(poolsEnvironment);
        case 'cf_supported_assets':
          return respond(supportedAssets);
        case 'cf_swap_rate_v2':
          return respond(swapRateV2);
        case 'cf_swap_rate_v3':
          return respond(swapRateV3);
        case 'cf_swapping_environment':
          return respond(swappingEnvironment);
        case 'chain_getBlockHash':
          return respond('0x5678');
        case 'state_getMetadata':
          return respond('0x1234');
        case 'state_getRuntimeVersion':
          return respond(runtimeVersion);
        case 'lp_total_balances':
          expect(body.params[0]).toEqual(LP_ACCOUNT_ID);
          return respond(liquidityProviderAccount.balances);
        case 'cf_failed_call_ethereum':
        case 'cf_failed_call_arbitrum':
          if (body.params[0] === 1) return respond(failedCallEvm);
          return respond(null);
        case 'cf_authority_emission_per_block':
          return respond('0x9eafbba30192d84');
        case 'cf_epoch_duration':
          return respond(43200);
        case 'cf_auction_state':
          return respond({
            epoch_duration: 43200,
            current_epoch_started_at: 6892653,
            redemption_period_as_percentage: 50,
            min_funding: '0x53444835ec580000',
            auction_size_range: [3, 150],
            min_active_bid: '0x765fc937c54c30cabc0',
          });
        case 'cf_flip_supply':
          return respond(['0x0', '0x1']);
        case 'cf_pool_orderbook':
          return respond(poolOrderbook);
        case 'cf_get_trading_strategies':
          return respond(tradingStrategies);
        case 'cf_available_pools':
          return respond(availablePools);
        case 'cf_safe_mode_statuses':
          return respond(safeModeStatuses);
        case 'cf_eth_state_chain_gateway_address':
        case 'cf_eth_key_manager_address':
        default:
          console.error('Method not found:', body.method);
          return [
            {
              id: body.id,
              jsonrpc: '2.0',
              error: { code: 1, message: `Method not found: "${body.method as string}"` },
            },
          ];
      }
    }

    beforeEach(() => {
      callCounter = 0;
      server = new Server(async (req, res) => {
        callCounter++;
        if (req.headers['content-type'] !== 'application/json') {
          return res.writeHead(400).end();
        }

        const chunks = [] as Buffer[];

        let length = 0;

        for await (const chunk of req as AsyncIterable<Buffer>) {
          chunks.push(chunk);
          length += chunk.length;
        }

        const body = JSON.parse(
          Buffer.concat(chunks, length).toString(),
        ) as JsonRpcRequest<RpcMethod>[];

        const response = [];
        for (const item of body) {
          response.push(handleRequest(item));
        }
        return res.writeHead(200).end(JSON.stringify(response));
      }).listen(0);

      client = new HttpClient(`http://localhost:${(server.address() as AddressInfo).port}`);
    });

    afterEach(async () => {
      await promisify(server.close.bind(server))();
    });

    it('gets the swap rate with intermediary', async () => {
      expect(
        await client.sendRequest(
          'cf_swap_rate',
          { asset: 'BTC', chain: 'Bitcoin' },
          { asset: 'ETH', chain: 'Ethereum' },
          '0x1',
        ),
      ).toMatchInlineSnapshot(`
        {
          "intermediary": 1n,
          "output": 1n,
        }
      `);
    });

    it('gets the swap rate without intermediary', async () => {
      expect(
        await client.sendRequest(
          'cf_swap_rate',
          { asset: 'BTC', chain: 'Bitcoin' },
          { asset: 'USDC', chain: 'Ethereum' },
          '0x1',
        ),
      ).toMatchInlineSnapshot(`
        {
          "intermediary": null,
          "output": 1n,
        }
      `);
    });

    type SimpleRpcMethod = {
      [K in keyof RpcRequest]: RpcRequest[K] extends [at?: string | null | undefined] ? K : never;
    }[keyof RpcRequest];

    it.each([
      'cf_funding_environment',
      'cf_ingress_egress_environment',
      'cf_swapping_environment',
      'cf_environment',
      'state_getMetadata',
      'cf_supported_assets',
      'chain_getBlockHash',
      'state_getRuntimeVersion',
      'cf_boost_pools_depth',
      'cf_flip_supply',
      'cf_authority_emission_per_block',
      'cf_epoch_duration',
      'cf_auction_state',
      'cf_get_trading_strategies',
      'cf_available_pools',
      'cf_safe_mode_statuses',
    ] as SimpleRpcMethod[])('handles %s', async (method) => {
      expect(await client.sendRequest(method)).toMatchSnapshot();
    });

    it('does the swap rate v2', async () => {
      expect(
        await client.sendRequest(
          'cf_swap_rate_v2',
          { asset: 'USDT', chain: 'Ethereum' },
          { asset: 'USDC', chain: 'Ethereum' },
          '0x10000',
          [
            {
              LimitOrder: {
                base_asset: { asset: 'USDT', chain: 'Ethereum' },
                quote_asset: { asset: 'USDC', chain: 'Ethereum' },
                side: 'buy',
                tick: 0,
                sell_amount: '0x10000',
              },
            },
          ],
        ),
      ).toMatchInlineSnapshot(`
        {
          "egress_fee": {
            "amount": 0n,
            "asset": "USDC",
            "chain": "Ethereum",
          },
          "ingress_fee": {
            "amount": 0n,
            "asset": "USDT",
            "chain": "Ethereum",
          },
          "intermediary": null,
          "network_fee": {
            "amount": 66n,
            "asset": "USDC",
            "chain": "Ethereum",
          },
          "output": 65468n,
        }
      `);
    });

    it('does the swap rate v3', async () => {
      expect(
        await client.sendRequest(
          'cf_swap_rate_v3',
          { asset: 'USDT', chain: 'Ethereum' },
          { asset: 'USDC', chain: 'Ethereum' },
          '0x10000',
          10,
          {
            number_of_chunks: 10,
            chunk_interval: 2,
          },
          undefined,
          undefined,
          [
            {
              LimitOrder: {
                base_asset: { asset: 'USDT', chain: 'Ethereum' },
                quote_asset: { asset: 'USDC', chain: 'Ethereum' },
                side: 'buy',
                tick: 0,
                sell_amount: '0x10000',
              },
            },
          ],
        ),
      ).toMatchInlineSnapshot(`
        {
          "broker_commission": {
            "amount": 0n,
            "asset": "USDC",
            "chain": "Ethereum",
          },
          "egress_fee": {
            "amount": 0n,
            "asset": "USDC",
            "chain": "Ethereum",
          },
          "ingress_fee": {
            "amount": 0n,
            "asset": "USDT",
            "chain": "Ethereum",
          },
          "intermediary": null,
          "network_fee": {
            "amount": 66n,
            "asset": "USDC",
            "chain": "Ethereum",
          },
          "output": 65468n,
        }
      `);
    });

    it('does the swap rate v3 with ccm_data and exclude_fees fields', async () => {
      expect(
        await client.sendRequest(
          'cf_swap_rate_v3',
          { asset: 'USDT', chain: 'Ethereum' },
          { asset: 'USDC', chain: 'Ethereum' },
          '0x10000',
          10,
          {
            number_of_chunks: 10,
            chunk_interval: 2,
          },
          {
            gas_budget: 12345,
            message_length: 321,
          },
          ['IngressDepositChannel'],
          [
            {
              LimitOrder: {
                base_asset: { asset: 'USDT', chain: 'Ethereum' },
                quote_asset: { asset: 'USDC', chain: 'Ethereum' },
                side: 'buy',
                tick: 0,
                sell_amount: '0x10000',
              },
            },
          ],
        ),
      ).toMatchInlineSnapshot(`
        {
          "broker_commission": {
            "amount": 0n,
            "asset": "USDC",
            "chain": "Ethereum",
          },
          "egress_fee": {
            "amount": 0n,
            "asset": "USDC",
            "chain": "Ethereum",
          },
          "ingress_fee": {
            "amount": 0n,
            "asset": "USDT",
            "chain": "Ethereum",
          },
          "intermediary": null,
          "network_fee": {
            "amount": 66n,
            "asset": "USDC",
            "chain": "Ethereum",
          },
          "output": 65468n,
        }
      `);
    });

    it('gets validator account info', async () => {
      expect(await client.sendRequest('cf_account_info', VALIDATOR_ACCOUNT_ID)).toMatchSnapshot();
    });

    it('gets lp account info', async () => {
      expect(await client.sendRequest('cf_account_info', LP_ACCOUNT_ID)).toMatchSnapshot();
    });

    it('gets broker account info', async () => {
      expect(await client.sendRequest('cf_account_info', BROKER_ACCOUNT_ID)).toMatchSnapshot();
    });

    it('gets broker account info 2', async () => {
      expect(await client.sendRequest('cf_account_info', BROKER_ACCOUNT_ID2)).toMatchSnapshot();
    });

    it('gets broker vault swap data for bitcoin', async () => {
      expect(
        await client.sendRequest(
          'broker_request_swap_parameter_encoding',
          { chain: 'Bitcoin', asset: 'BTC' },
          { chain: 'Ethereum', asset: 'USDC' },
          '0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97',
          10,
          {
            chain: 'Bitcoin',
            min_output_amount: '0x1',
            retry_duration: 100,
          },
        ),
      ).toMatchInlineSnapshot(`
        {
          "chain": "Bitcoin",
          "deposit_address": "bcrt1pmrhjpvq2w7cgesrcrvuhqw6n6j487l6uc7tmwtx9jen7ezesunhqllvzxx",
          "nulldata_payload": "0x0003656623d865425c0a4955ef7e7a39d09f58554d0800000000000000000000000000000000000001000200000100",
        }
      `);
    });

    it('gets broker vault swap data for ethereum', async () => {
      expect(
        await client.sendRequest(
          'broker_request_swap_parameter_encoding',
          { chain: 'Ethereum', asset: 'ETH' },
          { chain: 'Ethereum', asset: 'USDC' },
          '0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97',
          10,
          {
            chain: 'Ethereum',
            input_amount: `0x111111`,
            refund_parameters: {
              refund_address: '0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97',
              retry_duration: 100,
              min_price: '0x1',
            },
          },
        ),
      ).toMatchInlineSnapshot(`
        {
          "calldata": "0xdd68734500000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000014b5fb203bd12f528813b512408b374a8f0f44367a000000000000000000000000000000000000000000000000000000000000000000000000000000000000005f0000000000004cd85eb477b4820bbf10dc4689d8b344c2722eac000000000000000000000000000000000000000000000000000000000000000000009059e6d854b769a505d01148af212bf8cb7f8469a7153edce8dcaedd9d29912501000000",
          "chain": "Ethereum",
          "source_token_address": "0x10c6e9530f1c1af873a391030a1d9e8ed0630d26",
          "to": "0xb7a5bd0345ef1cc5e66bf61bdec17d2461fbd968",
          "value": 5000000000000000000n,
        }
      `);
    });

    it('gets broker vault swap data for solana', async () => {
      expect(
        await client.sendRequest(
          'broker_request_swap_parameter_encoding',
          { chain: 'Solana', asset: 'SOL' },
          { chain: 'Ethereum', asset: 'USDC' },
          '0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97',
          10,
          {
            chain: 'Solana',
            from: 'oQPnhXAbLbMuKHESaGrbXT17CyvWCpLyERSJA9HCYd7',
            event_data_account: 'HTox3DgDcrzsK5RvduHnW9Fu7m3QaQr3VwQ9oDmrnfr6',
            input_amount: '0x11111',
            refund_parameters: {
              refund_address: '0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97',
              retry_duration: 100,
              min_price: '0x1',
            },
          },
        ),
      ).toMatchInlineSnapshot(`
        {
          "accounts": [
            {
              "is_signer": true,
              "is_writable": true,
              "pubkey": "Gm4QT3aC9YZtyZAFjMNTVEMB4otEY1JW2dVEBFbGfr9p",
            },
            {
              "is_signer": false,
              "is_writable": true,
              "pubkey": "2tmtGLQcBd11BMiE9B1tAkQXwmPNgR79Meki2Eme4Ec9",
            },
            {
              "is_signer": false,
              "is_writable": false,
              "pubkey": "11111111111111111111111111111111",
            },
          ],
          "chain": "Solana",
          "data": "0xa3265ce2f3698dc400e876481700000001000000140000004d2c78895c0fb2dbc04ecb98345f7b5e30bbd5f203000000006b000000000000000004f79d5e026f12edc6443a534b2cdd5072233989b415d7596573e743f3e5b386fb000000000000000000000000000000000000000000000000000000000000000000009059e6d854b769a505d01148af212bf8cb7f8469a7153edce8dcaedd9d299125010000",
          "program_id": "35uYgHdfZQT4kHkaaXQ6ZdCkK5LFrsk43btTLbGCRCNT",
        }
      `);
    });

    it('gets node vault swap data for bitcoin', async () => {
      expect(
        await client.sendRequest(
          'cf_request_swap_parameter_encoding',
          'cFLRQDfEdmnv6d2XfHJNRBQHi4fruPMReLSfvB8WWD2ENbqj7',
          { chain: 'Bitcoin', asset: 'BTC' },
          { chain: 'Ethereum', asset: 'USDC' },
          '0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97',
          10,
          {
            chain: 'Bitcoin',
            min_output_amount: '0x1',
            retry_duration: 100,
          },
        ),
      ).toMatchInlineSnapshot(`
        {
          "chain": "Bitcoin",
          "deposit_address": "bcrt1pmrhjpvq2w7cgesrcrvuhqw6n6j487l6uc7tmwtx9jen7ezesunhqllvzxx",
          "nulldata_payload": "0x0003656623d865425c0a4955ef7e7a39d09f58554d0800000000000000000000000000000000000001000200000100",
        }
      `);
    });

    it('gets unregistered account info', async () => {
      expect(
        await client.sendRequest(
          'cf_account_info',
          'cFNz3kSjvCHubkrtfYtBkzY2WpACDmXqQ9YGxbMgRD2iu1LCc',
        ),
      ).toMatchSnapshot();
    });

    it('gets pools orders', async () => {
      expect(
        await client.sendRequest(
          'cf_pool_orders',
          { chain: 'Ethereum', asset: 'ETH' },
          { asset: 'USDC', chain: 'Ethereum' },
        ),
      ).toMatchSnapshot();
    });

    it('gets lp total balances', async () => {
      expect(await client.sendRequest('lp_total_balances', LP_ACCOUNT_ID)).toMatchSnapshot();
    });

    it('requests deposit addresses', async () => {
      expect(
        await client.sendRequest(
          'broker_request_swap_deposit_address',
          { asset: 'BTC', chain: 'Bitcoin' },
          { asset: 'ETH', chain: 'Ethereum' },
          '0x4567',
          100,
          { gas_budget: '0x0', message: '0x0' },
          30,
          [{ account: '0x1234', bps: 0 }],
          {
            refund_address: '0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97',
            retry_duration: 100,
            min_price: '0x1',
          },
        ),
      ).toMatchInlineSnapshot(`
        {
          "address": "0x1234",
          "channel_id": 1,
          "channel_opening_fee": 0n,
          "issued_block": 1,
          "source_chain_expiry_block": 1n,
        }
      `);
      expect(callCounter).toEqual(1);
    });

    it.each(['cf_failed_call_ethereum', 'cf_failed_call_arbitrum'])(
      'handles failed calls (%s)',
      async () => {
        expect(await client.sendRequest('cf_failed_call_ethereum', 1)).toEqual(failedCallEvm);
        expect(await client.sendRequest('cf_failed_call_ethereum', 2)).toBeNull();
      },
    );

    it('handles cf_pool_orderbook', async () => {
      expect(
        await client.sendRequest(
          'cf_pool_orderbook',
          { chain: 'Ethereum', asset: 'FLIP' },
          { chain: 'Ethereum', asset: 'USDC' },
          1000,
        ),
      ).toMatchInlineSnapshot(`
        {
          "asks": [
            {
              "amount": 46753058565446130239012n,
              "sqrt_price": 64630826319013095607270n,
            },
            {
              "amount": 44100436900143846942228n,
              "sqrt_price": 68518341775354431960110n,
            },
            {
              "amount": 41598316654751478697107n,
              "sqrt_price": 72639689558847518484343n,
            },
            {
              "amount": 55454500902567204336167n,
              "sqrt_price": 77067268995118459000145n,
            },
            {
              "amount": 53837212033998851744122n,
              "sqrt_price": 81640987742331057904634n,
            },
            {
              "amount": 50804673859249984018103n,
              "sqrt_price": 86552271380382780606711n,
            },
            {
              "amount": 47948522681948256737269n,
              "sqrt_price": 91757700510720620096997n,
            },
            {
              "amount": 37019294219495276748987n,
              "sqrt_price": 96989993734613759931926n,
            },
            {
              "amount": 26934220284744773708675n,
              "sqrt_price": 103127979204528125632068n,
            },
            {
              "amount": 25405461594188856223033n,
              "sqrt_price": 109331152920533190719767n,
            },
            {
              "amount": 23964035516204788379085n,
              "sqrt_price": 115907373144969167780705n,
            },
            {
              "amount": 22604391425554018148620n,
              "sqrt_price": 122879150148402091564964n,
            },
            {
              "amount": 21321889269198558537894n,
              "sqrt_price": 130270276330514381823161n,
            },
            {
              "amount": 20112152256132776789443n,
              "sqrt_price": 138105975597336644497814n,
            },
            {
              "amount": 18971051920722732987684n,
              "sqrt_price": 146412988540742718981259n,
            },
            {
              "amount": 13710179002383575641943n,
              "sqrt_price": 154472955790186902963678n,
            },
            {
              "amount": 8347516177464445895011n,
              "sqrt_price": 164556058424230827752097n,
            },
            {
              "amount": 7873904333807042684573n,
              "sqrt_price": 174454032148278151200438n,
            },
            {
              "amount": 7427163738277091207349n,
              "sqrt_price": 184947364664173073044334n,
            },
            {
              "amount": 5263358441301477921750n,
              "sqrt_price": 194621516264240857154312n,
            },
            {
              "amount": 15n,
              "sqrt_price": 91484801910019865068323741258n,
            },
            {
              "amount": 6n,
              "sqrt_price": 102283117989453508542900927322n,
            },
            {
              "amount": 13n,
              "sqrt_price": 87895754586453540682326497314n,
            },
            {
              "amount": 3n,
              "sqrt_price": 112045541949572279837463876454n,
            },
            {
              "amount": 10331160708553705597n,
              "sqrt_price": 660255715340516735938401n,
            },
          ],
          "bids": [
            {
              "amount": 25373865255616642815149n,
              "sqrt_price": 61795464824976308592965n,
            },
            {
              "amount": 26154793830615988860297n,
              "sqrt_price": 59950378810627830160621n,
            },
            {
              "amount": 26959756955854601891269n,
              "sqrt_price": 58160383287529860555182n,
            },
            {
              "amount": 23935263102372336825044n,
              "sqrt_price": 56525027814902774807799n,
            },
            {
              "amount": 13309283002338890750251n,
              "sqrt_price": 54739133261808415886935n,
            },
            {
              "amount": 13718901296775874421862n,
              "sqrt_price": 53104734855241885568231n,
            },
            {
              "amount": 14141126367033011408800n,
              "sqrt_price": 51519136238002961276233n,
            },
            {
              "amount": 14576346210420817470903n,
              "sqrt_price": 49980880351826531508890n,
            },
            {
              "amount": 15024960765599056984381n,
              "sqrt_price": 48488553629100335698451n,
            },
            {
              "amount": 9658665922700496104699n,
              "sqrt_price": 47307334696566458274119n,
            },
          ],
        }
      `);
    });

    it('handles multiple requests with 1 call', async () => {
      const [r1, r2] = await Promise.all([
        client.sendRequest(
          'cf_pool_orders',
          { chain: 'Ethereum', asset: 'ETH' },
          { asset: 'USDC', chain: 'Ethereum' },
        ),
        client.sendRequest(
          'broker_request_swap_deposit_address',
          { asset: 'BTC', chain: 'Bitcoin' },
          { asset: 'ETH', chain: 'Ethereum' },
          '0x4567',
          100,
          { gas_budget: '0x0', message: '0x0' },
          30,
          [{ account: '0x1234', bps: 0 }],
          {
            refund_address: '0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97',
            retry_duration: 100,
            min_price: '0x1',
          },
        ),
      ]);
      expect(r1).toMatchSnapshot();

      expect(r2).toMatchInlineSnapshot(`
        {
          "address": "0x1234",
          "channel_id": 1,
          "channel_opening_fee": 0n,
          "issued_block": 1,
          "source_chain_expiry_block": 1n,
        }
      `);
      expect(callCounter).toEqual(1);
    });

    it('handles multiple requests separately if they are sent far apart', async () => {
      const r1 = await client.sendRequest(
        'cf_pool_orders',
        { chain: 'Ethereum', asset: 'ETH' },
        { asset: 'USDC', chain: 'Ethereum' },
      );

      const r2 = await client.sendRequest(
        'broker_request_swap_deposit_address',
        { asset: 'BTC', chain: 'Bitcoin' },
        { asset: 'ETH', chain: 'Ethereum' },
        '0x4567',
        100,
        { gas_budget: '0x0', message: '0x0' },
        30,
        [{ account: '0x1234', bps: 0 }],
        {
          refund_address: '0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97',
          retry_duration: 100,
          min_price: '0x1',
        },
      );
      expect(r1).toMatchSnapshot();

      expect(r2).toMatchInlineSnapshot(`
        {
          "address": "0x1234",
          "channel_id": 1,
          "channel_opening_fee": 0n,
          "issued_block": 1,
          "source_chain_expiry_block": 1n,
        }
      `);
      expect(callCounter).toEqual(2);
    });

    it('throws on a non-200 response', async () => {
      spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: false,
        status: 404,
      } as Response);
      await expect(client.sendRequest('cf_accounts')).rejects.toThrow('HTTP error: 404');
    });

    it('throws on invalid JSON', async () => {
      spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: true,
        // eslint-disable-next-line @typescript-eslint/require-await
        json: async () => JSON.parse('{'),
      } as Response);
      await expect(client.sendRequest('cf_accounts')).rejects.toThrow('Invalid JSON response');
    });

    it('throws when parsing the result fails', async () => {
      // eslint-disable-next-line dot-notation
      client['getRequestId'] = () => '1';
      spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: true,
        // eslint-disable-next-line @typescript-eslint/require-await
        json: async () => [{ id: '1', jsonrpc: '2.0', result: [['account 1', null]] }],
      } as Response);
      await expect(client.sendRequest('cf_accounts')).rejects.toThrowErrorMatchingInlineSnapshot(
        `
        [ZodError: [
          {
            "code": "invalid_type",
            "expected": "string",
            "received": "null",
            "path": [
              0,
              1
            ],
            "message": "Expected string, received null"
          }
        ]]
      `,
      );
    });

    it('returns the rejected error message', async () => {
      await expect(
        client.sendRequest(
          'cf_swap_rate',
          { asset: 'BTC', chain: 'Bitcoin' },
          { asset: 'ETH', chain: 'Ethereum' },
          '0x1',
          1 as unknown as HexString,
        ),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `[Error: RPC error [-32602]: invalid parameter type]`,
      );
    });

    it('uses monotonically increasing request IDs in insecure envs', async () => {
      spyOn(crypto, 'randomUUID').mockImplementationOnce(() => {
        throw new Error('test');
      });

      const fetchSpy = spyOn(globalThis, 'fetch');

      await expect(client.sendRequest('cf_supported_assets')).resolves.not.toThrowError();

      expect(fetchSpy.mock.calls?.[0]?.[1]?.body).toMatchInlineSnapshot(
        `"[{"jsonrpc":"2.0","id":"1","method":"cf_supported_assets","params":[]}]"`,
      );
    });

    it('rejects unfound requests', async () => {
      spyOn(globalThis, 'fetch').mockImplementation((url, init) => {
        const body = JSON.parse(init!.body as string) as JsonRpcRequest<RpcMethod>[];

        expect(body).toHaveLength(2);
        expect(body[0].method).toEqual('cf_account_info');
        expect(body[1].method).toEqual('cf_account_info');
        expect(body[0].params[0]).toEqual(LP_ACCOUNT_ID);
        expect(body[1].params[0]).toEqual(BROKER_ACCOUNT_ID);

        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve([
              {
                id: body[0].id,
                jsonrpc: '2.0',
                result: liquidityProviderAccount,
              },
            ]),
        } as Response);
      });

      const results = await Promise.allSettled(
        [LP_ACCOUNT_ID, BROKER_ACCOUNT_ID].map((id) => client.sendRequest('cf_account_info', id)),
      );

      expect(results[0]).toMatchObject({
        status: 'fulfilled',
        value: { role: 'liquidity_provider' },
      });
      expect(results[1]).toMatchObject({
        status: 'rejected',
        reason: new Error('Could not find the result for the request'),
      });
    });

    it('ignores additional unrecognized responses', async () => {
      spyOn(globalThis, 'fetch').mockImplementation((url, init) => {
        const body = JSON.parse(init!.body as string) as JsonRpcRequest<RpcMethod>[];

        expect(body).toHaveLength(2);
        expect(body[0].method).toEqual('cf_account_info');
        expect(body[1].method).toEqual('cf_account_info');
        expect(body[0].params[0]).toEqual(LP_ACCOUNT_ID);
        expect(body[1].params[0]).toEqual(BROKER_ACCOUNT_ID);

        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve([
              {
                id: body[0].id,
                jsonrpc: '2.0',
                result: liquidityProviderAccount,
              },
              {
                id: body[1].id,
                jsonrpc: '2.0',
                result: brokerAccount,
              },
              {
                id: '3',
                jsonrpc: '2.0',
                result: supportedAssets,
              },
            ]),
        } as Response);
      });

      const results = await Promise.allSettled(
        [LP_ACCOUNT_ID, BROKER_ACCOUNT_ID].map((id) => client.sendRequest('cf_account_info', id)),
      );

      expect(results[0]).toMatchObject({
        status: 'fulfilled',
        value: { role: 'liquidity_provider' },
      });
      expect(results[1]).toMatchObject({
        status: 'fulfilled',
        value: { role: 'broker' },
      });
    });
  });
});
