import { type PalletMetadataV14, type SiLookupTypeId } from '@polkadot/types/interfaces';
import { type TypeDef } from '@polkadot/types/types';
import assert from 'assert';
import BaseParser, { type ResolvedType } from '@/chainspec/BaseParser';

const pallets = new Map([
  ['Swapping', ['request_swap_deposit_address']],
  ['Funding', null],
]);

export default class Parser extends BaseParser {
  protected getItems(pallet: PalletMetadataV14): { type: SiLookupTypeId } | null {
    return pallet.calls.isSome ? pallet.calls.unwrap() : null;
  }

  protected override shouldParsePallet(palletName: string): boolean {
    return pallets.has(palletName);
  }

  protected override shouldParseItem(palletName: string, itemName: string): boolean {
    const extrinsics = pallets.get(palletName);
    assert(extrinsics !== undefined, `Pallet ${palletName} not found in registry`);
    return extrinsics === null || extrinsics.includes(itemName);
  }

  private depth = 0;

  protected override resolveType(type: TypeDef): ResolvedType {
    this.depth += 1;
    let result: ResolvedType;
    if (this.depth < 20) {
      result = super.resolveType(type);
    } else {
      result = { type: 'primitive', value: 'null' };
    }
    this.depth -= 1;
    return result;
  }
}
