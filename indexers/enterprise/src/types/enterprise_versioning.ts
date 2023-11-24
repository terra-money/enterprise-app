export type Addr = string
export interface AdminResponse {
  admin: Addr
}
export type ExecuteMsg = {
  add_version: AddVersionMsg
}
export interface AddVersionMsg {
  version: VersionInfo
}
export interface VersionInfo {
  attestation_code_id: number
  /**
   * Changelog items from the previous version
   */
  changelog: string[]
  denom_staking_membership_code_id: number
  enterprise_code_id: number
  enterprise_governance_code_id: number
  enterprise_governance_controller_code_id: number
  enterprise_treasury_code_id: number
  funds_distributor_code_id: number
  multisig_membership_code_id: number
  nft_staking_membership_code_id: number
  token_staking_membership_code_id: number
  version: Version
}
export interface Version {
  major: number
  minor: number
  patch: number
}
export interface InstantiateMsg {
  admin: string
}
export interface MigrateMsg {}
export type QueryMsg =
  | {
      admin: {}
    }
  | {
      version: VersionParams
    }
  | {
      versions: VersionsParams
    }
  | {
      latest_version: {}
    }
export interface VersionParams {
  version: Version
}
export interface VersionsParams {
  limit?: number | null
  start_after?: Version | null
}
export interface VersionResponse {
  version: VersionInfo
}
export interface VersionsResponse {
  versions: VersionInfo[]
}
