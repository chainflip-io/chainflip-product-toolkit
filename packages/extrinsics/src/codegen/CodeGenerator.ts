import { capitalize } from '@chainflip/utils/string';
import BaseCodeGenerator, { CodegenResult, Code, Identifier } from '@/chainspec/BaseCodeGenerator';
import {
  ArrayType,
  EnumType,
  MapType,
  OptionType,
  PrimitiveType,
  RangeType,
  ResolvedType,
  StructType,
  TupleType,
} from '@/chainspec/BaseParser';
import assert from 'assert';

const assetMap = {
  Btc: { chain: 'Bitcoin', symbol: 'BTC' },

  Eth: { chain: 'Ethereum', symbol: 'ETH' },
  Flip: { chain: 'Ethereum', symbol: 'FLIP' },
  Usdc: { chain: 'Ethereum', symbol: 'USDC' },
  Usdt: { chain: 'Ethereum', symbol: 'USDT' },

  Dot: { chain: 'Polkadot', symbol: 'DOT' },

  ArbEth: { chain: 'Arbitrum', symbol: 'ETH' },
  ArbUsdc: { chain: 'Arbitrum', symbol: 'USDC' },

  Sol: { chain: 'Solana', symbol: 'SOL' },
  SolUsdc: { chain: 'Solana', symbol: 'USDC' },
} as const;

const allEvmAssets = [
  'Eth',
  'Flip',
  'Usdc',
  'Usdt',
  'ArbEth',
  'ArbUsdc',
].toSorted() as (keyof typeof assetMap)[];

const allSolanaAssets = ['Sol', 'SolUsdc'].toSorted() as (keyof typeof assetMap)[];

const isKnownAsset = (asset: string): asset is keyof typeof assetMap => asset in assetMap;

const CHAINFLIP_ASSET = 'chainflipAsset';

const utilities = {
  hexString() {
    return new Code(
      "z.string().refine((v): v is `0x${string}` => /^0x[\\da-f]*$/i.test(v), { message: 'Invalid hex string' })",
    );
  },
  toEncodedAddress(this: CodeGenerator) {
    const evmAssets = allEvmAssets.filter((a) => this.seenAssets.has(a));
    const solanaAssets = allSolanaAssets.filter((a) => this.seenAssets.has(a));

    return new Code(
      `(address: string, asset: ChainflipAsset) => {
      const assetToShortChain = {
        Eth: 'eth',
        Flip: 'eth',
        Usdc: 'eth',
        Usdt: 'eth',
        ArbEth: 'arb',
        ArbUsdc: 'arb',
        Dot: 'dot',
        Sol: 'sol',
        SolUsdc: 'sol',
        Btc: 'btc',
      };

      switch (asset) {
        ${evmAssets.map((asset) => `case '${asset}':`).join('\n')}
          return { [assetToShortChain[asset]]: hexToBytes(address as HexString)};
        case 'Dot':
          return { [assetToShortChain[asset]]: address.startsWith('0x') ? hexToBytes(address as HexString) : ss58.decode(address).data }
        ${solanaAssets.map((asset) => `case '${asset}':`).join('\n')}
        ${solanaAssets.length ? "return { [assetToShortChain[asset]]: address.startsWith('0x') ? hexToBytes(address as HexString) : base58.decode(address) };" : ''}
        case 'Btc':
          return { [assetToShortChain[asset]]: bytesToHex(new TextEncoder().encode(address)) };
        default:
          const x: never = asset;
          throw new Error(\`Unknown asset: \${x}\`);
      }
    }`,
      [
        new Identifier(capitalize(CHAINFLIP_ASSET)).asType(),
        new Identifier('* as base58', '@chainflip/utils/base58'),
        new Identifier('* as ss58', '@chainflip/utils/ss58'),
        new Identifier('bytesToHex', '@chainflip/utils/bytes'),
        new Identifier('hexToBytes', '@chainflip/utils/bytes'),
        new Identifier('HexString', '@chainflip/utils/types').asType(),
      ],
    );
  },
  encodeRefundParameters() {
    return new Code(
      `(
        params: { retryDuration: number; refundAddress: string; minPrice: \`0x\${string}\` },
        asset: ChainflipAsset,
        chainflipNetwork: 'mainnet' | 'perseverance' | 'sisyphos' | 'backspin',
      ) => ({
        retry_duration: params.retryDuration,
        min_price: params.minPrice,
        refund_address: toForeignChainAddress(params.refundAddress, asset, chainflipNetwork),
      })`,
      [new Identifier('toForeignChainAddress')],
    );
  },
  toForeignChainAddress(this: CodeGenerator) {
    const evmAssets = allEvmAssets.filter((a) => this.seenAssets.has(a));
    const solanaAssets = allSolanaAssets.filter((a) => this.seenAssets.has(a));

    return new Code(
      `(
      address: string,
      asset: ChainflipAsset,
      chainflipNetwork: 'mainnet' | 'perseverance' | 'sisyphos' | 'backspin',
    ) => {
      switch (asset) {
        ${evmAssets.map((asset) => `case '${asset}':`).join('\n')}
        ${solanaAssets.map((asset) => `case '${asset}':`).join('\n')}
        case 'Dot':
          return toEncodedAddress(address, asset);
        case 'Btc':{
          const result = tryParseAddress(address, chainflipNetwork);
          if (!result) throw new Error('Failed to parse bitcoin address');
          const { data, type } = result;
          return {
            btc: {
              [type]: data,
            },
          };
        }
        default:
          const x: never = asset;
          throw new Error(\`Unknown asset: \${x}\`);
      }
    }`,
      [new Identifier('tryParseAddress', '@chainflip/bitcoin')],
    );
  },
} as const;

