import { TransactionsProvider } from '@terra-money/apps/libs/transactions';
import { WalletProvider, useChainOptions } from '@terra-money/wallet-provider';
import { NetworkGuard } from 'components/network-guard';
import { SnackbarContainer } from 'components/snackbar';
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Navigate, Route, Routes } from 'react-router';
import { DashboardPage } from 'pages/dashboard';
import {
  DAOPage,
  Overview as DAOOverviewPage,
  TreasuryPage as DAOTreasuryPage,
  Staking as DAOStakingPage,
} from 'pages/dao';
import { Page as DAOsPage } from 'pages/daos';
import { CreateDAOPage } from 'pages/create-dao';
import { SelectProposalTypePage } from 'pages/create-proposal/SelectProposalTypePage';
import { LandingPage } from 'pages/landing';
import { Path } from 'navigation';
import styles from './App.module.sass';
import { darkTheme } from 'lib/ui/theme/darkTheme';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'lib/ui/GlobalStyle';
import { TransactionErrorProvider } from 'chain/components/TransactionErrorProvider';
import { CreateProposalPage } from 'pages/create-proposal/CreateProposalPage';
import { ConditionalWallet } from 'components/conditional-wallet';
import { DistributePage } from 'pages/dao/distribute/DistributePage';
import { PersonalizationProvider } from 'libs/personalization/PersonalizationProvider';
import { setupErrorMonitoring } from 'errors/errorMonitoring';
import { ProposalsPage } from 'pages/dao/proposals';
import { DaoMembersPage } from 'pages/dao/members';
import { ProposalPage } from 'pages/proposal';
import { AppRoutesWrapper } from 'navigation/components/AppRoutesWrapper';

const queryClient = new QueryClient();

const AppProviders = () => {
  const chainOptions = useChainOptions();

  return (
    chainOptions && (
      <WalletProvider {...chainOptions} connectorOpts={{ bridge: 'https://walletconnect.terra.dev/' }}>
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
                        <Routes>
                          <Route index={true} element={<LandingPage />} />
                          <Route path="/" element={<AppRoutesWrapper />}>
                            <Route path={Path.Dashboard} element={<DashboardPage />} />
                            <Route path={Path.Daos} element={<DAOsPage />} />
                            <Route
                              path="/dao/:address"
                              element={
                                <DAOPage />
                              }
                            >
                              <Route
                                index={true}
                                element={
                                  <DAOOverviewPage />
                                }
                              />
                              <Route
                                path="treasury"
                                element={
                                  <DAOTreasuryPage />
                                }
                              />
                              <Route
                                path="proposals"
                                element={
                                  <ProposalsPage />
                                }
                              />
                              <Route
                                path="rewards"
                                element={
                                  <DistributePage />
                                }
                              />
                              <Route
                                path="staking"
                                element={
                                  <DAOStakingPage />
                                }
                              />
                              <Route
                                path="members"
                                element={
                                  <DaoMembersPage />
                                }
                              />
                            </Route>
                            <Route
                              path="/dao/:address/proposals/create"
                              element={
                                <ConditionalWallet connected={() => <SelectProposalTypePage />} />
                              }
                            />
                            <Route
                              path="/dao/:address/proposals/create/:type"
                              element={
                                <CreateProposalPage />
                              }
                            />
                            <Route
                              path="/dao/:address/proposals/:id"
                              element={
                                <ProposalPage />
                              }
                            />
                            <Route
                              path="/dao/create"
                              element={
                                <CreateDAOPage />
                              }
                            />
                            <Route path="*" element={<Navigate to="/" replace />} />
                          </Route>
                        </Routes>
                      </PersonalizationProvider>
                    </SnackbarProvider>
                  </TransactionErrorProvider>
                </TransactionsProvider>
              </NetworkGuard>
            </QueryClientProvider>
          </main>
        </ThemeProvider>
      </WalletProvider >
    )
  );
};

setupErrorMonitoring();

const App = () => {
  return <AppProviders />;
};

export default App;
