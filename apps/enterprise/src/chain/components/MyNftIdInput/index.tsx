import { getRecord } from '@terra-money/apps/utils';
import { useMyNftsQuery } from 'chain/queries/useMyNftsQuery';
import { FixedOptionsInput } from 'lib/ui/inputs/Combobox/FixedOptionsInput';
import { NftOption } from './NftOption';

interface Props {
  nftAddress: string;
  value: string | null;
  onChange: (value: string | null) => void;
}

const label = 'NFT';

export const MyNftIdInput = ({ nftAddress, value, onChange }: Props) => {
  const { data: nfts = [], isLoading } = useMyNftsQuery(nftAddress);

  const nftRecord = getRecord(nfts, (nft) => nft.tokenId);

  return (
    <FixedOptionsInput<string>
      isLoading={isLoading}
      label={label}
      value={value}
      placeholder="NFT #..."
      onChange={onChange}
      optionToString={(tokenId) => {
        const { name } = nftRecord[tokenId];
        return name || tokenId;
      }}
      options={nfts.map((nft) => nft.tokenId)}
      renderOption={(tokenId) => {
        const { name, image } = nftRecord[tokenId];

        return <NftOption imageUri={image} name={name} address={tokenId} />;
      }}
      clearAfterOptionSelected
      noOptionsMessage="You don't have NFTs from this collection"
    />
  );
};
