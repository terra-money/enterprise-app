import { DaoErrorBoundary } from '../DaoErrorBoundary';
import { Members } from './Members';

export const DaoMembersPage = () => (
  <DaoErrorBoundary>
    <Members />
  </DaoErrorBoundary>
);
