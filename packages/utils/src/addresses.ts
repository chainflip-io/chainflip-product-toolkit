import { ChainflipNetwork } from './chainflip';

export const FLIP_CONTRACT_ADDRESSES: Record<ChainflipNetwork, `0x${string}`> = {
  backspin: '0x10C6E9530F1C1AF873a391030a1D9E8ed0630D26',
  sisyphos: '0xcD079EAB6B5443b545788Fd210C8800FEADd87fa',
  perseverance: '0xdC27c60956cB065D19F08bb69a707E37b36d8086',
  mainnet: '0x826180541412D574cf1336d22c0C0a287822678A',
};

export const STATE_CHAIN_GATEWAY_ADDRESSES: Record<ChainflipNetwork, `0x${string}`> = {
  backspin: '0xeEBe00Ac0756308ac4AaBfD76c05c4F3088B8883',
  sisyphos: '0x1F7fE41C798cc7b1D34BdC8de2dDDA4a4bE744D9',
  perseverance: '0xA34a967197Ee90BB7fb28e928388a573c5CFd099',
  mainnet: '0x6995Ab7c4D7F4B03f467Cf4c8E920427d9621DBd',
};
