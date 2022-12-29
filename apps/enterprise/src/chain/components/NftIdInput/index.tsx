import { getRecord } from '@terra-money/apps/utils';
import { useNftsQuery } from 'chain/queries/useNftsQuery';
import { FixedOptionsInput } from 'lib/ui/inputs/Combobox/FixedOptionsInput';
import { NftOption } from './NftOption';

interface Props {
  collectionAddress: string;
  ids: string[];
  value: string | null;
  onChange: (value: string | null) => void;
}

const label = 'NFT';

export const NftIdInput = ({ collectionAddress, ids, value, onChange }: Props) => {
  const { data: nfts = [], isLoading } = useNftsQuery({ collectionAddress, ids });

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
      noOptionsMessage="No NFTs from this collection"
    />
  );
};
