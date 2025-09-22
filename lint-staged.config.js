import micromatch from 'micromatch';
import * as path from 'path';

/**
 * @param {string[]} files
 * @returns {string[]}
 */
export default function lint(files) {
  const commands = [];

  if (micromatch(files, '**/package.json.md').length) {
    commands.push('pnpm syncpack:check');
  }

  const packages = new Set(
    micromatch(files, '**/packages/**/*')
      .map((file) =>
        file
          .replace(import.meta.dirname, '')
          .match(new RegExp(`packages${path.sep}([^${path.sep}]+)`))
          ?.pop(),
      )
      .filter(Boolean)
      .map((pkg) => `pnpm --filter ${pkg} test run`),
  );

  commands.push(...packages);

  const tsFiles = micromatch(files, '**/*.ts(x)?').map((file) =>
    file.replace(import.meta.dirname, '').slice(1),
  );

  if (tsFiles.length) {
    if (micromatch(files, '**/eslint.config.js').length) {
      commands.push('pnpm eslint --max-warnings 0 --no-warn-ignored .');
    } else {
      commands.push(`pnpm eslint --max-warnings 0 --no-warn-ignored ${tsFiles.join(' ')}`);
    }
  }

  const prettierFiles = tsFiles.concat(micromatch(files, '**/*.js(on)?'));

  if (prettierFiles.length) {
    commands.push(`pnpm prettier --check ${prettierFiles.join(' ')}`);
  }

  return commands;
}
