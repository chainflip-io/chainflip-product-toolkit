import { type Idl } from '@coral-xyz/anchor';

export const mainnet = {
  address: 'J88B7gmadHzTNGiy54c9Ms8BsEXNdB2fntFyhKpk3qoT',
  metadata: {
    name: 'swap_endpoint',
    version: '0.1.0',
    spec: '0.1.0',
    description: 'Created with Anchor',
  },
  instructions: [
    {
      name: 'close_event_accounts',
      discriminator: [165, 102, 61, 1, 185, 77, 189, 121],
      accounts: [
        { name: 'data_account' },
        { name: 'agg_key', writable: true, signer: true },
        { name: 'swap_endpoint_data_account', writable: true },
      ],
      args: [],
    },
    {
      name: 'fetch_swap_endpoint_native_assets',
      discriminator: [133, 121, 179, 232, 138, 188, 83, 67],
      accounts: [
        { name: 'data_account' },
        {
          name: 'native_vault',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  115, 119, 97, 112, 95, 101, 110, 100, 112, 111, 105, 110, 116, 95, 110, 97, 116,
                  105, 118, 101, 95, 118, 97, 117, 108, 116,
                ],
              },
            ],
          },
        },
        { name: 'agg_key', writable: true, signer: true },
        { name: 'system_program', address: '11111111111111111111111111111111' },
      ],
      args: [{ name: 'bump', type: 'u8' }],
    },
    {
      name: 'initialize',
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237],
      accounts: [
        {
          name: 'swap_endpoint_data_account',
          writable: true,
          pda: { seeds: [{ kind: 'const', value: [100, 97, 116, 97] }] },
        },
        { name: 'signer', writable: true, signer: true },
        { name: 'system_program', address: '11111111111111111111111111111111' },
      ],
      args: [],
    },
    {
      name: 'x_swap_native',
      discriminator: [163, 38, 92, 226, 243, 105, 141, 196],
      accounts: [
        { name: 'data_account' },
        {
          name: 'native_vault',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  115, 119, 97, 112, 95, 101, 110, 100, 112, 111, 105, 110, 116, 95, 110, 97, 116,
                  105, 118, 101, 95, 118, 97, 117, 108, 116,
                ],
              },
            ],
          },
        },
        { name: 'from', writable: true, signer: true },
        { name: 'event_data_account', writable: true, signer: true },
        { name: 'swap_endpoint_data_account', writable: true },
        { name: 'system_program', address: '11111111111111111111111111111111' },
      ],
      args: [{ name: 'swap_native_params', type: { defined: { name: 'SwapNativeParams' } } }],
    },
    {
      name: 'x_swap_token',
      discriminator: [69, 50, 252, 99, 229, 83, 119, 235],
      accounts: [
        { name: 'data_account' },
        {
          name: 'token_vault_associated_token_account',
          writable: true,
          pda: {
            seeds: [
              { kind: 'account', path: 'data_account.token_vault_pda', account: 'DataAccount' },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28,
                  180, 133, 237, 95, 91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                ],
              },
              { kind: 'account', path: 'mint' },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19,
                153, 218, 255, 16, 132, 4, 142, 123, 216, 219, 233, 248, 89,
              ],
            },
          },
        },
        { name: 'from', writable: true, signer: true },
        { name: 'from_token_account', writable: true },
        { name: 'event_data_account', writable: true, signer: true },
        { name: 'swap_endpoint_data_account', writable: true },
        { name: 'token_supported_account' },
        { name: 'token_program', address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' },
        { name: 'mint' },
        { name: 'system_program', address: '11111111111111111111111111111111' },
      ],
      args: [{ name: 'swap_token_params', type: { defined: { name: 'SwapTokenParams' } } }],
    },
  ],
  accounts: [
    { name: 'DataAccount', discriminator: [85, 240, 182, 158, 76, 7, 18, 233] },
    { name: 'SupportedToken', discriminator: [56, 162, 96, 99, 193, 245, 204, 108] },
    { name: 'SwapEndpointDataAccount', discriminator: [79, 152, 191, 225, 128, 108, 11, 139] },
    { name: 'SwapEvent', discriminator: [150, 251, 114, 94, 200, 113, 248, 70] },
  ],
  events: [
    { name: 'CantDeserializeEventAccount', discriminator: [248, 26, 198, 175, 8, 58, 229, 137] },
    { name: 'EventAccountNotTracked', discriminator: [202, 29, 253, 107, 20, 196, 36, 210] },
    { name: 'PayeeDoesntMatchSender', discriminator: [16, 123, 0, 234, 46, 151, 175, 168] },
  ],
  errors: [
    { code: 6000, name: 'MathOverflow', msg: 'Overflow in arithmetic operation' },
    { code: 6001, name: 'MathUnderflow', msg: 'Underflow in arithmetic operation' },
  ],
  types: [
    {
      name: 'CantDeserializeEventAccount',
      type: {
        kind: 'struct',
        fields: [
          { name: 'event_account', type: 'pubkey' },
          { name: 'payee', type: 'pubkey' },
        ],
      },
    },
    {
      name: 'CcmParams',
      type: {
        kind: 'struct',
        fields: [
          { name: 'message', type: 'bytes' },
          { name: 'gas_amount', type: 'u64' },
        ],
      },
    },
    {
      name: 'DataAccount',
      docs: [
        '* ****************************************************************************\n * *************************** IMPORTANT NOTE *********************************\n * ****************************************************************************\n * If the vault is upgraded and the DataAccount struct is modified we need to\n * check the compatibility and ensure there is a proper migration process, given\n * that the Vault bytecode is the only thing being upgraded, not the data account.\n *\n * The easiest approach on upgrade is keeping the DataAccount unchanged and use\n * a new account struct for any new data that is required.\n *\n *        DO NOT MODIFY THIS WITHOUT UNDERSTANDING THE CONSEQUENCES!\n * ****************************************************************************\n * ****************************************************************************',
      ],
      type: {
        kind: 'struct',
        fields: [
          { name: 'agg_key', type: 'pubkey' },
          { name: 'gov_key', type: 'pubkey' },
          { name: 'token_vault_pda', type: 'pubkey' },
          { name: 'token_vault_bump', type: 'u8' },
          { name: 'upgrade_signer_pda', type: 'pubkey' },
          { name: 'upgrade_signer_pda_bump', type: 'u8' },
          { name: 'suspended', type: 'bool' },
          { name: 'suspended_legacy_swaps', type: 'bool' },
          { name: 'suspended_event_swaps', type: 'bool' },
          { name: 'min_native_swap_amount', type: 'u64' },
          { name: 'max_dst_address_len', type: 'u16' },
          { name: 'max_ccm_message_len', type: 'u32' },
          { name: 'max_cf_parameters_len', type: 'u32' },
          { name: 'max_event_accounts', type: 'u32' },
        ],
      },
    },
    {
      name: 'EventAccountNotTracked',
      type: {
        kind: 'struct',
        fields: [
          { name: 'event_account', type: 'pubkey' },
          { name: 'payee', type: 'pubkey' },
        ],
      },
    },
    {
      name: 'PayeeDoesntMatchSender',
      type: {
        kind: 'struct',
        fields: [
          { name: 'payee', type: 'pubkey' },
          { name: 'sender', type: 'pubkey' },
        ],
      },
    },
    {
      name: 'SupportedToken',
      type: {
        kind: 'struct',
        fields: [
          { name: 'token_mint_pubkey', type: 'pubkey' },
          { name: 'min_swap_amount', type: 'u64' },
        ],
      },
    },
    {
      name: 'SwapEndpointDataAccount',
      type: {
        kind: 'struct',
        fields: [
          { name: 'historical_number_event_accounts', type: 'u128' },
          { name: 'open_event_accounts', type: { vec: 'pubkey' } },
        ],
      },
    },
    {
      name: 'SwapEvent',
      type: {
        kind: 'struct',
        fields: [
          { name: 'creation_slot', type: 'u64' },
          { name: 'sender', type: 'pubkey' },
          { name: 'dst_chain', type: 'u32' },
          { name: 'dst_address', type: 'bytes' },
          { name: 'dst_token', type: 'u32' },
          { name: 'amount', type: 'u64' },
          { name: 'src_token', type: { option: 'pubkey' } },
          { name: 'ccm_parameters', type: { option: { defined: { name: 'CcmParams' } } } },
          { name: 'cf_parameters', type: 'bytes' },
        ],
      },
    },
    {
      name: 'SwapNativeParams',
      type: {
        kind: 'struct',
        fields: [
          { name: 'amount', type: 'u64' },
          { name: 'dst_chain', type: 'u32' },
          { name: 'dst_address', type: 'bytes' },
          { name: 'dst_token', type: 'u32' },
          { name: 'ccm_parameters', type: { option: { defined: { name: 'CcmParams' } } } },
          { name: 'cf_parameters', type: 'bytes' },
        ],
      },
    },
    {
      name: 'SwapTokenParams',
      type: {
        kind: 'struct',
        fields: [
          { name: 'amount', type: 'u64' },
          { name: 'dst_chain', type: 'u32' },
          { name: 'dst_address', type: 'bytes' },
          { name: 'dst_token', type: 'u32' },
          { name: 'ccm_parameters', type: { option: { defined: { name: 'CcmParams' } } } },
          { name: 'cf_parameters', type: 'bytes' },
          { name: 'decimals', type: 'u8' },
        ],
      },
    },
  ],
} as const satisfies Idl;

