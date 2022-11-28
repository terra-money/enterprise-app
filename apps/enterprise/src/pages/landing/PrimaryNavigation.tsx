import { useDisplay } from 'hooks';
import { DesktopNavigation } from './DesktopNavigation';
import { MobileNavigation } from './MobileNavigation';

interface PrimaryNavigationProps {
  className: string;
}

export const PrimaryNavigation = (props: PrimaryNavigationProps) => {
  const { className } = props;

  const { isMobile } = useDisplay();

  return isMobile ? <MobileNavigation className={className} /> : <DesktopNavigation className={className} />;
};
