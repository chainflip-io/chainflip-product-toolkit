#!/usr/bin/env -S pnpm tsx
import { chainflipChains } from '@chainflip/utils/chainflip';
import * as path from 'path';
import Compiler from '@/chainspec/Compiler';
import CodeGenerator from '../src/codegen/CodeGenerator';
import generateConvenienceDirectory from '../src/codegen/generateConvenienceDirectory';
import Parser from '../src/codegen/Parser';
import trackLatestVersions from '../src/codegen/trackLatestVersions';

const generatedDir = path.join(import.meta.dirname, '..', 'generated');

const latestVersions = await new Compiler(Parser, CodeGenerator, generatedDir).compile(
  trackLatestVersions,
);

const latest = latestVersions.versions.at(-1)!;
const previous = latestVersions.versions.at(-2)!;
const oldest = latestVersions.versions.at(-3)!;

await generateConvenienceDirectory(generatedDir, 'latest', latestVersions.events, latest, previous);
await generateConvenienceDirectory(
  generatedDir,
  'previous',
  latestVersions.events,
  previous,
  oldest,
);

const chainRegExp = new RegExp(`^(${chainflipChains.join('|')})(.+)$`, 'i');

// for (const msg of latestVersions.events
//   .entries()
//   .flatMap(([pallet, events]) => {
//     const [, chain = '', palletName = pallet] = pallet.match(chainRegExp) ?? [];

//     return events
//       .entries()
//       .map(([event, version]) =>
//         `${palletName}.${event}: ${version} ${chain && `(${chain})`}`.trim(),
//       );
//   })
//   .toArray()
//   .sort()) {
//   console.log(msg);
// }
