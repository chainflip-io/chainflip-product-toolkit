#!/usr/bin/env tsx
/* eslint-disable no-console */
/**
 * Chainflip RPC Benchmarking Script
 *
 * Measures response times for LP and CF RPC methods across a set of block hashes,
 * running each call multiple times per block to produce statistically confident results.
 *
 * Usage:
 *   tsx scripts/benchmark-rpc.ts \
 *     --node-url http://localhost:9944 \
 *     --lp-url http://localhost:10589 \
 *     [--block-hashes 0xabc123,0xdef456,0x...] \
 *     --account-id cFabc... \
 *     [--runs 3] \
 *     [--base-asset ETH] [--base-chain Ethereum] \
 *     [--quote-asset USDC] [--quote-chain Ethereum] \
 *     [--include-writes] \
 *     [--output table|json|csv]
 *
 * Modes:
 *   Block-hash mode (--block-hashes provided): queries each method against each block hash RUNS times
 *   Continuous mode (no --block-hashes): polls all methods every 6 seconds until Ctrl+C, then prints stats
 *
 * Method groups:
 *   Node (cf_*): in block-hash mode, queried at each block hash using the `at` param; in continuous mode, queried without `at`
 *   LP API (lp_*): queried against current state (no block hash support)
 *   Writes: excluded by default; use --include-writes to benchmark them (they may mutate state!)
 */

import { parseArgs } from 'node:util';

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

const { values: args } = parseArgs({
  options: {
    'node-url': { type: 'string', default: 'http://localhost:9944' },
    'lp-url': { type: 'string', default: 'http://localhost:10589' },
    'block-hashes': { type: 'string' },
    runs: { type: 'string', default: '3' },
    'account-id': { type: 'string' },
    'base-asset': { type: 'string', default: 'ETH' },
    'base-chain': { type: 'string', default: 'Ethereum' },
    'quote-asset': { type: 'string', default: 'USDC' },
    'quote-chain': { type: 'string', default: 'Ethereum' },
    'include-writes': { type: 'boolean', default: false },
    output: { type: 'string', default: 'table' },
    help: { type: 'boolean', default: false },
  },
  allowPositionals: true,
});

if (args.help) {
  console.log(`
Usage: tsx scripts/benchmark-rpc.ts [options]

Options:
  --node-url <url>        Chainflip node JSON-RPC URL (default: http://localhost:9944)
  --lp-url <url>          LP API server URL (default: http://localhost:10589)
  --block-hashes <hashes> Comma-separated block hashes to query (in ascending block order).
                          If omitted, runs in continuous mode: polls every 6s until Ctrl+C.
  --runs <n>              Number of calls per method per block hash / per poll (default: 3)
  --account-id <id>       Account ID for LP/CF balance queries
  --base-asset <asset>    Base asset symbol for pool queries (default: ETH)
  --base-chain <chain>    Base asset chain for pool queries (default: Ethereum)
  --quote-asset <asset>   Quote asset symbol for pool queries (default: USDC)
  --quote-chain <chain>   Quote asset chain for pool queries (default: Ethereum)
  --include-writes        Also benchmark write methods (WARNING: may submit transactions!)
  --output <format>       Output format: table (default), json, csv
  --help                  Show this message
`);
  process.exit(0);
}

const NODE_URL = args['node-url']!;
const LP_URL = args['lp-url']!;
const RUNS = Math.max(1, parseInt(args.runs!, 10));
const ACCOUNT_ID = args['account-id'] ?? null;
const BASE_ASSET = { asset: args['base-asset']!, chain: args['base-chain']! };
const QUOTE_ASSET = { asset: args['quote-asset']!, chain: args['quote-chain']! };
const INCLUDE_WRITES = args['include-writes']!;
const OUTPUT_FORMAT = args.output!;

const blockHashesRaw = args['block-hashes'];
const BLOCK_HASHES: string[] = blockHashesRaw
  ? blockHashesRaw
      .split(',')
      .map((h) => h.trim())
      .filter(Boolean)
  : [];
const CONTINUOUS_MODE = BLOCK_HASHES.length === 0;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Target = 'node' | 'lp';
type CallKind = 'query' | 'write';

interface MethodConfig {
  name: string;
  target: Target;
  kind: CallKind;
  /** Build params array. For node queries, blockHash is injected as last element. */
  params: (blockHash?: string) => unknown[];
  /** Human-readable note shown in the report */
  note?: string;
}

interface CallResult {
  method: string;
  blockHash: string | null;
  run: number;
  durationMs: number;
  ok: boolean;
  error?: string;
}

