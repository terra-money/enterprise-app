import { PersistentStorageKey, usePersistentStorageValue } from "state/persistentStorage"

export const useAreIndexersEnabled = () => {
  return usePersistentStorageValue<boolean>(PersistentStorageKey.AreIndexersEnabled, true)
}