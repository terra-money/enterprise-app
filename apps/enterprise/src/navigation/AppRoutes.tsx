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
import { CreateProposalPage } from 'pages/create-proposal/CreateProposalPage';
import { ConditionalWallet } from 'components/conditional-wallet';
import { DistributePage } from 'pages/dao/distribute/DistributePage';
import { ProposalsPage } from 'pages/dao/proposals';
import { DaoMembersPage } from 'pages/dao/members';
import { ProposalPage } from 'pages/proposal';
import { AppRoutesWrapper } from 'navigation/components/AppRoutesWrapper';
import { useTransactionSnackbars } from 'hooks/useTransactionSnackbars';

export const AppRoutes = () => {
  useTransactionSnackbars();
  return (
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
  )
}