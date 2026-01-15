import { GenerateHook } from '@/chainspec/Compiler';
import SpecVersion from '@/chainspec/SpecVersion';

export class FinalThree {
  static from(other: FinalThree | undefined, newVersion: SpecVersion) {
    const instance = new FinalThree(newVersion);
    if (other) {
      // it's not impossible for an event to be reintroduced but it hasn't happened yet
      // assert(!other.deleted, 'unexpected new version after event was already deleted');
      instance.old = other.new;
      instance.oldest = other.old;
    }
    return instance;
  }

  oldest: SpecVersion | null = null;
  old: SpecVersion | null = null;
  new: SpecVersion;
  private deleted = false;

  private constructor(newVersion: SpecVersion) {
    this.new = newVersion;
  }

  toString() {
    const newVersion = this.deleted ? 'DELETED' : this.new.toFormatted();
    if (this.old === null) return newVersion;
    return `${this.old.toFormatted()} => ${newVersion}`;
  }

  markDeleted() {
    this.deleted = true;
  }

  isDeleted(): boolean {
    return this.deleted;
  }
}

const trackLatestVersions: GenerateHook<{
  versions: SpecVersion[];
  events: Map<string, Map<string, FinalThree>>;
}> = (acc, { specVersion, changedOrAddedEvents }) => {
  const palletsMap = acc?.events ?? new Map<string, Map<string, FinalThree>>();
  const versions = acc?.versions ?? [];

  versions.push(specVersion);

  for (const palletAndEventName of changedOrAddedEvents) {
    const [pallet, event] = palletAndEventName.split('.');

    const events = palletsMap.get(pallet) ?? new Map<string, FinalThree>();
    palletsMap.set(pallet, events);
    events.set(event, FinalThree.from(events.get(event), specVersion));
  }

  return { versions, events: palletsMap };
};

export default trackLatestVersions;