interface MethodStats {
  method: string;
  target: Target;
  kind: CallKind;
  note?: string;
  totalCalls: number;
  successCalls: number;
  errorCalls: number;
  errorRate: string;
  avgMs: string;
  minMs: string;
  maxMs: string;
  medianMs: string;
  p95Ms: string;
  stddevMs: string;
  /** Per-block breakdown (for temporal analysis) */
  perBlock: {
    blockHash: string;
    avgMs: string;
    minMs: string;
    maxMs: string;
    errors: number;
  }[];
}

// ---------------------------------------------------------------------------
// Method definitions
// ---------------------------------------------------------------------------

const NODE_QUERY_METHODS: MethodConfig[] = [
  {
    name: 'cf_free_balances',
    target: 'node',
    kind: 'query',
    params: (at) => (ACCOUNT_ID ? (at ? [ACCOUNT_ID, at] : [ACCOUNT_ID]) : []),
    note: ACCOUNT_ID ? undefined : 'Skipped: --account-id not provided',
  },
  {
    name: 'cf_asset_balances',
    target: 'node',
    kind: 'query',
    params: (at) => (ACCOUNT_ID ? (at ? [ACCOUNT_ID, at] : [ACCOUNT_ID]) : []),
    note: ACCOUNT_ID ? undefined : 'Skipped: --account-id not provided',
  },
  {
    name: 'cf_pool_orders',
    target: 'node',
    kind: 'query',
    params: (at) =>
      at
        ? [BASE_ASSET, QUOTE_ASSET, ACCOUNT_ID ?? null, null, at]
        : [BASE_ASSET, QUOTE_ASSET, ACCOUNT_ID ?? null],
    note: `Pool: ${BASE_ASSET.asset}/${QUOTE_ASSET.asset}`,
  },
];

const LP_QUERY_METHODS: MethodConfig[] = [
  {
    name: 'lp_order_fills',
    target: 'lp',
    kind: 'query',
    params: () => [],
    note: 'Current state only (no block hash)',
  },
  {
    name: 'lp_free_balances',
    target: 'lp',
    kind: 'query',
    params: () => [],
    note: 'Current state only (no block hash)',
  },
  {
    name: 'lp_asset_balances',
    target: 'lp',
    kind: 'query',
    params: () => [],
    note: 'Current state only (no block hash)',
  },
];

const LP_WRITE_METHODS: MethodConfig[] = [
  {
    name: 'lp_set_limit_order',
    target: 'lp',
    kind: 'write',
    params: () => [BASE_ASSET, QUOTE_ASSET, 'buy', 1, -887272, '0x0', null],
    note: 'Write op — dummy params, expect error response',
  },
  {
    name: 'lp_update_limit_order',
    target: 'lp',
    kind: 'write',
    params: () => [BASE_ASSET, QUOTE_ASSET, 'buy', 1, null, '0x0', null],
    note: 'Write op — dummy params, expect error response',
  },
  {
    name: 'lp_request_liquidity_deposit_address',
    target: 'lp',
    kind: 'write',
    params: () => [BASE_ASSET, null],
    note: 'Write op — dummy params, expect error response',
  },
  {
    name: 'lp_withdraw_asset',
    target: 'lp',
    kind: 'write',
    params: () => ['0x0', BASE_ASSET, '0x0000000000000000000000000000000000000000', null],
    note: 'Write op — dummy params, expect error response',
  },
  {
    name: 'lp_cancel_orders_batch',
    target: 'lp',
    kind: 'write',
    params: () => [[]],
    note: 'Write op — empty batch',
  },
];

// ---------------------------------------------------------------------------
// HTTP JSON-RPC call
// ---------------------------------------------------------------------------

let requestIdCounter = 0;

async function callRpc(
  url: string,
  method: string,
  params: unknown[],
): Promise<{ ok: boolean; durationMs: number; error?: string }> {
  const id = String(++requestIdCounter);
  const body = JSON.stringify({ jsonrpc: '2.0', id, method, params });

  const start = performance.now();
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });

    const durationMs = performance.now() - start;

    if (!res.ok) {
      return { ok: false, durationMs, error: `HTTP ${res.status}` };
    }

    const json = (await res.json()) as { error?: { code: number; message: string } };
    if (json.error) {
      return { ok: false, durationMs, error: `RPC ${json.error.code}: ${json.error.message}` };
    }

    return { ok: true, durationMs };
  } catch (err) {
    const durationMs = performance.now() - start;
    return { ok: false, durationMs, error: String(err) };
  }
}

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------

