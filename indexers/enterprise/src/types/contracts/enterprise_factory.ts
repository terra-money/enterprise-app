export module enterprise_factory { 
export type Addr = string
export interface AllDaosResponse {
  daos: Addr[];
}
export interface ConfigResponse {
  config: Config;
}
export interface Config {
  cw20_code_id: number;
  cw721_code_id: number;
  enterprise_versioning: Addr;
}
export type Uint64 = string
export interface EnterpriseCodeIdsResponse {
  code_ids: Uint64[];
}
export type ExecuteMsg =
  | {
      create_dao: CreateDaoMsg;
    }
  | {
      finalize_dao_creation: {};
    }
export type AssetInfoBaseFor_String =
  | {
      native: string;
    }
  | {
      cw20: string;
    }
  | {
      /**
       * @minItems 2
       * @maxItems 2
       */
      cw1155: [string, string];
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
  | "update_minimum_weight_for_rewards"
  | "add_attestation"
  | "remove_attestation"
  | "deploy_cross_chain_treasury"
export type Decimal = string
export type CreateDaoMembershipMsg =
  | {
      new_denom: NewDenomMembershipMsg;
    }
  | {
      import_cw20: ImportCw20MembershipMsg;
    }
  | {
      new_cw20: NewCw20MembershipMsg;
    }
  | {
      import_cw721: ImportCw721MembershipMsg;
    }
  | {
      new_cw721: NewCw721MembershipMsg;
    }
  | {
      import_cw3: ImportCw3MembershipMsg;
    }
  | {
      new_multisig: NewMultisigMembershipMsg;
    }
export type Duration =
  | {
      height: number;
    }
  | {
      time: number;
    }
export type Uint128 = string
export type Logo =
  | "none"
  | {
      url: string;
    }
export interface CreateDaoMsg {
  /**
   * assets that are allowed to show in DAO's treasury
   */
  asset_whitelist?: AssetInfoBaseFor_String[] | null;
  /**
   * Optional text that users will have to attest to before being able to participate in DAO's governance and certain other functions.
   */
  attestation_text?: string | null;
  /**
   * Optional council structure that can manage certain aspects of the DAO
   */
  dao_council?: DaoCouncilSpec | null;
  dao_membership: CreateDaoMembershipMsg;
  dao_metadata: DaoMetadata;
  gov_config: GovConfig;
  /**
   * Minimum weight that a user should have in order to qualify for rewards. E.g. a value of 3 here means that a user in token or NFT DAO needs at least 3 staked DAO assets, or a weight of 3 in multisig DAO, to be eligible for rewards.
   */
  minimum_weight_for_rewards?: Uint128 | null;
  /**
   * NFTs that are allowed to show in DAO's treasury
   */
  nft_whitelist?: string[] | null;
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
export interface NewDenomMembershipMsg {
  denom: string;
  unlocking_period: Duration;
}
export interface ImportCw20MembershipMsg {
  /**
   * Address of the CW20 token to import
   */
  cw20_contract: string;
  /**
   * Duration after which unstaked tokens can be claimed
   */
  unlocking_period: Duration;
}
export interface NewCw20MembershipMsg {
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
  unlocking_period: Duration;
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
export interface ImportCw721MembershipMsg {
  /**
   * Address of the CW721 contract to import
   */
  cw721_contract: string;
  /**
   * Duration after which unstaked items can be claimed
   */
  unlocking_period: Duration;
}
export interface NewCw721MembershipMsg {
  minter?: string | null;
  nft_name: string;
  nft_symbol: string;
  unlocking_period: Duration;
}
export interface ImportCw3MembershipMsg {
  /**
   * Address of the CW3 contract to import
   */
  cw3_contract: string;
}
export interface NewMultisigMembershipMsg {
  multisig_members: UserWeight[];
}
export interface UserWeight {
  user: string;
  weight: Uint128;
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
export interface GovConfig {
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
export interface InstantiateMsg {
  config: Config;
}
export interface IsEnterpriseCodeIdResponse {
  is_enterprise_code_id: boolean;
}
export interface MigrateMsg {
  enterprise_versioning_addr: string;
}
export type QueryMsg =
  | {
      config: {};
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