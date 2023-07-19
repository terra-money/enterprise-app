import { WalletProvider, getInitialConfig } from '@terra-money/wallet-kit';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

getInitialConfig().then((defaultNetworks) =>
  ReactDOM.render(
    <WalletProvider defaultNetworks={defaultNetworks}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WalletProvider>,
    document.getElementById('root')
  )
);
