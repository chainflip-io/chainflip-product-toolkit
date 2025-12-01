import { assert } from '@chainflip/utils/assertion';
import { GenerateHook } from '@/chainspec/Compiler';
import SpecVersion from '@/chainspec/SpecVersion';

const deepEqual = <T>(a: T, b: T): boolean => {
  if (a === b) return true;
  if (typeof a !== 'object' || typeof b !== 'object') return false;
  if (a === null || b === null) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  if (Array.isArray(a)) {
    assert(Array.isArray(b));
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEqual((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])) {
      return false;
    }
  }
  return true;
};

class FinalTwo {
  static from(other: FinalTwo | undefined, newVersion: SpecVersion) {
    const instance = new FinalTwo(newVersion);
    if (other) {
      // it's not impossible for an event to be reintroduced but it hasn't happened yet
      // assert(!other.deleted, 'unexpected new version after event was already deleted');
      instance.old = other.new;
    }
    return instance;
  }

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
}

const trackLatestVersions: GenerateHook<Map<string, Map<string, FinalTwo>>> = (acc, data) => {
  if (acc === undefined) {
    return new Map(
      Object.entries(data.new.metadata).map(([pallet, events]) => [
        pallet,
        new Map(
          Object.keys(events).map((event) => [
            event,
            FinalTwo.from(undefined, data.new.specVersion),
          ]),
        ),
      ]),
    );
  }

  const oldPallets = new Set(Object.keys(data.old.metadata));
  const newPallets = new Set(Object.keys(data.new.metadata));
  const deletedPallets = oldPallets.difference(newPallets);
  for (const pallet of deletedPallets) {
    acc.delete(pallet);
  }

  for (const pallet of newPallets) {
    const oldEvents = data.old.metadata[pallet] ?? {};
    const newEvents = data.new.metadata[pallet];
    const newEventNames = new Set(Object.keys(newEvents));
    const deletedEvents = new Set(Object.keys(oldEvents)).difference(newEventNames);
    for (const event of deletedEvents) {
      acc.get(pallet)?.get(event)?.markDeleted();
    }
    for (const eventName of newEventNames) {
      if (!deepEqual(oldEvents[eventName], newEvents[eventName])) {
        let events = acc.get(pallet);
        if (!events) {
          events = new Map();
          acc.set(pallet, events);
        }
        events.set(eventName, FinalTwo.from(events.get(eventName), data.new.specVersion));
      }
    }
  }

  return acc;
};

export default trackLatestVersions;
