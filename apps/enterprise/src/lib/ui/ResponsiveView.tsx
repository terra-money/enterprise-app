import { ReactNode } from 'react';

import { useIsSmallScreen } from './hooks/useIsSmallScreen';

interface ResponsiveViewProps {
  small: () => ReactNode;
  normal: () => ReactNode;
}

export const ResponsiveView = ({ small, normal }: ResponsiveViewProps) => {
  const isSmallScreen = useIsSmallScreen();

  return <>{(isSmallScreen ? small : normal)()}</>;
};
