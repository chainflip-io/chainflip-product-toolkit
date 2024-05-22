const convertBase = (bytes: Uint8Array | number[], fromBase: number, toBase: number): number[] => {
  const result = [];

  for (const byte of bytes) {
    let carry = byte;

    for (let i = 0; i < result.length; i += 1) {
      carry += result[i] * fromBase;
      result[i] = carry % toBase;
      carry = Math.floor(carry / toBase);
    }

    while (carry !== 0) {
      result.push(carry % toBase);
      carry = Math.floor(carry / toBase);
    }
  }

  let leadingZeros = 0;
  while (bytes[leadingZeros] === 0) {
    leadingZeros += 1;
    result.push(0);
  }

  return result.reverse();
};

export const encodeWithCharset = (bytes: Uint8Array | number[], charset: string): string =>
  convertBase(bytes, 256, charset.length)
    .map((charCode) => charset.charAt(charCode))
    .join('');

export const decodeWithCharset = (input: string, charset: string): number[] => {
  const charMap = Object.fromEntries([...charset].map((char, index) => [char, index]));

  const bytes = input.split('').map((char) => charMap[char]);

  return convertBase(bytes, charset.length, 256);
};
