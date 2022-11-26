export interface DaoGovConfigInput {
  quorum: number;
  threshold: number;
  unlockingPeriod: number;
  voteDuration: number;
  minimumDeposit?: number;
}
