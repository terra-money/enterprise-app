import { useIsScreenWidthLessThan } from './useIsScreenWidthLessThan';

const smallScreenWidth = 600;

export const useIsSmallScreen = () => {
  return useIsScreenWidthLessThan(smallScreenWidth);
};
