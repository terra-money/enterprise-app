import { WalletProvider, getInitialConfig } from '@terra-money/wallet-kit';
import TerraStationMobileWallet from '@terra-money/terra-station-mobile';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

getInitialConfig().then((defaultNetworks) =>
  ReactDOM.render(
    <WalletProvider
      extraWallets={[new TerraStationMobileWallet()]}
     defaultNetworks={defaultNetworks}
     >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WalletProvider>,
    document.getElementById('root')
  )
);
