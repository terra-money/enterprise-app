import { IntegratedSliderInput } from 'components/primitives';
import { Container } from '@terra-money/apps/components';
import styles from './MultisigMemberInput.module.sass';
import { FormState } from '@terra-money/apps/hooks';
import { useState } from 'react';
import classNames from 'classnames';
import { DeleteIconButton } from 'components/delete-icon-button';
import { MultisigMember } from 'types/MultisigMember';

interface MultisigMemberInputProps extends FormState<MultisigMember> {
  onChange: (member: Partial<MultisigMember>) => void;
  onRemove: () => void;
}

export const MultisigMemberInput = ({ addr, addrError, weight, onChange, onRemove }: MultisigMemberInputProps) => {
  const [editing, setEditing] = useState(false);

  return (
    <>
      <div
        onFocus={() => {
          setEditing(true);
        }}
        onBlur={() => {
          setEditing(false);
        }}
        className={classNames(styles.root, { [styles.error]: addrError && !editing })}
      >
        <Container className={styles.row}>
          <input
            autoFocus
            placeholder="Enter a wallet address"
            className={styles.walletInput}
            value={addr}
            onChange={({ currentTarget }) => onChange({ addr: currentTarget.value })}
          />

          <DeleteIconButton size="small" onClick={onRemove} />
        </Container>
        {!addrError && (
          <Container className={styles.row}>
            <IntegratedSliderInput
              label="Weight"
              value={weight}
              onChange={(_, weight) => onChange({ weight: weight as number })}
            />
          </Container>
        )}
      </div>
    </>
  );
};
