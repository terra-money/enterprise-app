import { useMediaQuery } from 'usehooks-ts';

export const useDisplay = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return {
    isMobile,
    isDesktop: !isMobile,
  };
};