function computeStats(values: number[]): {
  avg: number;
  min: number;
  max: number;
  median: number;
  p95: number;
  stddev: number;
} {
  if (values.length === 0) {
    return { avg: 0, min: 0, max: 0, median: 0, p95: 0, stddev: 0 };
  }
  const sorted = [...values].sort((a, b) => a - b);
  const avg = values.reduce((s, v) => s + v, 0) / values.length;
  const min = sorted[0]!;
  const max = sorted.at(-1)!;
  const median = sorted[Math.floor(sorted.length / 2)]!;
  const p95 = sorted[Math.floor(sorted.length * 0.95)]!;
  const variance = values.reduce((s, v) => s + (v - avg) ** 2, 0) / values.length;
  const stddev = Math.sqrt(variance);
  return { avg, min, max, median, p95, stddev };
}

function fmt(n: number): string {
  return n.toFixed(1);
}

// ---------------------------------------------------------------------------
// Report building
// ---------------------------------------------------------------------------

function buildStats(method: MethodConfig, results: CallResult[]): MethodStats {
  const relevant = results.filter((r) => r.method === method.name);
  const durations = relevant.map((r) => r.durationMs);
  const ok = relevant.filter((r) => r.ok);
  const stats = computeStats(durations);

  const blockHashes = [...new Set(relevant.map((r) => r.blockHash).filter(Boolean))];

  const perBlock = blockHashes.map((hash) => {
    const blockResults = relevant.filter((r) => r.blockHash === hash);
    const blockDurations = blockResults.map((r) => r.durationMs);
    const blockStats = computeStats(blockDurations);
    return {
      blockHash: hash!,
      avgMs: fmt(blockStats.avg),
      minMs: fmt(blockStats.min),
      maxMs: fmt(blockStats.max),
      errors: blockResults.filter((r) => !r.ok).length,
    };
  });

  return {
    method: method.name,
    target: method.target,
    kind: method.kind,
    note: method.note,
    totalCalls: relevant.length,
    successCalls: ok.length,
    errorCalls: relevant.length - ok.length,
    errorRate:
      relevant.length > 0
        ? `${(((relevant.length - ok.length) / relevant.length) * 100).toFixed(0)}%`
        : 'N/A',
    avgMs: fmt(stats.avg),
    minMs: fmt(stats.min),
    maxMs: fmt(stats.max),
    medianMs: fmt(stats.median),
    p95Ms: fmt(stats.p95),
    stddevMs: fmt(stats.stddev),
    perBlock,
  };
}

// ---------------------------------------------------------------------------
// Table renderer
// ---------------------------------------------------------------------------

function printTable(methodStats: MethodStats[], blockHashes: string[]): void {
  const COLS = [
    'Method',
    'Target',
    'Kind',
    'Calls',
    'Errors',
    'Avg(ms)',
    'Min(ms)',
    'Max(ms)',
    'Median(ms)',
    'p95(ms)',
    'StdDev(ms)',
    'Note',
  ];
  const rows = methodStats.map((s) => [
    s.method,
    s.target,
    s.kind,
    String(s.totalCalls),
    `${s.errorCalls} (${s.errorRate})`,
    s.avgMs,
    s.minMs,
    s.maxMs,
    s.medianMs,
    s.p95Ms,
    s.stddevMs,
    s.note ?? '',
  ]);

  const widths = COLS.map((c, i) => Math.max(c.length, ...rows.map((r) => (r[i] ?? '').length)));

  const sep = `+${widths.map((w) => '-'.repeat(w + 2)).join('+')}+`;
  const formatRow = (cells: string[]) =>
    `|${cells.map((c, i) => ` ${c.padEnd(widths[i]!)} `).join('|')}|`;

  console.log('\n=== Summary ===\n');
  console.log(sep);
  console.log(formatRow(COLS));
  console.log(sep);
  for (const row of rows) console.log(formatRow(row));
  console.log(sep);

  // Per-block temporal breakdown (only for methods that used block hashes)
  const withBlocks = methodStats.filter((s) => s.perBlock.length > 1);
  if (withBlocks.length > 0) {
    console.log('\n=== Per-Block Avg Response Time (ms) ===\n');
    const shortHashes = blockHashes.map((h) => `${h.slice(0, 10)}…`);
    const pbCols = ['Method', ...shortHashes];
    const pbRows = withBlocks.map((s) => {
      const blockMap = new Map(s.perBlock.map((b) => [b.blockHash, b.avgMs]));
      return [s.method, ...blockHashes.map((h) => blockMap.get(h) ?? 'N/A')];
    });
    const pbWidths = pbCols.map((c, i) =>
      Math.max(c.length, ...pbRows.map((r) => (r[i] ?? '').length)),
    );
    const pbSep = `+${pbWidths.map((w) => '-'.repeat(w + 2)).join('+')}+`;
    const fmtPb = (cells: string[]) =>
      `|${cells.map((c, i) => ` ${c.padEnd(pbWidths[i]!)} `).join('|')}|`;

    console.log(pbSep);
    console.log(fmtPb(pbCols));
    console.log(pbSep);
    for (const row of pbRows) console.log(fmtPb(row));
    console.log(pbSep);

    console.log('\n=== Per-Block Error Counts ===\n');
    const errRows = withBlocks
      .filter((s) => s.perBlock.some((b) => b.errors > 0))
      .map((s) => [
        s.method,
        ...blockHashes.map((h) => {
          const b = s.perBlock.find((pb) => pb.blockHash === h);
          return b ? String(b.errors) : '0';
        }),
      ]);

    if (errRows.length === 0) {
      console.log('No errors recorded across block hashes.');
    } else {
      console.log(pbSep);
      console.log(fmtPb(pbCols));
      console.log(pbSep);
      for (const row of errRows) console.log(fmtPb(row));
      console.log(pbSep);
    }
  }
}

