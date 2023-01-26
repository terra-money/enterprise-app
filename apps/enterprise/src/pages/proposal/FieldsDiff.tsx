import { Text } from 'components/primitives';
import styles from './FieldsDiff.module.sass';
import React from 'react';
import { ValueDiff } from 'components/value-diff';
import styled from 'styled-components';

export interface FieldChangeInfo {
  name: string;
  oldValue: string;
  newValue: string;
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
            <Text className={styles.name} variant="text">
              {field.name}:
            </Text>
            <ValueDiff oldValue={field.oldValue} newValue={field.newValue} />
          </React.Fragment>
        );
      })}
    </Container>
  );
};
