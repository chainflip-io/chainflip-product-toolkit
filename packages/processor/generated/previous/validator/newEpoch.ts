import { validatorNewEpoch as vParser } from '../../100/validator/newEpoch';

export function validatorNewEpoch(): typeof vParser;
export function validatorNewEpoch() {
  return vParser;
}
