import { DeleteIconButton } from 'components/delete-icon-button';
import { WizardInput } from 'pages/create-dao/WizardInput';
import styles from './WhitelistedNFTInput.module.sass';

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
      <WizardInput
        label="NFT address"
        placeholder="Enter a CW721 NFT address"
        value={value}
        error={error}
        loading={loading}
        valid={!error && !loading}
        onValueChange={onChange}
      />
      <DeleteIconButton className={styles.delete} onClick={onRemove} />
    </div>
  );
};
