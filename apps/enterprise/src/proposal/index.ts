import { enterprise } from 'types/contracts';

export const proposalStatuses: enterprise.ProposalStatus[] = ['in_progress', 'passed', 'rejected', 'executed'];

export const proposalStatusName: Record<enterprise.ProposalStatus, string> = {
  in_progress: 'Pending',
  passed: 'Passed',
  rejected: 'Rejected',
  executed: 'Executed',
};
