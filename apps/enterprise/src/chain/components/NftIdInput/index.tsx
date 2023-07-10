import { getRecord } from 'lib/shared/utils/getRecord';
import { NftInfo } from 'chain/queries/useNftInfoQuery';
import { FixedOptionsInput } from 'lib/ui/inputs/Combobox/FixedOptionsInput';
import { SelectedOption } from 'lib/ui/inputs/Select/SelectedOption';
import { HStack, VStack } from 'lib/ui/Stack';
import { NftOption } from './NftOption';

interface Props {
  options: NftInfo[];
  isLoading?: boolean;
  value: string[];
  onChange: (value: string[]) => void;
}

const label = 'NFT';

export const NftIdsInput = ({ options: nfts, isLoading, value, onChange }: Props) => {
  const nftRecord = getRecord(nfts, (nft) => nft.tokenId);

  const handlAdd = (tokenId: string) => {
    onChange([...value, tokenId]);
  };

  const handleRemove = (tokenId: string) => {
    onChange(value.filter((v) => v !== tokenId));
  };

  return (
    <VStack>
      <FixedOptionsInput<string>
        isLoading={isLoading}
        label={label}
        value={null}
        placeholder="Select NFT"
        onChange={(value) => {
          if (value) {
            handlAdd(value);
          }
        }}
        optionToString={(tokenId) => {
          const { name } = nftRecord[tokenId];
          return name || tokenId;
        }}
        options={nfts.map((nft) => nft.tokenId).filter((tokenId) => !value.includes(tokenId))}
        renderOption={(tokenId) => {
          const { name, image } = nftRecord[tokenId];

          return <NftOption imageUri={image} name={name} address={tokenId} />;
        }}
        clearAfterOptionSelected
        noOptionsMessage="No NFTs from this collection"
      />
      <HStack gap={8} wrap="wrap">
        {value.map((tokenId) => {
          const { name } = nftRecord[tokenId];
          return <SelectedOption key={tokenId} value={name || `#${tokenId}`} onRemove={() => handleRemove(tokenId)} />;
        })}
      </HStack>
    </VStack>
  );
};
