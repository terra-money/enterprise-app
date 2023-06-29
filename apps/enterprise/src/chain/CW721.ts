interface CW721Trait {
  display_type?: string;
  trait_type: string;
  value: string;
}

interface CW721Metadata {
  image?: string;
  image_data?: string;
  external_url?: string;
  description?: string;
  name?: string;
  attributes?: CW721Trait[];
  background_color?: string;
  animation_url?: string;
  youtube_url?: string;
}

export interface MintCW721Msg {
  mint: {
    token_id: string;
    owner: string;
    token_uri?: string;
    extension: CW721Metadata;
  }
}

export type CW721Msg = MintCW721Msg