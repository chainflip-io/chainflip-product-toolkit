import { describe, it, expect } from 'vitest';
import { parseUrlWithBasicAuth } from '../url';

describe(parseUrlWithBasicAuth, () => {
  it('parses urls without basic auth info', () => {
    expect(parseUrlWithBasicAuth('https://url.org')).toMatchInlineSnapshot(`
      {
        "headers": {},
        "url": "https://url.org/",
      }
    `);
  });

  it('extracts user info into an auth header', () => {
    expect(parseUrlWithBasicAuth('https://yaboi@url.org')).toMatchInlineSnapshot(`
      {
        "headers": {
          "Authorization": "Basic eWFib2k6",
        },
        "url": "https://url.org/",
      }
    `);
  });

  it('extracts password info into an auth header', () => {
    expect(parseUrlWithBasicAuth('https://:p455w0rd@url.org')).toMatchInlineSnapshot(`
      {
        "headers": {
          "Authorization": "Basic OnA0NTV3MHJk",
        },
        "url": "https://url.org/",
      }
    `);
  });

  it('extracts user and password into an auth header', () => {
    expect(parseUrlWithBasicAuth('https://yaboi:p455w0rd@url.org')).toMatchInlineSnapshot(`
      {
        "headers": {
          "Authorization": "Basic eWFib2k6cDQ1NXcwcmQ=",
        },
        "url": "https://url.org/",
      }
    `);
  });
});
