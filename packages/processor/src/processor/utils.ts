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
