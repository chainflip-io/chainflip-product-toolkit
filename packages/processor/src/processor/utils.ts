import type { Semver } from './types';

export const generatePalletEventName = <
  const C extends readonly string[],
  const P extends string,
  const E extends readonly string[],
>(
  chains: C,
  pallet: P,
  events: E,
) =>
  Object.fromEntries(
    chains.map((c) => [
      `${c}${pallet}` as const,
      Object.fromEntries(events.map((e) => [e, `${c}${pallet}.${e}`] as const)),
    ]),
  ) as {
    [Ch in C[number] as `${Ch}${P}`]: {
      [K in E[number]]: `${Ch}${P}.${K}`;
    };
  };

export const parseSemver = (specId: string): Semver => {
  // the specId is in the format of "chainflip-node@<specId>"
  const specNumber = Number.parseInt(specId.split('@')[1], 10);
  if (Number.isNaN(specNumber)) throw new Error('Invalid specId');
  const specStr = specNumber.toString();
  const segmentLength = Math.ceil(specStr.length / 3);
  const padded = specStr.padStart(segmentLength * 3, '0');
  const major = padded.slice(0, segmentLength);
  const minor = padded.slice(segmentLength, segmentLength * 2);
  const patch = padded.slice(segmentLength * 2, segmentLength * 3);
  return `${Number(major)}.${Number(minor)}.${Number(patch)}`;
};
