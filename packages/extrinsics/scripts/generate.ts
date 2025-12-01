#!/usr/bin/env -S pnpm tsx
import * as path from 'path';
import Compiler from '@/chainspec/Compiler';
import CodeGenerator from '../src/codegen/CodeGenerator';
import Parser from '../src/codegen/Parser';

const generatedDir = path.join(import.meta.dirname, '..', 'generated');

await new Compiler(Parser, CodeGenerator, generatedDir).compile();
