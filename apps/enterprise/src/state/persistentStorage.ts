import { MockStorage } from 'lib/state/MockStorage';
import { LocalStorage } from 'lib/state/LocalStorage';
import { createUsePersistantStorageValueHook } from 'lib/state/createUsePersistantStorageValueHook';

export enum PersistentStorageKey {
  BetaAccept = '__enterprise_beta_accept',
  AreIndexersEnabled = '__enterprise_are_indexers_enabled',
}

export const persistentStorage =
  typeof window !== 'undefined' ? new LocalStorage<PersistentStorageKey>() : new MockStorage<PersistentStorageKey>();

export const usePersistentStorageValue = createUsePersistantStorageValueHook<PersistentStorageKey>(persistentStorage);
