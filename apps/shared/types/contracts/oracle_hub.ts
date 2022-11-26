export module oracle_hub {
  export interface AllSourcesResponse {
    list: SourcesResponse[];
  }
  export interface SourcesResponse {
    proxies: [number, ProxyInfoResponse][];
    symbol: string;
  }
  export interface ProxyInfoResponse {
    address: string;
    provider_name: string;
  }
  export interface AssetSymbolMapResponse {
    map: [string, string][];
  }
  export interface ConfigResponse {
    base_denom: string;
    max_proxies_per_symbol: number;
    owner: string;
  }
  export type ExecuteMsg =
    | {
        update_owner: {
          owner: string;
        };
      }
    | {
        update_max_proxies: {
          max_proxies_per_symbol: number;
        };
      }
    | {
        register_source: {
          priority?: number | null;
          proxy_addr: string;
          symbol: string;
        };
      }
    | {
        bulk_register_source: {
          sources: [string, string, number | null][];
        };
      }
    | {
        update_source_priority_list: {
          priority_list: [string, number][];
          symbol: string;
        };
      }
    | {
        remove_source: {
          proxy_addr: string;
          symbol: string;
        };
      }
    | {
        whitelist_proxy: {
          provider_name: string;
          proxy_addr: string;
        };
      }
    | {
        remove_proxy: {
          proxy_addr: string;
        };
      }
    | {
        insert_asset_symbol_map: {
          map: [string, string][];
        };
      };
  export interface InstantiateMsg {
    base_denom: string;
    max_proxies_per_symbol: number;
    owner: string;
  }
  export type PriceQueryResult =
    | 'fail'
    | {
        success: PriceResponse;
      };
  export type Decimal = string;
  export interface PriceListResponse {
    price_list: [number, ProxyInfoResponse, PriceQueryResult][];
  }
  export interface PriceResponse {
    last_updated: number;
    rate: Decimal;
  }
  export interface ProxyWhitelistResponse {
    proxies: ProxyInfoResponse[];
  }
  export type QueryMsg =
    | {
        config: {};
      }
    | {
        proxy_whitelist: {};
      }
    | {
        all_sources: {
          limit?: number | null;
          start_after?: string | null;
        };
      }
    | {
        sources: {
          asset_token: string;
        };
      }
    | {
        sources_by_symbol: {
          symbol: string;
        };
      }
    | {
        price: {
          asset_token: string;
          timeframe?: number | null;
        };
      }
    | {
        price_by_symbol: {
          symbol: string;
          timeframe?: number | null;
        };
      }
    | {
        price_list: {
          asset_token: string;
        };
      }
    | {
        price_list_by_symbol: {
          symbol: string;
        };
      }
    | {
        asset_symbol_map: {
          limit?: number | null;
          start_after?: string | null;
        };
      }
    | {
        check_source: {
          proxy_addr: string;
          symbol: string;
        };
      };
}
