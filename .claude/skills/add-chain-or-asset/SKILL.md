---
name: add-chain-or-asset
description: Add a new chain or asset to chainflip-product-toolkit (the source-of-truth packages the rest of the webstack depends on). Use when adding a chain/asset here, or when the chainflip-web-add-chain-or-asset orchestrator delegates the product-toolkit step. Covers enums/constants, RPC & redis parsers, the address codec (util for EVM-compatible, package for non-EVM), processor codegen, and publishing @chainflip/* packages.
---

# product-toolkit: add a chain / asset

This is **step 1** of a webstack chain addition and the source of truth: the sdk, web-services,
and frontend consume the packages published from here. Nothing downstream can proceed until you
publish. All paths are relative to this repo root.

## Parameters (contract with the orchestrator)

```
mode:      new-chain | asset-only
category:  evm | evm-compatible | non-evm
chain:     { displayName, shortTag, chainContractId, gasAsset, blockTimeSeconds, evmChainId? }
assets:    [{ internalId, symbol, decimals, assetContractId, contractAddress:{network:addr|null} }]
networks:  subset of [backspin, sisyphos, perseverance, mainnet]
linearParentKey: e.g. WEB-1234
```

Before editing, read the current code — line locations drift; match the existing shape.

## The spine (every chain, all categories)

### 1. Enums & constants — `packages/utils/src/chainflip.ts`

Add the chain and each asset in lockstep to these exports:

- `chainflipAssets` — add each `internalId`.
- `chainflipChains` (non-EVM) **or** `chainflipEvmChains` (EVM + EVM-compatible) — add the chain.
- `addressTypes` — add the `shortTag`.
- `assetConstants` — `{ chain, symbol, decimals }` per asset.
- `assetSymbols` — add novel symbols.
- `chainConstants` — `{ chainflipAssets, assets, gasAsset, addressType, blockTimeSeconds }`.
- `internalAssetToRpcAsset` — `{ chain, asset }` per asset.
- `chainContractId` — the numeric chain id.
- `assetContractId` — the numeric asset id per asset (keep contiguous).
- `getInternalAsset` reverse map — `{ [chain]: { SYMBOL: InternalAsset } }`.
- `chainflipAssetToPriceAssetMap` — price-asset mapping per asset.

### 2. RPC parsers — `packages/rpc/src/`

- `parsers.ts`: add the chain key to `chainAssetMapFactory`, `chainBaseAssetMapFactory`,
  `chainMapFactory`; add `{ chain, asset }` literals to the `rpcAssetSchema` union; add a branch
  to the `requestSwapParameterEncoding` discriminated union; add `broadcast_<chain>` and
  `ingress_egress_<chain>` to `cfSafeModeStatuses`.
- `common.ts`: add `cf_failed_call_<chain>` to the `RpcRequest`/`rpcResult` maps and the chain to
  the `RequestSwapParameterEncodingParams` union.
- `types.ts`: export `CfFailedCall<Chain>` / `CfFailedCall<Chain>Response` types.

### 3. Redis broadcast parser — `packages/redis/src/`

- `parsers.ts`: add the chain to the `broadcastParsers` map (EVM/EVM-compatible → reuse
  `evmBroadcast`; non-EVM → exclude, see category matrix).
- `index.ts`: add a `getBroadcast` overload for the chain.

### 4. Codegen — `packages/processor/`

- `src/codegen/CodeGenerator.ts`: add the chain to the three parallel maps —
  `shortChainToLongChain`, `addressTransforms` (how to encode an on-chain address, see matrix),
  `addressImports` (which util to import for that transform).
- Regenerate the decoders in `packages/processor/generated/**` — do NOT hand-edit; run the build
  (`packages/processor/build.sh`, `BUILD_TARGET=generate pnpm tsdown`).
- Bump chainspec metadata when pulling a new runtime spec: `packages/chainspec/metadata/*.scale`
  - `packages/chainspec/metadata/specVersion.json`.

## Category matrix (what differs)

| Concern                        | EVM                   | EVM-compatible                                                                                                                                                                                                                   | non-EVM (SVM)                                                                         |
| ------------------------------ | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Chain list                     | `chainflipEvmChains`  | `chainflipEvmChains`                                                                                                                                                                                                             | `chainflipChains`                                                                     |
| Address codec                  | none (reuse EVM)      | new util in `packages/utils/src/<chain>.ts` (`isValid<Chain>Address`, `hexTo<Chain>Address`, `<chain>AddressToHex`)                                                                                                              | dedicated `packages/<chain>` package                                                  |
| `addressTransforms[shortTag]`  | hex passthrough       | `hexTo<Chain>Address(value)`                                                                                                                                                                                                     | `base58.encode(hexToBytes(value))`                                                    |
| RPC address parser             | reuse EVM `0x`        | `<chain>Address` zod refinement using the new validator                                                                                                                                                                          | base58 validator from the new package                                                 |
| redis `broadcastParsers`       | shared `evmBroadcast` | shared `evmBroadcast`                                                                                                                                                                                                            | **exclude** (`satisfies Record<Exclude<ChainflipChain,'<Chain>'>,…>`) — bespoke shape |
| `requestSwapParameterEncoding` | shared EVM branch     | **standalone** bespoke `z.object` (`to`/`calldata`/`note`/`value`/`source_token_address`, using a `<chain>Address` zod refinement) — it may start as an `evmBroker...extend({...})` but ends up its own branch (Tron: `d088892`) | separate branch                                                                       |

### EVM (e.g. Arbitrum)

Cheapest. Just another key in the chain maps; reuses `evmBrokerRequestSwapParameterEncoding` and
the shared `evmBroadcast`. No new package, no new validator. (Ref: `ff89e2e`.)

### EVM-compatible (e.g. Tron)

Starts EVM-like but needs a bespoke **address codec util** because addresses are base58 with a
`0x41` prefix + double-SHA256 checksum, not `0x` hex:

- Create `packages/utils/src/<chain>.ts` with `isValid<Chain>Address`, `hexTo<Chain>Address`,
  `<chain>AddressToHex`. (Ref Tron: create `b48f9bc` → `hexToTronAddress` `8d61809` →
  `tronAddressToHex` `406c712`.)
- Set `addressTransforms[shortTag] = hexTo<Chain>Address(value)` (NOT base58) and the matching
  `addressImports`.
- In `packages/solana/src/schemas.ts`, fold the chain into the base58 vault-swap dst-address
  branch if it shares that decoding.
- Add forward-compat guards (`.optional()`/`.default()` with a `TODO(<version>): remove <Chain>
default`) on schemas for nodes that don't yet emit the chain.

### non-EVM (e.g. Solana)

Heaviest — needs a **dedicated codec package** `packages/<chain>`:

- Scaffold: `package.json` (chain web3 dep), `tsdown.config.mjs` (the repo migrated off tsup —
  match the current sibling packages' build config), `tsconfig.json`, `vitest.config.ts`,
  `src/index.ts`, `src/address.ts`, and a unit test `src/__tests__/address.test.ts`. (Ref: `e6a8f48`.)
- `src/address.ts`: curve-based validation (Solana: `ed25519.ExtendedPoint.fromHex(base58.decode(addr))`
  via `@noble/curves`, with `noExternal: ['@noble/curves/*']` in the build config). (Ref: `bb9e94c`.)
- Transaction/deposit parsing: `src/deposit.ts`, `src/tx.ts` (inspect token balances to determine
  input asset), `src/consts.ts` (token mint addresses per network), `src/schemas.ts`, IDLs.
- `addressTransforms[shortTag] = base58.encode(hexToBytes(value))`.
- Add chain to `chainflipChains` (not the EVM list); **exclude** it from redis `broadcastParsers`.

## Asset-only path (asset on an existing chain — ref `2ed4ff1`)

No `chainflipChains`/`addressTypes`/`chainContractId`/codec/publish-of-new-package work. Only:

- `packages/utils/src/chainflip.ts` asset-level entries: `chainflipAssets`, `assetConstants`,
  `assetSymbols` (if novel), `chainConstants[chain].assets`/`.chainflipAssets`,
  `internalAssetToRpcAsset`, `assetContractId`, `getInternalAsset`, `chainflipAssetToPriceAssetMap`.
- `packages/rpc/src/parsers.ts`: add the asset to its chain object in the map factories + a
  literal in `rpcAssetSchema`.
- **SVM asset extra**: add the SPL mint address(es) to `packages/<chain>/src/consts.ts` and a
  `case` in `src/tx.ts` / `src/deposit.ts`. EVM/EVM-compatible token adds need no tx-parsing edit.
- Regenerate processor `generated/**` + chainspec metadata.

## Verify, then publish

1. `pnpm test` (vitest) at root, or `pnpm test:ci` (`CI=1 pnpm -r t run`) — regenerate any changed
   snapshots. `pnpm prettier:check`; `pnpm syncpack:list` to catch version mismatches.
2. Confirm processor codegen re-runs clean (no uncommitted diff after regenerate).
3. Build the touched packages (`pnpm build` / `tsdown` per package; `prepublish` runs
   `build && test run`).
4. **Publish** the affected `@chainflip/*` packages via the repo's release flow: a dedicated
   release commit/PR titled `chore(<pkg>): release @chainflip/<pkg>/v<x>` merged to `main`, which
   CI publishes (this is the pattern in git history — there is no `.changeset`). Bump each package
   that changed (`utils`, `rpc`, `redis`, `processor`, and the new/updated codec package).
   Downstream repos pin these exact versions — record the published versions in the Linear parent
   (`<linearParentKey>`).
