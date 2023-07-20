import { MoonIcon } from '../icons/MoonIcon';
import { SunIcon } from '../icons/SunIcon';
import { IconButton } from '../buttons/IconButton';
import { useThemePreference } from './useThemePreference';

export const ThemeToggleButton = () => {
  const [theme, setTheme] = useThemePreference();

  return (
    <IconButton
      size="l"
      kind="secondary"
      title="Toggle theme"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      icon={theme === 'light' ? <SunIcon /> : <MoonIcon />}
    />
  );
};
