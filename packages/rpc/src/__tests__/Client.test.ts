import { describe, expect, it } from 'vitest';
import Client from '../Client';

describe('Client', () => {
  describe('Client.prototype.parseSingleResponse', () => {
    it('throws if the response is not successful', () => {
      expect(() =>
        Client.prototype['parseSingleResponse'].call(null, {
          success: false,
          error: new Error('test'),
          id: '1',
        }),
      ).toThrowError('test');
    });
  });
});
