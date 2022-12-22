import { FixedOptionsInput } from 'lib/ui/inputs/Combobox/FixedOptionsInput';
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
    />
  );
};