export const devnet = {
  address: 'DeL6iGV5RWrWh7cPoEa7tRHM8XURAaB4vPjfX5qVyuWE',
  metadata: {
    name: 'swap_endpoint',
    version: '0.1.0',
    spec: '0.1.0',
    description: 'Created with Anchor',
  },
  instructions: [
    {
      name: 'close_event_accounts',
      discriminator: [165, 102, 61, 1, 185, 77, 189, 121],
      accounts: [
        {
          name: 'data_account',
        },
        { name: 'agg_key', writable: true, signer: true },
        {
          name: 'swap_endpoint_data_account',
          writable: true,
        },
      ],
      args: [],
    },
    {
      name: 'fetch_swap_endpoint_native_assets',
      discriminator: [133, 121, 179, 232, 138, 188, 83, 67],
      accounts: [
        { name: 'data_account' },
        {
          name: 'native_vault',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  115, 119, 97, 112, 95, 101, 110, 100, 112, 111, 105, 110, 116, 95, 110, 97, 116,
                  105, 118, 101, 95, 118, 97, 117, 108, 116,
                ],
              },
            ],
          },
        },
        { name: 'agg_key', writable: true, signer: true },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'bump',
          type: 'u8',
        },
      ],
    },
    {
      name: 'initialize',
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237],
      accounts: [
        {
          name: 'swap_endpoint_data_account',
          writable: true,
          pda: { seeds: [{ kind: 'const', value: [100, 97, 116, 97] }] },
        },
        {
          name: 'signer',
          writable: true,
          signer: true,
        },
        { name: 'system_program', address: '11111111111111111111111111111111' },
      ],
      args: [],
    },
    {
      name: 'x_swap_native',
      discriminator: [163, 38, 92, 226, 243, 105, 141, 196],
      accounts: [
        {
          name: 'data_account',
        },
        {
          name: 'native_vault',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  115, 119, 97, 112, 95, 101, 110, 100, 112, 111, 105, 110, 116, 95, 110, 97, 116,
                  105, 118, 101, 95, 118, 97, 117, 108, 116,
                ],
              },
            ],
          },
        },
        {
          name: 'from',
          writable: true,
          signer: true,
        },
        { name: 'event_data_account', writable: true, signer: true },
        {
          name: 'swap_endpoint_data_account',
          writable: true,
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'swap_native_params',
          type: {
            defined: { name: 'SwapNativeParams' },
          },
        },
      ],
    },
    {
      name: 'x_swap_token',
      discriminator: [69, 50, 252, 99, 229, 83, 119, 235],
      accounts: [
        {
          name: 'data_account',
        },
        {
          name: 'token_vault_associated_token_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'data_account.token_vault_pda',
                account: 'DataAccount',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28,
                  180, 133, 237, 95, 91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'mint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19,
                153, 218, 255, 16, 132, 4, 142, 123, 216, 219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'from',
          writable: true,
          signer: true,
        },
        { name: 'from_token_account', writable: true },
        { name: 'event_data_account', writable: true, signer: true },
        {
          name: 'swap_endpoint_data_account',
          writable: true,
        },
        {
          name: 'token_supported_account',
        },
        { name: 'token_program', address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' },
        { name: 'mint' },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'swap_token_params',
          type: {
            defined: { name: 'SwapTokenParams' },
          },
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'DataAccount',
      discriminator: [85, 240, 182, 158, 76, 7, 18, 233],
    },
    {
      name: 'SupportedToken',
      discriminator: [56, 162, 96, 99, 193, 245, 204, 108],
    },
    {
      name: 'SwapEndpointDataAccount',
      discriminator: [79, 152, 191, 225, 128, 108, 11, 139],
    },
    {
      name: 'SwapEvent',
      discriminator: [150, 251, 114, 94, 200, 113, 248, 70],
    },
  ],
  events: [
    {
      name: 'CantDeserializeEventAccount',
      discriminator: [248, 26, 198, 175, 8, 58, 229, 137],
    },
    {
      name: 'EventAccountNotTracked',
      discriminator: [202, 29, 253, 107, 20, 196, 36, 210],
    },
    {
      name: 'PayeeDoesntMatchSender',
      discriminator: [16, 123, 0, 234, 46, 151, 175, 168],
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'MathOverflow',
      msg: 'Overflow in arithmetic operation',
    },
    { code: 6001, name: 'MathUnderflow', msg: 'Underflow in arithmetic operation' },
  ],
  types: [
    {
      name: 'CantDeserializeEventAccount',
      type: {
        kind: 'struct',
        fields: [
          { name: 'event_account', type: 'pubkey' },
          { name: 'payee', type: 'pubkey' },
        ],
      },
    },
    {
      name: 'CcmParams',
      type: {
        kind: 'struct',
        fields: [
          { name: 'message', type: 'bytes' },
          { name: 'gas_amount', type: 'u64' },
        ],
      },
    },
    {
      name: 'DataAccount',
      docs: [
        '* ****************************************************************************\n * *************************** IMPORTANT NOTE *********************************\n * ****************************************************************************\n * If the vault is upgraded and the DataAccount struct is modified we need to\n * check the compatibility and ensure there is a proper migration process, given\n * that the Vault bytecode is the only thing being upgraded, not the data account.\n *\n * The easiest approach on upgrade is keeping the DataAccount unchanged and use\n * a new account struct for any new data that is required.\n *\n *        DO NOT MODIFY THIS WITHOUT UNDERSTANDING THE CONSEQUENCES!\n * ****************************************************************************\n * ****************************************************************************',
      ],
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'agg_key',
            type: 'pubkey',
          },
          {
            name: 'gov_key',
            type: 'pubkey',
          },
          {
            name: 'token_vault_pda',
            type: 'pubkey',
          },
          {
            name: 'token_vault_bump',
            type: 'u8',
          },
          {
            name: 'upgrade_signer_pda',
            type: 'pubkey',
          },
          {
            name: 'upgrade_signer_pda_bump',
            type: 'u8',
          },
          {
            name: 'suspended',
            type: 'bool',
          },
          {
            name: 'suspended_legacy_swaps',
            type: 'bool',
          },
          {
            name: 'suspended_event_swaps',
            type: 'bool',
          },
          {
            name: 'min_native_swap_amount',
            type: 'u64',
          },
          {
            name: 'max_dst_address_len',
            type: 'u16',
          },
          {
            name: 'max_ccm_message_len',
            type: 'u32',
          },
          {
            name: 'max_cf_parameters_len',
            type: 'u32',
          },
          {
            name: 'max_event_accounts',
            type: 'u32',
          },
        ],
      },
    },
    {
      name: 'EventAccountNotTracked',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'event_account',
            type: 'pubkey',
          },
          {
            name: 'payee',
            type: 'pubkey',
          },
        ],
      },
    },
    {
      name: 'PayeeDoesntMatchSender',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'payee',
            type: 'pubkey',
          },
          {
            name: 'sender',
            type: 'pubkey',
          },
        ],
      },
    },
    {
      name: 'SupportedToken',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'token_mint_pubkey',
            type: 'pubkey',
          },
          {
            name: 'min_swap_amount',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'SwapEndpointDataAccount',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'historical_number_event_accounts',
            type: 'u128',
          },
          {
            name: 'open_event_accounts',
            type: {
              vec: 'pubkey',
            },
          },
        ],
      },
    },
    {
      name: 'SwapEvent',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'creation_slot',
            type: 'u64',
          },
          {
            name: 'sender',
            type: 'pubkey',
          },
          {
            name: 'dst_chain',
            type: 'u32',
          },
          {
            name: 'dst_address',
            type: 'bytes',
          },
          {
            name: 'dst_token',
            type: 'u32',
          },
          {
            name: 'amount',
            type: 'u64',
          },
          {
            name: 'src_token',
            type: {
              option: 'pubkey',
            },
          },
          {
            name: 'ccm_parameters',
            type: {
              option: {
                defined: {
                  name: 'CcmParams',
                },
              },
            },
          },
          {
            name: 'cf_parameters',
            type: 'bytes',
          },
        ],
      },
    },
    {
      name: 'SwapNativeParams',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'amount',
            type: 'u64',
          },
          {
            name: 'dst_chain',
            type: 'u32',
          },
          {
            name: 'dst_address',
            type: 'bytes',
          },
          {
            name: 'dst_token',
            type: 'u32',
          },
          {
            name: 'ccm_parameters',
            type: {
              option: {
                defined: {
                  name: 'CcmParams',
                },
              },
            },
          },
          {
            name: 'cf_parameters',
            type: 'bytes',
          },
        ],
      },
    },
    {
      name: 'SwapTokenParams',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'amount',
            type: 'u64',
          },
          {
            name: 'dst_chain',
            type: 'u32',
          },
          {
            name: 'dst_address',
            type: 'bytes',
          },
          {
            name: 'dst_token',
            type: 'u32',
          },
          {
            name: 'ccm_parameters',
            type: {
              option: {
                defined: {
                  name: 'CcmParams',
                },
              },
            },
          },
          {
            name: 'cf_parameters',
            type: 'bytes',
          },
          {
            name: 'decimals',
            type: 'u8',
          },
        ],
      },
    },
  ],
} as const satisfies Idl;
