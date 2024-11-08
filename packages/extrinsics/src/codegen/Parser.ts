import { type PalletMetadataV14, type SiLookupTypeId } from '@polkadot/types/interfaces';
import { type TypeDef } from '@polkadot/types/types';
import BaseParser, { type ResolvedType } from '@/chainspec/BaseParser';

export default class Parser extends BaseParser {
  protected getItems(pallet: PalletMetadataV14): { type: SiLookupTypeId } | null {
    return pallet.calls.isSome ? pallet.calls.unwrap() : null;
  }

  protected override shouldParsePallet(palletName: string): boolean {
    return palletName === 'Swapping';
  }

  protected override shouldParseItem(palletName: string, itemName: string): boolean {
    return itemName.includes('request_swap_deposit_address');
  }

  private depth = 0;

  protected override resolveType(type: TypeDef): ResolvedType {
    this.depth += 1;
    let result: ResolvedType;
    if (this.depth < 20) {
      result = super.resolveType(type);
    } else {
      result = { type: 'primitive', name: 'null' };
    }
    this.depth -= 1;
    return result;
  }
}
