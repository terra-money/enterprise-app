import { Navigate, Route, Routes } from 'react-router';
import { DashboardPage } from 'pages/dashboard';
import { Page as DAOsPage } from 'pages/daos';
import { CreateDAOPage } from 'pages/create-dao';
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
import { DaoPage } from 'pages/dao';
import { SelectProposalTypePage } from 'pages/create-proposal/SelectProposalTypePage';
import { Overview } from 'pages/dao/Overview';
import { TreasuryPage } from 'pages/dao/treasury/TreasuryPage';
import { Staking } from 'pages/dao/staking';

export const AppRoutes = () => {
  useTransactionSnackbars();
  return (
    <Routes>
      <Route index={true} element={<LandingPage />} />
      <Route path="/" element={<AppRoutesWrapper />}>
        <Route path={Path.Dashboard} element={<DashboardPage />} />
        <Route path={Path.Daos} element={<DAOsPage />} />
        <Route path="/dao/:address" element={<DaoPage />}>
          <Route index={true} element={<Overview />} />
          <Route path="treasury" element={<TreasuryPage />} />
          <Route path="proposals" element={<ProposalsPage />} />
          <Route path="rewards" element={<DistributePage />} />
          <Route path="staking" element={<Staking />} />
          <Route path="members" element={<DaoMembersPage />} />
        </Route>
        <Route
          path="/dao/:address/proposals/create"
          element={<ConditionalWallet connected={() => <SelectProposalTypePage />} />}
        />
        <Route path="/dao/:address/proposals/create/:type" element={<CreateProposalPage />} />
        <Route path="/dao/:address/proposals/:id" element={<ProposalPage />} />
        <Route path="/dao/create" element={<CreateDAOPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};
