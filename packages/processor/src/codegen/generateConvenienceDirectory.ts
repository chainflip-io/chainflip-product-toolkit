import { uncapitalize } from '@chainflip/utils/string';
import * as fs from 'fs/promises';
import * as path from 'path';
import SpecVersion from '@/chainspec/SpecVersion';
import { formatCode } from '@/chainspec/utils';
import type { FinalThree } from './trackLatestVersions';

const getParserName = (palletName: string, eventName: string): string =>
  `${uncapitalize(palletName)}${eventName}`;

const generateSingleExport = (palletName: string, eventName: string, version: string): string => {
  const parserName = getParserName(palletName, eventName);
  const palletDir = uncapitalize(palletName);
  const fileName = uncapitalize(eventName);

  return `import { ${parserName} as vParser } from '../../${version}/${palletDir}/${fileName}';

export function ${parserName}(): typeof vParser;
export function ${parserName}() {
  return vParser;
}
`;
};

const generateUnionExport = (
  palletName: string,
  eventName: string,
  newerVersion: string,
  olderVersion: string,
): string => {
  const parserName = getParserName(palletName, eventName);
  const palletDir = uncapitalize(palletName);
  const fileName = uncapitalize(eventName);

  return `import { z } from 'zod';
import { ${parserName} as ${parserName}${newerVersion} } from '../../${newerVersion}/${palletDir}/${fileName}';
import { ${parserName} as ${parserName}${olderVersion} } from '../../${olderVersion}/${palletDir}/${fileName}';

export function ${parserName}Factory(): z.ZodUnion<[typeof ${parserName}${newerVersion}, typeof ${parserName}${olderVersion}]>;
export function ${parserName}Factory(
  transform: (input: z.output<typeof ${parserName}${olderVersion}>) => z.output<typeof ${parserName}${newerVersion}>
): z.ZodUnion<[typeof ${parserName}${newerVersion}, z.ZodEffects<typeof ${parserName}${olderVersion}, z.output<typeof ${parserName}${newerVersion}>, z.input<typeof ${parserName}${olderVersion}>>]>;
export function ${parserName}Factory(
  transform?: (input: z.output<typeof ${parserName}${olderVersion}>) => z.output<typeof ${parserName}${newerVersion}>
) {
  return transform
    ? z.union([${parserName}${newerVersion}, ${parserName}${olderVersion}.transform(transform)])
    : z.union([${parserName}${newerVersion}, ${parserName}${olderVersion}]);
}
`;
};

const generateConvenienceDirectory = async (
  generatedDir: string,
  dirName: 'latest' | 'previous',
  tracking: Map<string, Map<string, FinalThree>>,
  targetVersion: SpecVersion,
  previousVersion: SpecVersion,
): Promise<void> => {
  const outDir = path.join(generatedDir, dirName);
  await fs.rm(outDir, { recursive: true, force: true });

  for (const [palletName, events] of tracking) {
    for (const [eventName, history] of events) {
      if (history.isDeleted()) continue;
      const palletDir = path.join(outDir, uncapitalize(palletName));
      await fs.mkdir(palletDir, { recursive: true });

      let code;

      if (history.new === targetVersion && history.old === previousVersion) {
        code = generateUnionExport(
          palletName,
          eventName,
          targetVersion.toString(),
          previousVersion.toString(),
        );
      } else {
        code = generateSingleExport(palletName, eventName, history.new.toString());
      }

      await fs.writeFile(
        path.join(palletDir, `${uncapitalize(eventName)}.ts`),
        await formatCode(code),
        'utf8',
      );
    }
  }
};

export default generateConvenienceDirectory;
