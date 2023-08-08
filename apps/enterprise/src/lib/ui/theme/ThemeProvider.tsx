import { useMemo } from 'react';
import { useMedia } from 'react-use';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';

import { lightTheme } from './lightTheme';
import { ComponentWithChildrenProps } from 'lib/shared/props';
import { darkTheme } from './darkTheme';
import { useThemePreference } from './useThemePreference';

export const ThemeProvider = ({ children }: ComponentWithChildrenProps) => {
  const [themePreference] = useThemePreference();

  const isSystemThemeDark = useMedia('(prefers-color-scheme: dark)');

  const theme = useMemo(() => {
    if (themePreference === 'system') {
      return isSystemThemeDark ? darkTheme : lightTheme;
    }

    return themePreference === 'dark' ? darkTheme : lightTheme;
  }, [isSystemThemeDark, themePreference]);

  return (
    <StyledComponentsThemeProvider theme={theme}>
      <>{children}</>
    </StyledComponentsThemeProvider>
  );
};
