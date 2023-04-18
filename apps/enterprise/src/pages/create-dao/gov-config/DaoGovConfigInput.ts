export interface DaoGovConfigInput {
  quorum: number;
  threshold: number;
  vetoThreshold: number;
  unlockingPeriod: number;
  voteDuration: number;
  minimumDeposit?: number;
  hasInstantExecute?: boolean;
  allowEarlyProposalExecution?: boolean;
  minimumWeightForRewards?: number;
}
