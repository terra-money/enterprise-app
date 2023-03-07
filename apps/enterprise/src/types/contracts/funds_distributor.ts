export module funds_distributor {
  export type ExecuteMsg =
    | {
        update_user_weights: UpdateUserWeightsMsg;
      }
    | {
        distribute_native: {};
      }
    | {
        claim_rewards: ClaimRewardsMsg;
      }
    | {
        receive: Cw20ReceiveMsg;
      };
  export type Uint128 = string;
  export type Binary = string;
  export interface UpdateUserWeightsMsg {
    /**
     * The new total weight, after accounting for the users' changes
     */
    new_total_weight: Uint128;
    /**
     * New weights that the users have, after the change
     */
    new_user_weights: UserWeight[];
  }
  export interface UserWeight {
    user: string;
    weight: Uint128;
  }
  export interface ClaimRewardsMsg {
    /**
     * CW20 asset rewards to be claimed, should be addresses of CW20 tokens
     */
    cw20_assets: string[];
    /**
     * Native denominations to be claimed
     */
    native_denoms: string[];
    user: string;
  }
  export interface Cw20ReceiveMsg {
    amount: Uint128;
    msg: Binary;
    sender: string;
  }
  export interface InstantiateMsg {
    enterprise_contract: string;
  }
  export interface MigrateMsg {}
  export type QueryMsg = {
    user_rewards: UserRewardsParams;
  };
  export interface UserRewardsParams {
    /**
     * Addresses of CW20 tokens to be queried for rewards
     */
    cw20_assets: string[];
    /**
     * Native denominations to be queried for rewards
     */
    native_denoms: string[];
    user: string;
  }
}
