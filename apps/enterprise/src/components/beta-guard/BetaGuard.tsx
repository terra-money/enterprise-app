import { UIElementProps } from '@terra-money/apps/components';
import { useBetaWarningDialog } from './BetaWarningDialog';
import { useEffect } from 'react';
import { useLocalStorage } from 'react-use';

export const BetaGuard = (props: UIElementProps) => {
  const { children } = props;

  const [hasAccepted, setHasAccepted] = useLocalStorage('__enterprise_beta_accept', false);

  const openBetaWarningDialog = useBetaWarningDialog();

  useEffect(
    () => {
      if (hasAccepted === false) {
        openBetaWarningDialog().then(() => {
          setHasAccepted(true);
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setHasAccepted, hasAccepted]
  );

  return <>{children}</>;
};
