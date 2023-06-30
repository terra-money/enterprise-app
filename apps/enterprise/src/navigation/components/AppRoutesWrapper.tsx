import { Navigation } from 'components/Navigation';
import { InitizalizedWalletOnly } from 'components/conditional-wallet/InitializedWalletOnly';

export const AppRoutesWrapper = () => {
  return (
    <InitizalizedWalletOnly>
        <Navigation />
    </InitizalizedWalletOnly>
  );
};
