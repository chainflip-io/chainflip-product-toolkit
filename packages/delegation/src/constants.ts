import { ChainflipNetwork } from '@chainflip/utils/chainflip';
import { HexString } from '@chainflip/utils/types';

export const SC_UTILS_ADDRESSES: Record<ChainflipNetwork, HexString> = {
  mainnet: '0x',
  perseverance: '0xC191c202fdc308F54fF815fb3309eCd052E75D73',
  sisyphos: '0x',
  backspin: '0xc5a5C42992dECbae36851359345FE25997F5C42d',
};

export const FLIP_ADDRESSES: Record<ChainflipNetwork, HexString> = {
  mainnet: '0x826180541412D574cf1336d22c0C0a287822678A',
  perseverance: '0xdC27c60956cB065D19F08bb69a707E37b36d8086',
  sisyphos: '0xcD079EAB6B5443b545788Fd210C8800FEADd87fa',
  backspin: '0x10C6E9530F1C1AF873a391030a1D9E8ed0630D26',
};
