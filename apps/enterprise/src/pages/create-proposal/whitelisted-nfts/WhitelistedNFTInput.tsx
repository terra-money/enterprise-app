import { DeleteButton } from 'lib/ui/buttons/DeleteButton';
import styles from './WhitelistedNFTInput.module.sass';
import { TextInput } from 'lib/ui/inputs/TextInput';

interface WhitelistedNFTInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  loading?: boolean;
  onRemove?: () => void;
}

export const WhitelistedNFTInput = ({ value, onChange, onRemove, error, loading }: WhitelistedNFTInputProps) => {
  return (
    <div className={styles.root}>
      <TextInput
        label="NFT address"
        placeholder="Enter a CW721 NFT address"
        value={value}
        error={error}
        isLoading={loading}
        onValueChange={onChange}
      />
      <DeleteButton size="l" className={styles.delete} onClick={onRemove} />
    </div>
  );
};
