#!/usr/bin/env -S pnpm tsx
import { chainflipChains } from '@chainflip/utils/chainflip';
import * as path from 'path';
import Compiler from '@/chainspec/Compiler';
import CodeGenerator from '../src/codegen/CodeGenerator';
import Parser from '../src/codegen/Parser';
import trackLatestVersions from '../src/codegen/trackLatestVersions';

const generatedDir = path.join(import.meta.dirname, '..', 'generated');

const latestVersions = await new Compiler(Parser, CodeGenerator, generatedDir).compile(
  trackLatestVersions,
);

const chainRegExp = new RegExp(`^(${chainflipChains.join('|')})(.+)$`, 'i');

for (const msg of latestVersions
  .entries()
  .flatMap(([pallet, events]) => {
    const [, chain = '', palletName = pallet] = pallet.match(chainRegExp) ?? [];

    return events
      .entries()
      .map(([event, version]) =>
        `${palletName}.${event}: ${version} ${chain && `(${chain})`}`.trim(),
      );
  })
  .toArray()
  .sort()) {
  console.log(msg);
}
