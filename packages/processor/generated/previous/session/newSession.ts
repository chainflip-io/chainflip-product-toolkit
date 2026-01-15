import { sessionNewSession as vParser } from '../../100/session/newSession';

export function sessionNewSession(): typeof vParser;
export function sessionNewSession() {
  return vParser;
}
