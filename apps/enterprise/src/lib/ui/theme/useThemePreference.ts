import { PersistentStorageKey, usePersistentStorageValue } from 'state/persistentStorage';
import { ThemePreference } from './ThemePreference';

export const useThemePreference = () => {
  return usePersistentStorageValue<ThemePreference>(PersistentStorageKey.ThemePreference, 'dark');
};
