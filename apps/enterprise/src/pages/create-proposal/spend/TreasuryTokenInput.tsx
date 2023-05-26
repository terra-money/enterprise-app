import { SafeImage } from 'components/safe-image/SafeImage';
import { CoverImage } from 'lib/ui/images/CoverImage';
import { ImageHolder } from 'lib/ui/images/ImageHolder';
import { FixedOptionsInput } from 'lib/ui/inputs/Combobox/FixedOptionsInput';
import { HStack, VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { useCurrentDaoTreasuryTokens } from './CurrentDAOTreasuryTokentsProvider';
import { AssetInfoWithPrice } from 'chain/Asset';

interface TreasuryTokenInputProps {
  value: AssetInfoWithPrice | null;
  onChange: (value: AssetInfoWithPrice | null) => void;
  error?: string;
}

export const TreasuryTokenInput = ({ value, onChange, error }: TreasuryTokenInputProps) => {
  const treasuryTokens = useCurrentDaoTreasuryTokens();

  return (
    <FixedOptionsInput
      label="Treasury token"
      placeholder="Select a treasury token"
      options={treasuryTokens}
      error={error}
      onChange={onChange}
      optionToString={(token) => token.id}
      value={value}
      renderOption={(token) => (
        <HStack alignItems="center" gap={8}>
          <ImageHolder width={32} height={32}>
            <SafeImage src={token.icon} render={(props) => <CoverImage {...props} />} />
          </ImageHolder>
          <VStack>
            <Text>{token.name || token.symbol}</Text>
            <Text size={14} cropped color="supporting">
              {token.id}
            </Text>
          </VStack>
        </HStack>
      )}
    />
  );
};
