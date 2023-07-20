import { Text } from 'lib/ui/Text';
import styles from './FieldsDiff.module.sass';
import React, { ReactNode } from 'react';
import { ValueDiff } from 'components/value-diff';
import styled from 'styled-components';

export interface FieldChangeInfo {
  name: string;
  oldValue: ReactNode;
  newValue: ReactNode;
}

interface FieldsDiffProps {
  fields: FieldChangeInfo[];
}

const Container = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 228px 1fr;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
  }
`;

export const FieldsDiff = ({ fields }: FieldsDiffProps) => {
  return (
    <Container>
      {fields.map((field) => {
        return (
          <React.Fragment key={field.name}>
            <Text className={styles.name} size={14} color="supporting">
              {field.name}:
            </Text>
            <ValueDiff oldValue={field.oldValue} newValue={field.newValue} />
          </React.Fragment>
        );
      })}
    </Container>
  );
};
