import { TransactionsProvider } from '@terra-money/apps/libs/transactions';
import { WalletProvider, useChainOptions } from '@terra-money/wallet-provider';
import { NetworkGuard } from 'components/network-guard';
import { SnackbarContainer } from 'components/snackbar';
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Navigate, Route, Routes } from 'react-router';
import { useTransactionSnackbars } from 'hooks';
import { DashboardPage } from 'pages/dashboard';
import {
  DAOPage,
  Overview as DAOOverviewPage,
  TreasuryPage as DAOTreasuryPage,
  ProposalsPage as DAOProposalsPage,
  Staking as DAOStakingPage,
  Members as DAOMembersPage,
} from 'pages/dao';
import { Page as DAOsPage } from 'pages/daos';
import { CreateDAOPage } from 'pages/create-dao';
import { Page as CreateProposalPage } from 'pages/create-proposal';
import { Page as ProposalPage } from 'pages/proposal';
import { PersonalizationProvider } from 'libs/personalization';
import { CreateTextProposalPage } from 'pages/create-proposal/text/CreateTextProposalPage';
import { CreateConfigProposalPage } from 'pages/create-proposal/config/CreateConfigProposalPage';
import { BetaGuard } from 'components/beta-guard';
import { LandingPage } from 'pages/landing';
import { Path } from 'navigation';
import { ConditionalWallet } from 'components/conditional-wallet';
import { CreateUpgradeProposalPage } from 'pages/create-proposal/upgrade/CreateUpgradeProposalPage';
import { UpdateWhitelistedAssetsProposalPage } from 'pages/create-proposal/whitelisted-assets/UpdateWhitelistedAssetsProposalPage';
import { ExecuteMessageProposalPage } from 'pages/create-proposal/execute/ExecuteMessageProposalPage';
import { MultisigMembersProposalPage } from 'pages/create-proposal/multisig-members/MultisigMembersProposalPage';
import styles from './App.module.sass';
import { UpdateWhitelistedNFTsProposalPage } from 'pages/create-proposal/whitelisted-nfts/UpdateWhitelistedNFTsProposalPage';
import { darkTheme } from 'lib/ui/theme/darkTheme';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'lib/ui/GlobalStyle';
import { ConnectWalletPrompt } from 'components/not-connected';
import { TransactionErrorProvider } from 'chain/components/TransactionErrorProvider';
import { SpendTreasuryProposalPage } from 'pages/create-proposal/spend/SpendTreasuryProposalPage';

const queryClient = new QueryClient();

const AppRoutes = () => {
  return (
    <Routes>
      <Route index={true} element={<LandingPage />} />
      <Route path="*" element={<AppBetaRoutes />} />
    </Routes>
  );
};

const AppBetaRoutes = () => {
  useTransactionSnackbars();

  return (
    <BetaGuard>
      <Routes>
        <Route path={Path.Dashboard} element={<DashboardPage />} />
        <Route path={Path.Daos} element={<DAOsPage />} />
        <Route path="/dao/:address" element={<DAOPage />}>
          <Route index={true} element={<DAOOverviewPage />} />
          <Route path="treasury" element={<DAOTreasuryPage />} />
          <Route path="proposals" element={<DAOProposalsPage />} />
          <Route path="staking" element={<DAOStakingPage />} />
          <Route path="members" element={<DAOMembersPage />} />
        </Route>
        <Route path="/dao/:address/proposals/create" element={<CreateProposalPage />} />
        <Route
          path="/dao/:address/proposals/create/text"
          element={
            <ConditionalWallet
              notConnected={() => <ConnectWalletPrompt />}
              connected={() => <CreateTextProposalPage />}
            />
          }
        />
        <Route
          path="/dao/:address/proposals/create/config"
          element={
            <ConditionalWallet
              notConnected={() => <ConnectWalletPrompt />}
              connected={() => <CreateConfigProposalPage />}
            />
          }
        />
        <Route
          path="/dao/:address/proposals/create/upgrade"
          element={
            <ConditionalWallet
              notConnected={() => <ConnectWalletPrompt />}
              connected={() => <CreateUpgradeProposalPage />}
            />
          }
        />
        <Route
          path="/dao/:address/proposals/create/assets"
          element={
            <ConditionalWallet
              notConnected={() => <ConnectWalletPrompt />}
              connected={() => <UpdateWhitelistedAssetsProposalPage />}
            />
          }
        />
        <Route
          path="/dao/:address/proposals/create/nfts"
          element={
            <ConditionalWallet
              notConnected={() => <ConnectWalletPrompt />}
              connected={() => <UpdateWhitelistedNFTsProposalPage />}
            />
          }
        />
        <Route
          path="/dao/:address/proposals/create/execute"
          element={
            <ConditionalWallet
              notConnected={() => <ConnectWalletPrompt />}
              connected={() => <ExecuteMessageProposalPage />}
            />
          }
        />
        <Route
          path="/dao/:address/proposals/create/members"
          element={
            <ConditionalWallet
              notConnected={() => <ConnectWalletPrompt />}
              connected={() => <MultisigMembersProposalPage />}
            />
          }
        />
        <Route
          path="/dao/:address/proposals/create/spend"
          element={
            <ConditionalWallet
              notConnected={() => <ConnectWalletPrompt />}
              connected={() => <SpendTreasuryProposalPage />}
            />
          }
        />
        <Route path="/dao/create" element={<CreateDAOPage />} />
        <Route path="/dao/:address/proposals/:id" element={<ProposalPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BetaGuard>
  );
};

const AppProviders = () => {
  const chainOptions = useChainOptions();

  // TODO: check later if chainOptions would cause a flicker due to being null for first couple of calls
  return (
    chainOptions && (
      <WalletProvider
        {...chainOptions}
        connectorOpts={{ bridge: 'https://walletconnect.terra.dev/' }}
        defaultNetwork={chainOptions?.walletConnectChainIds[1]}
      >
        <ThemeProvider theme={darkTheme}>
          <GlobalStyle />
          <main className={styles.root}>
            <NetworkGuard>
              <QueryClientProvider client={queryClient}>
                <TransactionsProvider>
                  <TransactionErrorProvider>
                    <SnackbarProvider
                      autoHideDuration={null}
                      content={(key, message) => <SnackbarContainer id={key} message={message} />}
                    >
                      <PersonalizationProvider>
                        <AppRoutes />
                      </PersonalizationProvider>
                    </SnackbarProvider>
                  </TransactionErrorProvider>
                </TransactionsProvider>
              </QueryClientProvider>
            </NetworkGuard>
          </main>
        </ThemeProvider>
      </WalletProvider>
    )
  );
};

const App = () => {
  return <AppProviders />;
};

export default App;
