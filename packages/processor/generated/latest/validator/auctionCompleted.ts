import { validatorAuctionCompleted as vParser } from '../../100/validator/auctionCompleted';

export function validatorAuctionCompleted(): typeof vParser;
export function validatorAuctionCompleted() {
  return vParser;
}