function printJson(methodStats: MethodStats[]): void {
  console.log(JSON.stringify(methodStats, null, 2));
}

function printCsv(methodStats: MethodStats[]): void {
  const header =
    'method,target,kind,totalCalls,successCalls,errorCalls,errorRate,avgMs,minMs,maxMs,medianMs,p95Ms,stddevMs,note';
  console.log(header);
  for (const s of methodStats) {
    console.log(
      [
        s.method,
        s.target,
        s.kind,
        s.totalCalls,
        s.successCalls,
        s.errorCalls,
        s.errorRate,
        s.avgMs,
        s.minMs,
        s.maxMs,
        s.medianMs,
        s.p95Ms,
        s.stddevMs,
        `"${s.note ?? ''}"`,
      ].join(','),
    );
  }
}

// ---------------------------------------------------------------------------
// Report printer (synchronous — safe to call from a signal handler)
// ---------------------------------------------------------------------------

function printReport(
  allMethods: MethodConfig[],
  results: CallResult[],
  reportBlockHashes: string[],
): void {
  const methodStats = allMethods
    .filter((m) => results.some((r) => r.method === m.name))
    .map((m) => buildStats(m, results));

  switch (OUTPUT_FORMAT) {
    case 'json':
      printJson(methodStats);
      break;
    case 'csv':
      printCsv(methodStats);
      break;
    default: {
      printTable(methodStats, reportBlockHashes);

      // Highlight slow outliers (avg > 1000ms)
      const slowMethods = methodStats.filter((s) => parseFloat(s.avgMs) > 1000);
      if (slowMethods.length > 0) {
        console.log('\n=== Slow Methods (avg > 1000ms) ===');
        for (const s of slowMethods) {
          console.log(`  ${s.method}: avg=${s.avgMs}ms, max=${s.maxMs}ms`);
        }
      }

      // Highlight high error rates (>20%)
      const errorProne = methodStats.filter((s) => parseFloat(s.errorRate) > 20);
      if (errorProne.length > 0) {
        console.log('\n=== High Error Rate Methods (>20%) ===');
        for (const s of errorProne) {
          console.log(`  ${s.method}: ${s.errorRate} errors (${s.errorCalls}/${s.totalCalls})`);
        }
      }

      // Temporal drift: largest avg time difference between first and last block
      const driftable = methodStats.filter((s) => s.perBlock.length >= 2);
      if (driftable.length > 0) {
        console.log('\n=== Temporal Drift (first vs last block avg) ===');
        for (const s of driftable) {
          const first = parseFloat(s.perBlock[0]!.avgMs);
          const last = parseFloat(s.perBlock.at(-1)!.avgMs);
          const delta = last - first;
          const sign = delta >= 0 ? '+' : '';
          console.log(
            `  ${s.method.padEnd(48)} ${sign}${fmt(delta)}ms  (${s.perBlock[0]!.avgMs}ms → ${s.perBlock.at(-1)!.avgMs}ms)`,
          );
        }
      }
      break;
    }
  }
}

// ---------------------------------------------------------------------------
// Main benchmark loop
// ---------------------------------------------------------------------------

