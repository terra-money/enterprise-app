export module enterprise_factory {
  export type Addr = string;
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
      };
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
  }
  export type Uint64 = string;
  export interface EnterpriseCodeIdsResponse {
    code_ids: Uint64[];
  }
  export type ExecuteMsg = {
    create_dao: CreateDaoMsg;
  };
  export type Uint128 = string;
  export type Decimal = string;
  export type Duration =
    | {
        height: number;
      }
    | {
        time: number;
      };
  export type CreateDaoMembershipMsg =
    | {
        new_membership: NewMembershipInfo;
      }
    | {
        existing_membership: ExistingDaoMembershipMsg;
      };
  export type NewMembershipInfo =
    | {
        new_token: NewTokenMembershipInfo;
      }
    | {
        new_nft: NewNftMembershipInfo;
      }
    | {
        new_multisig: NewMultisigMembershipInfo;
      };
  export type DaoType = 'token' | 'nft' | 'multisig';
  export type Logo =
    | 'none'
    | {
        url: string;
      };
  export interface CreateDaoMsg {
    /**
     * assets that are allowed to show in DAO's treasury
     */
    asset_whitelist?: AssetInfoBaseFor_Addr[] | null;
    dao_gov_config: DaoGovConfig;
    dao_membership: CreateDaoMembershipMsg;
    dao_metadata: DaoMetadata;
    /**
     * NFTs that are allowed to show in DAO's treasury
     */
    nft_whitelist?: Addr[] | null;
  }
  export interface DaoGovConfig {
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
     * Duration of proposals before they end, expressed in seconds
     */
    vote_duration: number;
  }
  export interface NewTokenMembershipInfo {
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
    logo: Logo;
    name: string;
    description?: string;
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
    new_enterprise_code_id?: number | null;
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
      };
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
  }
}