export default class CodeGenerator extends BaseCodeGenerator {
  protected seenAssets = new Set<keyof typeof assetMap>();

  private generateUtility<const T extends keyof typeof utilities>(name: T): Identifier {
    const type = utilities[name].call(this);
    for (const dep of type.dependencies) {
      if (
        dep instanceof Identifier &&
        dep.pkg === 'common' &&
        !this.registry.types.has(dep.toString()) &&
        dep.toString() in utilities
      ) {
        this.generateUtility(dep.toString() as keyof typeof utilities);
      }
    }
    this.registry.types.set(name, type);
    return new Identifier(name);
  }

  private generateCfAssetEnum(type: EnumType): CodegenResult {
    if (this.registry.types.has('chainflipAsset')) return new Identifier(CHAINFLIP_ASSET);

    const values = type.values.filter((value) => !value.name.startsWith('__Unused'));

    const members: string[] = [];

    for (const { name } of values) {
      assert(isKnownAsset(name), `Unknown asset: ${name}`);
      this.seenAssets.add(name);
      const { chain, symbol } = assetMap[name];

      members.push(
        `z.object({ chain: z.literal('${chain}'), asset: z.literal('${symbol}') })
          .transform(() => '${name}' as const)`,
      );
    }

    const code = `z.object({ chain: z.string(), asset: z.string() }).pipe(z.union([${members.join(', ')}]))`;

    this.registry.types.set(CHAINFLIP_ASSET, new Code(code));
    this.registry.types.set(
      capitalize(CHAINFLIP_ASSET),
      new Code(`z.output<typeof ${CHAINFLIP_ASSET}>`).asType(),
    );

    return new Identifier(CHAINFLIP_ASSET);
  }

  protected override generatePrimitive(def: PrimitiveType): CodegenResult {
    switch (def.name) {
      case 'u16':
      case 'u32':
      case 'u128':
      case 'U256': {
        if (this.registry.types.has(def.name)) return new Identifier(def.name);

        const size = Number.parseInt(def.name.slice(1));
        let code;
        if (size < 64) {
          code = new Code(`z.number().int().gte(0).max(${2 ** size - 1} /* ${def.name} */)`);
        } else {
          code = new Code(
            `z.union([
              hexString.transform((value) => {
                if (BigInt(value) > ${2n ** BigInt(size) - 1n}n /* ${def.name} */) {
                  throw new Error('Value out of range');
                }

                return value;
              }),
              z.number().gte(0).max(Number.MAX_SAFE_INTEGER).transform((n) => \`0x\${n.toString(16)}\` as HexString),
              z.bigint().gte(0n).max(${2n ** BigInt(size) - 1n}n /* ${def.name} */).transform((n) => \`0x\${n.toString(16)}\` as HexString),
              ])`,
            [
              this.generateUtility('hexString'),
              new Identifier('HexString', '@chainflip/utils/types').asType(),
            ],
          );
        }

        this.registry.types.set(def.name, code);
        return new Identifier(def.name);
      }
      case 'Bytes':
        return this.generateUtility('hexString');
      case 'AccountId32':
        return new Code(
          `z.union([
          z.string().transform((s) => {
            try {
              const { data, ss58Format } = ss58.decode(s);
              if (ss58Format !== 2112) throw new Error('Invalid SS58 format');
              return bytesToHex(data);
            } catch {
              throw new Error('Invalid SS58 account ID');
            }
          }),
          hexString.refine((v) => v.length === 66, { message: 'Invalid byte length for account' }),
        ])`,
          [
            this.generateUtility('hexString'),
            new Identifier('* as ss58', '@chainflip/utils/ss58'),
            new Identifier('bytesToHex', '@chainflip/utils/bytes'),
          ],
        );
      default:
        throw new Error(`Method not implemented for primitive type: ${def.name}`);
    }
  }

