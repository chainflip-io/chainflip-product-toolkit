import { z } from 'zod';
import {
  numberOrHex,
  palletCfElectionsElectoralSystemsCompositeTuple6ImplsCompositeElectionIdentifierExtra,
} from '../common';
import { defineEvent } from '@chainflip/processor/event';

export const solanaElectionsUnknownElection = z.tuple([
  numberOrHex,
  palletCfElectionsElectoralSystemsCompositeTuple6ImplsCompositeElectionIdentifierExtra,
]);

export const solanaElectionsUnknownElectionEvent = defineEvent(
  'SolanaElections.UnknownElection',
  solanaElectionsUnknownElection,
);
