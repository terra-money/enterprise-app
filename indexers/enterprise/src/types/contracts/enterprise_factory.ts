export module enterprise_factory { 
export type Addr = string
export interface AllDaosResponse {
  daos: Addr[];
}
export type AssetInfoBaseFor_Addr =
  | {
      native: string;
    }
  | {
      cw20: Addr;
    }
  | {
      /**
       * @minItems 2
       * @maxItems 2
       */
      cw1155: [Addr, string];
    }
export interface AssetWhitelistResponse {
  assets: AssetInfoBaseFor_Addr[];
}
export interface ConfigResponse {
  config: Config;
}
export interface Config {
  cw20_code_id: number;
  cw3_fixed_multisig_code_id: number;
  cw721_code_id: number;
  enterprise_code_id: number;
  enterprise_governance_code_id: number;
  funds_distributor_code_id: number;
}
export type Uint64 = string
export interface EnterpriseCodeIdsResponse {
  code_ids: Uint64[];
}
export type ExecuteMsg = {
  create_dao: CreateDaoMsg;
}
export type ProposalActionType =
  | "update_metadata"
  | "update_gov_config"
  | "update_council"
  | "update_asset_whitelist"
  | "update_nft_whitelist"
  | "request_funding_from_dao"
  | "upgrade_dao"
  | "execute_msgs"
  | "modify_multisig_membership"
  | "distribute_funds"
export type Decimal = string
export type Uint128 = string
export type Duration =
  | {
      height: number;
    }
  | {
      time: number;
    }
export type CreateDaoMembershipMsg =
  | {
      new_membership: NewMembershipInfo;
    }
  | {
      existing_membership: ExistingDaoMembershipMsg;
    }
export type NewMembershipInfo =
  | {
      new_token: NewTokenMembershipInfo;
    }
  | {
      new_nft: NewNftMembershipInfo;
    }
  | {
      new_multisig: NewMultisigMembershipInfo;
    }
export type DaoType = "token" | "nft" | "multisig"
export type Logo =
  | "none"
  | {
      url: string;
    }
export interface CreateDaoMsg {
  /**
   * assets that are allowed to show in DAO's treasury
   */
  asset_whitelist?: AssetInfoBaseFor_Addr[] | null;
  /**
   * Optional council structure that can manage certain aspects of the DAO
   */
  dao_council?: DaoCouncilSpec | null;
  dao_gov_config: DaoGovConfig;
  dao_membership: CreateDaoMembershipMsg;
  dao_metadata: DaoMetadata;
  /**
   * NFTs that are allowed to show in DAO's treasury
   */
  nft_whitelist?: Addr[] | null;
}
export interface DaoCouncilSpec {
  /**
   * Proposal action types allowed in proposals that are voted on by the council. Effectively defines what types of actions council can propose and vote on. If None, will default to a predefined set of actions.
   */
  allowed_proposal_action_types?: ProposalActionType[] | null;
  /**
   * Addresses of council members. Each member has equal voting power.
   */
  members: string[];
  /**
   * Portion of total available votes cast in a proposal to consider it valid e.g. quorum of 30% means that 30% of all available votes have to be cast in the proposal, otherwise it fails automatically when it expires
   */
  quorum: Decimal;
  /**
   * Portion of votes assigned to a single option from all the votes cast in the given proposal required to determine the 'winning' option e.g. 51% threshold means that an option has to have at least 51% of the cast votes to win
   */
  threshold: Decimal;
}
export interface DaoGovConfig {
  /**
   * If set to true, this will allow DAOs to execute proposals that have reached quorum and threshold, even before their voting period ends.
   */
  allow_early_proposal_execution: boolean;
  /**
   * Optional minimum amount of DAO's governance unit to be required to create a deposit.
   */
  minimum_deposit?: Uint128 | null;
  /**
   * Portion of total available votes cast in a proposal to consider it valid e.g. quorum of 30% means that 30% of all available votes have to be cast in the proposal, otherwise it fails automatically when it expires
   */
  quorum: Decimal;
  /**
   * Portion of votes assigned to a single option from all the votes cast in the given proposal required to determine the 'winning' option e.g. 51% threshold means that an option has to have at least 51% of the cast votes to win
   */
  threshold: Decimal;
  /**
   * Duration that has to pass for unstaked membership tokens to be claimable
   */
  unlocking_period: Duration;
  /**
   * Portion of votes assigned to veto option from all the votes cast in the given proposal required to veto the proposal. If None, will default to the threshold set for all proposal options.
   */
  veto_threshold?: Decimal | null;
  /**
   * Duration of proposals before they end, expressed in seconds
   */
  vote_duration: number;
}
export interface NewTokenMembershipInfo {
  /**
   * Optional amount of tokens to be minted to the DAO's address
   */
  initial_dao_balance?: Uint128 | null;
  initial_token_balances: Cw20Coin[];
  token_decimals: number;
  token_marketing?: TokenMarketingInfo | null;
  token_mint?: MinterResponse | null;
  token_name: string;
  token_symbol: string;
}
export interface Cw20Coin {
  address: string;
  amount: Uint128;
}
export interface TokenMarketingInfo {
  description?: string | null;
  logo_url?: string | null;
  marketing_owner?: string | null;
  project?: string | null;
}
export interface MinterResponse {
  /**
   * cap is a hard cap on total supply that can be achieved by minting. Note that this refers to total_supply. If None, there is unlimited cap.
   */
  cap?: Uint128 | null;
  minter: string;
}
export interface NewNftMembershipInfo {
  minter?: string | null;
  nft_name: string;
  nft_symbol: string;
}
export interface NewMultisigMembershipInfo {
  multisig_members: MultisigMember[];
}
export interface MultisigMember {
  address: string;
  weight: Uint128;
}
export interface ExistingDaoMembershipMsg {
  dao_type: DaoType;
  membership_contract_addr: string;
}
export interface DaoMetadata {
  description?: string | null;
  logo: Logo;
  name: string;
  socials: DaoSocialData;
}
export interface DaoSocialData {
  discord_username?: string | null;
  github_username?: string | null;
  telegram_username?: string | null;
  twitter_username?: string | null;
}
export interface InstantiateMsg {
  config: Config;
  global_asset_whitelist?: AssetInfoBaseFor_Addr[] | null;
  global_nft_whitelist?: Addr[] | null;
}
export interface IsEnterpriseCodeIdResponse {
  is_enterprise_code_id: boolean;
}
export interface MigrateMsg {
  new_enterprise_code_id: number;
  new_enterprise_governance_code_id: number;
  new_funds_distributor_code_id: number;
}
export interface NftWhitelistResponse {
  nfts: Addr[];
}
export type QueryMsg =
  | {
      config: {};
    }
  | {
      global_asset_whitelist: {};
    }
  | {
      global_nft_whitelist: {};
    }
  | {
      all_daos: QueryAllDaosMsg;
    }
  | {
      enterprise_code_ids: EnterpriseCodeIdsMsg;
    }
  | {
      is_enterprise_code_id: IsEnterpriseCodeIdMsg;
    }
export interface QueryAllDaosMsg {
  limit?: number | null;
  start_after?: Uint64 | null;
}
export interface EnterpriseCodeIdsMsg {
  limit?: number | null;
  start_after?: Uint64 | null;
}
export interface IsEnterpriseCodeIdMsg {
  code_id: Uint64;
} }