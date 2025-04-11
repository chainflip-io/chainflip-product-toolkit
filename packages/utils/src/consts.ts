export const HEARTBEAT_BLOCK_INTERVAL = 150; // interval between heartbeats sent by nodes. Configurable on the state chain
export const CHAINFLIP_SS58_PREFIX = 2112;
export const POLKADOT_SS58_PREFIX = 0;
export const CHAINFLIP_BLOCK_TIME_SECONDS = 6;
export const CHAINFLIP_BLOCKS_PER_YEAR = 5256000;

export const chainflipLinks = {
  website: 'https://chainflip.io',
  discord: 'https://discord.gg/chainflip-community',
  twitter: 'https://twitter.com/chainflip',
  telegram: 'https://t.me/chainflip_io_chat',
  blog: 'https://blog.chainflip.io',
  docs: 'https://docs.chainflip.io',
};

export const chainflipCommunityLinks = {
  discord: 'https://discord.gg/chainflip-community',
  twitter: 'https://twitter.com/chainflip',
  telegram: 'https://t.me/chainflip_io_chat',
};

type AccountAliasMap = {
  [account: string]: { name: string; twitter: string | null };
};

export const smartContractAliasMap = {
  '0xce16f69375520ab01377ce7b88f5ba8c48f8d666': 'Squid',
  '0xd99ac0681b904991169a4f398b9043781adbe0c3': 'Symbiosis',
};