async function runOnePoll(
  allMethods: MethodConfig[],
  results: CallResult[],
  runOffset: number,
  blockHash?: string,
): Promise<void> {
  for (const method of allMethods) {
    const isSkipped = method.note?.startsWith('Skipped') && method.kind === 'query';
    if (isSkipped) continue;

    const url = method.target === 'node' ? NODE_URL : LP_URL;
    const bh = method.target === 'node' && method.kind === 'query' ? blockHash : undefined;
    for (let r = 0; r < RUNS; r++) {
      const params = method.params(bh);
      const { ok, durationMs, error } = await callRpc(url, method.name, params);
      results.push({
        method: method.name,
        blockHash: bh ?? null,
        run: runOffset + r,
        durationMs,
        ok,
        error,
      });
      process.stdout.write(ok ? '.' : 'E');
    }
  }
}

async function run(): Promise<void> {
  const allMethods: MethodConfig[] = [
    ...NODE_QUERY_METHODS,
    ...LP_QUERY_METHODS,
    ...(INCLUDE_WRITES ? LP_WRITE_METHODS : []),
  ];

  const results: CallResult[] = [];

  if (CONTINUOUS_MODE) {
    console.log(`
Chainflip RPC Benchmark
-----------------------
Node URL:     ${NODE_URL}
LP URL:       ${LP_URL}
Mode:         Continuous (polling every 6s — press Ctrl+C to stop)
Runs/poll:    ${RUNS}
Account ID:   ${ACCOUNT_ID ?? '(not provided)'}
Asset pair:   ${BASE_ASSET.asset}/${QUOTE_ASSET.asset}
Write ops:    ${INCLUDE_WRITES ? 'included (WARNING: may mutate state!)' : 'excluded'}
Methods:      ${allMethods.length}
    `);

    let pollCount = 0;

    process.once('SIGINT', () => {
      process.stdout.write('\n\nCtrl+C received — generating report...\n\n');
      printReport(allMethods, results, []);
      process.exit(0);
    });

    while (true) {
      pollCount++;
      process.stdout.write(`[Poll ${String(pollCount).padStart(4)}] `);
      await runOnePoll(allMethods, results, (pollCount - 1) * RUNS);
      console.log();
      await new Promise<void>((resolve) => setTimeout(resolve, 6_000));
    }
  } else {
    console.log(`
Chainflip RPC Benchmark
-----------------------
Node URL:     ${NODE_URL}
LP URL:       ${LP_URL}
Block hashes: ${BLOCK_HASHES.length} (${BLOCK_HASHES[0]?.slice(0, 12)}… → ${BLOCK_HASHES.at(-1)?.slice(0, 12)}…)
Runs/block:   ${RUNS}
Account ID:   ${ACCOUNT_ID ?? '(not provided)'}
Asset pair:   ${BASE_ASSET.asset}/${QUOTE_ASSET.asset}
Write ops:    ${INCLUDE_WRITES ? 'included (WARNING: may mutate state!)' : 'excluded'}
Methods:      ${allMethods.length}
    `);

    for (const method of allMethods) {
      const isSkipped = method.note?.startsWith('Skipped') && method.kind === 'query';
      if (isSkipped) {
        console.log(`  SKIP  ${method.name.padEnd(48)} ${method.note}`);
        continue;
      }

      process.stdout.write(`  RUN   ${method.name.padEnd(48)} `);

      // For node query methods: run against each block hash
      // For LP/write methods: run without block hash (repeated RUNS * blockHashes.length times
      //                       so the total call count is comparable)
      if (method.target === 'node' && method.kind === 'query') {
        for (const blockHash of BLOCK_HASHES) {
          for (let r = 0; r < RUNS; r++) {
            const params = method.params(blockHash);
            const { ok, durationMs, error } = await callRpc(NODE_URL, method.name, params);
            results.push({ method: method.name, blockHash, run: r, durationMs, ok, error });
            process.stdout.write(ok ? '.' : 'E');
          }
        }
      } else if (method.target === 'lp') {
        const totalRuns = RUNS * BLOCK_HASHES.length;
        for (let r = 0; r < totalRuns; r++) {
          const params = method.params();
          const { ok, durationMs, error } = await callRpc(LP_URL, method.name, params);
          results.push({ method: method.name, blockHash: null, run: r, durationMs, ok, error });
          process.stdout.write(ok ? '.' : 'E');
        }
      }

      console.log();
    }
  }

  console.log();

  printReport(allMethods, results, BLOCK_HASHES);
}

run().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
