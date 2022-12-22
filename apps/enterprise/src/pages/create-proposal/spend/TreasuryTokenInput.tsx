import { SafeImage } from 'components/safe-image/SafeImage';
import { CoverImage } from 'lib/ui/images/CoverImage';
import { ImageHolder } from 'lib/ui/images/ImageHolder';
import { FixedOptionsInput } from 'lib/ui/inputs/Combobox/FixedOptionsInput';
import { HStack, VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { TreasuryToken } from 'queries';
import { useCurrentDaoTreasuryTokens } from './CurrentDAOTreasuryTokentsProvider';

interface TreasuryTokenInputProps {
  value: TreasuryToken | null;
  onChange: (value: TreasuryToken | null) => void;
  error?: string;
}

export const TreasuryTokenInput = ({ value, onChange, error }: TreasuryTokenInputProps) => {
  const treasuryTokens = useCurrentDaoTreasuryTokens();

  return (
    <FixedOptionsInput
      label="Treasury token"
      placeholder="Select treasury token"
      options={treasuryTokens}
      error={error}
      onChange={onChange}
      optionToString={(token) => token.key}
      value={value}
      renderOption={(token) => (
        <HStack alignItems="center" gap={8}>
          <ImageHolder width={32} height={32}>
            <SafeImage src={token.icon} render={(props) => <CoverImage {...props} />} />
          </ImageHolder>
          <VStack>
            <Text>{token.name || token.symbol}</Text>
            <Text size={14} cropped color="supporting">
              {token.key}
            </Text>
          </VStack>
        </HStack>
      )}
    />
  );
};