export const brokerAliasMap: AccountAliasMap = {
  cFLRQDfEdmnv6d2XfHJNRBQHi4fruPMReLSfvB8WWD2ENbqj7: {
    name: 'Chainflip Swapping',
    twitter: '@Chainflip',
  },
  cFN1AfNQBEBCkuNAV37WWw34bCAdiW5e5sHTY4LaaRWiBSh7B: {
    name: 'BlockSwap',
    twitter: '@BlockswapBot',
  },
  cFJZVRaybb2PBwxTiAiRLiQfHY4KPB3RpJK22Q7Fhqk979aCH: {
    name: 'Broker as a Service',
    twitter: '@chainflipbaas',
  },
  cFLuWQcabsKpegned1ka3Qad6cTATzpgwLYZK8U5spmkG9MEf: {
    name: 'THORWallet',
    twitter: '@THORWalletDEX',
  },
  cFJjZKzA5rUTb9qkZMGfec7piCpiAQKr15B4nALzriMGQL8BE: { name: 'THORSwap', twitter: '@THORSwap' },
  cFLdvBS9Gq9iqB8Zdb5cmnWgmhqvEojQYGMBquDz7xRiSvsJV: { name: 'THORSwap UI', twitter: '@THORSwap' },
  cFJWWedhJmnsk3P9jEmCfbmgmg62ZpA7LT5WCpwLXEzXuRuc3: {
    name: 'HoudiniSwap',
    twitter: '@HoudiniSwap',
  },
  cFKYhAZR1ycHnXLC1PVttiAMVRK489rKhfRXPA4v9yG4WdzqP: {
    name: 'El Dorado',
    twitter: '@eldorado_market',
  },
  cFN3CjHtr3QdUymjhQPFgHzF3WiNNQy36DJxhLwet269qPWaQ: {
    name: 'SwapBot',
    twitter: '@DragonLabsAsia',
  },
  cFJsX7ECMDciU1Ce6VTmNz5TwgkiTMC3j9XVqmbf3eaxSyjXs: { name: 'BitArch', twitter: '@Bit_Arch' },
  cFNx21kQWmr9wsqq29zWM7RpDBKv4bctudEUE6J22Hd4NUUHR: { name: 'Rango', twitter: '@RangoExchange' },
  cFNdyY1j7jKqgJPLg6UH1aaA4N3s9S52Zyxo8nATYxkovtHUr: { name: 'Babylon', twitter: '@bAPElon' },
  cFNmhAeG1L7f4KrbPvsZyUM8xsNmVbJ51AKv4zgHRaTrF4kBf: {
    name: 'Monkey DEX',
    twitter: '@monkeygodlabs',
  },
  cFLraJ446JFyGxmXhEwbcFQrWoWbGL3n18giQ99ktVFFP2LaJ: {
    name: 'Talisman',
    twitter: '@wearetalisman',
  },
  cFN122fMqitRHRxhVnPHuGeQG1GQ5dQXb25J4FoJmn74x7Mhe: { name: 'OKX Wallet', twitter: '@okxweb3' },
  cFMYQgx3LhxLNDEiFC5nLXp5r1ZUrXocrQDqJB1Z3mqEegT6g: {
    name: 'SubWallet',
    twitter: '@subwalletapp',
  },
  cFMjbSKgEiUacx4pqmSMVajksRf2Vhvefm4Lc5dwJxKA6DW3E: {
    name: 'InstaSwap',
    twitter: '@instaswap_io',
  },
  cFK6mYjpajcwPDZ7JUsac8XUoVSJnhjL43ZMZW7YoN8HE4dD8: {
    name: 'ShapeShift',
    twitter: '@ShapeShift',
  },
  cFNdvoAPed5iA5u8X7RoUK58zYcg5mPL2EM7BMoQBSVxwMjLL: {
    name: 'FortunaSwap',
    twitter: '@fortunaswapdex',
  },
  cFPGQVB86HRbJwHneuKF7RPvD8Lq4soQLHjw82WCB4y9as9TP: {
    name: 'WinBit32.com',
    twitter: '@WinBit32',
  },
  cFJZ15BV75iMChsXkMvCTudzLGdKkKCAgE3bPvnJjJEhi79mM: {
    name: 'SwapperXYZ',
    twitter: null,
  },
  cFNddmecxrTKfytLwV3s7KpBjmsvFAX8xUnrXfnvd4yqtr4vC: {
    name: 'Dexifier',
    twitter: '@DexifierX',
  },
  cFNwtr2mPhpUEB5AyJq38DqMKMkSdzaL9548hajN2DRTwh7Mq: {
    name: 'SwapKit',
    twitter: '@SwapKitPowered',
  },
  cFL4To8Uow6B1hk4dNrhWhvKpkBtnUTrVdWCEKCaXiXMMztjM: {
    name: 'SwapKit',
    twitter: '@SwapKitPowered',
  },
  cFKe4xhoVd783CUTYNxMua4eVE3pSDnbvjLXVRpeq2qC9bSZi: {
    name: 'Cake Wallet',
    twitter: '@cakewallet',
  },
  cFLre1qinRDSoxnQ4sFEXRde58jkmkVMX7B2NFGkgZJ9pQLqF: {
    name: 'Trust Wallet',
    twitter: '@TrustWallet',
  },
  cFKCm1mNBmVH2Lwyp2NTzPa1JNs4KYt19pX3yjbTy7GdCr3aB: {
    name: 'Dexifier',
    twitter: '@DexifierX',
  },
  cFP82c86HiP35H7TwYziqnmUjSym3YdT3U2HwgrqN7krTyyih: {
    name: 'Moca',
    twitter: '@moca_app',
  },
  cFPD5DrrsHb7Wi5nmBcFuPDcGRsWhv5Bz6vvzGqFYPFhbR3Sw: {
    name: 'Squid',
    twitter: '@squidrouter',
  },
  cFJZvt5AiEGwUiFFNxhDuLRcgC1WBR6tE7gaQQfe8dqbzoYkx: {
    name: 'Symbiosis',
    twitter: '@symbiosis_fi',
  },
  cFLvH2ZA3J5dsDdrDuV1Eyh9Jk6yasijtKQagGhMDKoKBU3pc: {
    name: 'LeoDex',
    twitter: null,
  },
} as const;

