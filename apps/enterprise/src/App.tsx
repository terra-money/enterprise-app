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
import { SelectProposalTypePage } from 'pages/create-proposal/SelectProposalTypePage';
import { Page as ProposalPage } from 'pages/proposal';
import { PersonalizationProvider } from 'libs/personalization';
import { BetaGuard } from 'components/beta-guard';
import { LandingPage } from 'pages/landing';
import { Path } from 'navigation';
import styles from './App.module.sass';
import { darkTheme } from 'lib/ui/theme/darkTheme';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'lib/ui/GlobalStyle';
import { TransactionErrorProvider } from 'chain/components/TransactionErrorProvider';
import { CreateProposalPage } from 'pages/create-proposal/CreateProposalPage';
import { ConditionalWallet } from 'components/conditional-wallet';
import { InitizalizedWalletOnly } from 'components/conditional-wallet/InitializedWalletOnly';
import { DistributePage } from 'pages/dao/distribute/DistributePage';
import { DaoErrorBoundary } from 'pages/dao/DaoErrorBoundary';
import { SettingsPage } from 'settings/components/SettingsPage';

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
        <Route path={Path.Settings} element={<SettingsPage />} />
        <Route
          path="/dao/:address"
          element={
            <InitizalizedWalletOnly>
              <DaoErrorBoundary>
                <DAOPage />
              </DaoErrorBoundary>
            </InitizalizedWalletOnly>
          }
        >
          <Route
            index={true}
            element={
              <InitizalizedWalletOnly>
                <DaoErrorBoundary>
                  <DAOOverviewPage />
                </DaoErrorBoundary>
              </InitizalizedWalletOnly>
            }
          />
          <Route
            path="treasury"
            element={
              <InitizalizedWalletOnly>
                <DaoErrorBoundary>
                  <DAOTreasuryPage />
                </DaoErrorBoundary>
              </InitizalizedWalletOnly>
            }
          />
          <Route
            path="proposals"
            element={
              <InitizalizedWalletOnly>
                <DaoErrorBoundary>
                  <DAOProposalsPage />
                </DaoErrorBoundary>
              </InitizalizedWalletOnly>
            }
          />
          <Route
            path="distribute"
            element={
              <InitizalizedWalletOnly>
                <DaoErrorBoundary>
                  <DistributePage />
                </DaoErrorBoundary>
              </InitizalizedWalletOnly>
            }
          />
          <Route
            path="staking"
            element={
              <InitizalizedWalletOnly>
                <DaoErrorBoundary>
                  <DAOStakingPage />
                </DaoErrorBoundary>
              </InitizalizedWalletOnly>
            }
          />
          <Route
            path="members"
            element={
              <InitizalizedWalletOnly>
                <DaoErrorBoundary>
                  <DAOMembersPage />
                </DaoErrorBoundary>
              </InitizalizedWalletOnly>
            }
          />
        </Route>
        <Route
          path="/dao/:address/proposals/create"
          element={
            <InitizalizedWalletOnly>
              <DaoErrorBoundary>
                <ConditionalWallet connected={() => <SelectProposalTypePage />} />
              </DaoErrorBoundary>
            </InitizalizedWalletOnly>
          }
        />
        <Route
          path="/dao/:address/proposals/create/:type"
          element={
            <InitizalizedWalletOnly>
              <DaoErrorBoundary>
                <CreateProposalPage />
              </DaoErrorBoundary>
            </InitizalizedWalletOnly>
          }
        />
        <Route
          path="/dao/create"
          element={
            <InitizalizedWalletOnly>
              <DaoErrorBoundary>
                <CreateDAOPage />
              </DaoErrorBoundary>
            </InitizalizedWalletOnly>
          }
        />
        <Route
          path="/dao/:address/proposals/:id"
          element={
            <InitizalizedWalletOnly>
              <DaoErrorBoundary>
                <ProposalPage />
              </DaoErrorBoundary>
            </InitizalizedWalletOnly>
          }
        />
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
            <QueryClientProvider client={queryClient}>
              <NetworkGuard>
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
              </NetworkGuard>
            </QueryClientProvider>
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
