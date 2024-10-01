#!/usr/bin/env -S pnpm tsx
import * as path from 'path';
import generateAllCode from '@/chainspec/generateAllCode';
import Parser from '../src/codegen/Parser';
import CodeGenerator from '../src/codegen/CodeGenerator';

const generatedDir = path.join(import.meta.dirname, '..', 'generated');

await generateAllCode(Parser, CodeGenerator, generatedDir);
