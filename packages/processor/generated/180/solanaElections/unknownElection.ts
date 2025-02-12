import { z } from 'zod';
import {
  numberOrHex,
  palletCfElectionsElectoralSystemsCompositeTuple6ImplsCompositeElectionIdentifierExtra,
} from '../common';

export const solanaElectionsUnknownElection = z.tuple([
  numberOrHex,
  palletCfElectionsElectoralSystemsCompositeTuple6ImplsCompositeElectionIdentifierExtra,
]);
