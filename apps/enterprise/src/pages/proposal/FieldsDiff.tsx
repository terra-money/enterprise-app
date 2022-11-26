import { Text } from 'components/primitives';
import styles from './FieldsDiff.module.sass';
import React from 'react';
import { ValueDiff } from 'components/value-diff';

interface FieldChangeInfo {
  name: string;
  oldValue: string;
  newValue: string;
}

interface FieldsDiffProps {
  fields: FieldChangeInfo[];
}

export const FieldsDiff = ({ fields }: FieldsDiffProps) => {
  return (
    <div className={styles.root}>
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
    </div>
  );
};