export const lpAliasMap: AccountAliasMap = {
  cFLBKavxvThwqLWNr7cTwtqhYD6jDqXM31d6QoTLvuK4X78ve: { name: 'CumpsD', twitter: '@cumpsd' },
  cFKy4xbhLxvAVxYuPEWbbTJTed5WtyqNVikH2fS2WYLNHRrFh: {
    name: 'TreStylez',
    twitter: '@StylezCrypto',
  },
  cFKHPcU7dWqZjQarJerUei1ZJWCSGb2AC4VhW5axwYzTsaYRT: { name: 'Shaun', twitter: '@SavcatEth' },
  cFKbPkHcjWs6oryCc4L8i7hgGgFBgS73V8aRpzvQAXykJRrz1: {
    name: 'ChainflipGod',
    twitter: '@chainflipgod',
  },
  cFHy5rshwuXtRvXyEt9a2eK4mzPbs4WqwGkGPWT9XP7jAc2kB: {
    name: 'ChainflipGod',
    twitter: '@chainflipgod',
  },
  cFMboYsd4HvERKXX11LyvZXuTcQzV7KAe9ipP4La5vUs8fd4e: {
    name: 'ChainflipGod',
    twitter: '@chainflipgod',
  },
  cFMVQrUbuTuXmeRinPQovRkCgoyrrRd3N4Q5ZdHfqv4VJi5Hh: {
    name: 'ChainflipGod',
    twitter: '@chainflipgod',
  },
  cFNzKSS48cZ1xQmdub2ykc2LUc5UZS2YjLaZBUvmxoXHjMMVh: { name: 'JIT Strategies', twitter: null },
  cFK6qCSmgYJACMNVk6JnCb5nkccr7yM6aZiKtXUnFAzsX7hvs: { name: 'Marky', twitter: '@Marky_CF' },
  cFJXT4WEEdfiShje4z9JMwAvMiMTu7nioPgXsE9o1KqdVrzLg: { name: 'Auros', twitter: '@Auros_global' },
  cFLGvPhhrribWCx9id5kLVqwiFK4QiVNjQ6ViyaRFF2Nrgq7j: { name: 'Selini', twitter: '@SeliniCapital' },
  cFKZarxpf9MVwzzmYUtQfV61PRkYgTj9wUgUCeuKpKgMLrTow: { name: 'Selini', twitter: '@SeliniCapital' },
  cFLBRkucKofjzUNnFpSoW8Lv4RK24K5tUPFKAWgdrBci9WPDY: { name: 'Selini', twitter: '@SeliniCapital' },
  cFP89cUtPvRYqbnPdT8o3jNGfBbkHLKSHGZCtP248c22hj5iw: { name: 'Selini', twitter: '@SeliniCapital' },
  cFJFN3DAE2wyo655yEn5ewaHQk2BLG7ctCDpBHnb4Wkb3jkN8: { name: 'Selini', twitter: '@SeliniCapital' },
  cFJsDTPT4Pcwco6raEz5PJC65nrdvhcu3ZoEBhtQxapsWmB8A: { name: 'Tokka Labs', twitter: '@TokkaLabs' },
  cFPJNbXH9KNP1CRejnf19ARopcS8w8c4teTz5GF3G36MZRWJG: { name: 'curiouspleb', twitter: null },
  cFNBZ5iYqorZcAEjpUSHgt6Ghy4Hmf9sNK6rRYemEa93Xnark: { name: 'curiouspleb', twitter: null },
  cFNgY2xnF9jvLLJ9TTtFwVTUCoo9aAX26UveiN7NftzkhEyYW: { name: 'curiouspleb', twitter: null },
  cFLZS9GDX4CeXWdjqm2sXmVUNqW1H71BK5nfUXHo6qtKDqNHu: { name: 'Gonzo', twitter: null },
} as const;

// https://github.com/chainflip-io/chainflip-backend/tree/ba71514e404efe2fe0fda5925238afb642a99a9e/state-chain/node/src/chain_spec
export const GENESIS_LP_ACCOUNT_IDS = [
  // perseverance
  'cFN2sr3eDPoyp3G4CAg3EBRMo2VMoYJ7x3rBn51tmXsguYzMX',
  // sisyphos
  'cFNDZDhGLS4ZKE2VjuWbqwgBKGznATxXbpdabrLiiR75hJi71',
  // backspin
  'cFPdef3hF5zEwbWUG6ZaCJ3X7mTvEeAog7HxZ8QyFcCgDVGDM',
  'cFMzM1G4He5k3Aa58X6d8yo8hRxiMVd92qrXMu1zKBXCqqTxi',
  'cFL8fmgKZcchhtLagBH2GKfsuWxBqUaD5CYE1m7DFb8DBSLJ1',
  'cFJt3kyUdXvaoarfxJDLrFmHFqkXUgnVZ4zqqDLLTRjbJosmK',
];
