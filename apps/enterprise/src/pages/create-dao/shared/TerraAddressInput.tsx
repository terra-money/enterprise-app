import { validateAddress } from '@terra-money/apps/utils';
import { Text, Throbber } from 'components/primitives';
import { useEffect, useState } from 'react';
import { WizardInput } from '../WizardInput';
import styles from './TerraAddressInput.module.sass';

interface TerraAddressInputProps {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  label: string;
  error?: string;
  validating?: boolean;
}

export const TerraAddressInput = (props: TerraAddressInputProps) => {
  const { onChange, label, validating } = props;

  const [value, setValue] = useState(props.value || '');
  const terraAddressError = validateAddress(value || '');
  const isValidTerraAddress = terraAddressError === undefined;
  useEffect(() => {
    onChange(isValidTerraAddress ? value : undefined);
  }, [isValidTerraAddress, onChange, value]);

  return (
    <div className={styles.root}>
      <WizardInput
        label={label}
        placeholder="Enter a Terra address"
        value={value}
        error={terraAddressError || props.error}
        onValueChange={setValue}
      />
      {validating && (
        <div className={styles.loader}>
          <Text variant="text">Checking Terra address</Text>
          <Throbber size="small" />
        </div>
      )}
    </div>
  );
};
