import { DaoErrorBoundary } from 'pages/dao/DaoErrorBoundary';
import { ProposalPageContent } from './ProposalPageContent';

export const ProposalPage = () => (
  <DaoErrorBoundary>
    <ProposalPageContent />
  </DaoErrorBoundary>
);
