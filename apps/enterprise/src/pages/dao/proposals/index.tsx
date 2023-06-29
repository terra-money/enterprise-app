import { DaoErrorBoundary } from '../DaoErrorBoundary';
import { ProposalsPageContent } from './ProposalsPageContent';

export const ProposalsPage = () => (
  <DaoErrorBoundary>
    <ProposalsPageContent />
  </DaoErrorBoundary>
);