  protected override generateEnum(def: EnumType): CodegenResult {
    switch (def.name) {
      case 'cfPrimitivesChainsAssetsAnyAsset':
        return this.generateCfAssetEnum(def);
      case 'cfChainsAddressEncodedAddress':
      case 'cfChainsAddressForeignChainAddress':
        return new Code('z.string()');
      default:
        throw new Error(`Method not implemented for enum type: ${def.name}`);
    }
  }

  protected override generateStruct(def: StructType): CodegenResult {
    const fields: string[] = [];
    const dependencies: CodegenResult[] = [];
    for (const [name, type] of Object.entries(def.fields)) {
      const result = this.generateResolvedType(type);
      dependencies.push(result);
      fields.push(`${name}: ${result.toString()}`);
    }
    return new Code(`z.object({ ${fields.join(', ')} })`, dependencies);
  }

  protected override generateArray(def: ArrayType): CodegenResult {
    const length = def.length ? `.length(${def.length})` : '';

    const type = this.generateResolvedType(def.value);

    return new Code(`z.array(${type.toString()})${length}`, [type]);
  }

  protected override generateTuple(_def: TupleType): CodegenResult {
    throw new Error('Method not implemented.');
  }

  protected override generateRange(_def: RangeType): CodegenResult {
    throw new Error('Method not implemented.');
  }

  protected override generateOption(def: OptionType): CodegenResult {
    const type = this.generateResolvedType(def.value);
    return new Code(`${type.toString()}.nullable()`, [type]);
  }

  protected override generateMap(_def: MapType): CodegenResult {
    throw new Error('Method not implemented.');
  }

  protected override generateItem(itemName: string, def: ResolvedType): CodegenResult {
    const type = this.generateResolvedType(def);
    if (itemName.startsWith('request_swap_deposit_address')) {
      assert(def.type === 'struct');
      const dependencies = [...type.dependencies, this.generateUtility('toEncodedAddress')];
      const commission =
        'brokerCommissionBps' in def.fields ? 'brokerCommissionBps' : 'brokerCommission';
      const additionalFields: string[] = [];
      if ('boostFee' in def.fields) additionalFields.push('args.boostFee');
      if ('affiliateFees' in def.fields) additionalFields.push('args.affiliateFees');
      if ('refundParameters' in def.fields) {
        additionalFields.push(
          'args.refundParameters && encodeRefundParameters(args.refundParameters, args.sourceAsset, chainflipNetwork)',
        );
        dependencies.push(this.generateUtility('encodeRefundParameters'));
      }
      if ('dcaParameters' in def.fields) {
        additionalFields.push(
          'args.dcaParameters && { number_of_chunks: args.dcaParameters.numberOfChunks, chunk_interval: args.dcaParameters.chunkInterval }',
        );
      }
      return new Code(
        `(chainflipNetwork: 'mainnet' | 'perseverance' | 'sisyphos' | 'backspin') => ${type.toString()}
          .transform((args) => {
            return [
              args.sourceAsset,
              args.destinationAsset,
              toEncodedAddress(args.destinationAddress, args.destinationAsset),
              args.${commission},
              args.channelMetadata,
              ${additionalFields.join(',')}
            ] as const;
          })`,
        dependencies,
      );
    }
    return type;
  }

  protected getName(palletName: string, itemName: string): string {
    return `${palletName}.${itemName}`;
  }
}
