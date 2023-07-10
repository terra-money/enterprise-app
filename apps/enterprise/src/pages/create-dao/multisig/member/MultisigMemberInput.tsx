import { Stack } from 'lib/ui/Stack';
import styles from './MultisigMemberInput.module.sass';
import { FormState } from '@terra-money/apps/hooks';
import { useState } from 'react';
import classNames from 'classnames';
import { DeleteIconButton } from 'components/delete-icon-button';
import { MultisigMember } from 'types/MultisigMember';
import { HStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import styled from 'styled-components';
import { Slider } from 'lib/ui/inputs/Slider';

interface MultisigMemberInputProps extends FormState<MultisigMember> {
  onChange: (member: Partial<MultisigMember>) => void;
  onRemove: () => void;
}

const Content = styled.div`
  display: grid;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 80px;
  align-items: center;
  gap: 16px;
`;

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
        <Stack alignItems="center" direction="row" className={styles.row}>
          <input
            autoFocus
            placeholder="Enter a wallet address"
            className={styles.walletInput}
            value={addr}
            onChange={({ currentTarget }) => onChange({ addr: currentTarget.value })}
          />

          <DeleteIconButton size="small" onClick={onRemove} />
        </Stack>
        {!addrError && (
          <Stack direction="row" className={styles.row}>
            <HStack gap={20} fullWidth alignItems="center">
              <Text color="supporting">Weight</Text>
              <Content>
                <Slider
                  size="l"
                  step={1}
                  min={0}
                  max={100}
                  onChange={(weight) => onChange({ weight })}
                  value={weight}
                />
                <Text style={{ textAlign: 'end' }} weight="bold">
                  {weight}%
                </Text>
              </Content>
            </HStack>
          </Stack>
        )}
      </div>
    </>
  );
};
