import { ReactNode, useMemo } from 'react';
import { FieldChangeInfo, FieldsDiff } from './FieldsDiff';

interface Props {
  fieldNameRecord: Record<string, string>;
  oldView: Record<string, ReactNode | undefined>;
  updatedFields: Record<string, ReactNode | undefined>;
}

export const ProposalActionDiff = ({ oldView, updatedFields, fieldNameRecord }: Props) => {
  const fields = useMemo(() => {
    const result: FieldChangeInfo[] = [];

    Object.entries(updatedFields).forEach(([name, newValue]) => {
      const oldValue = oldView[name];
      if (oldValue === undefined || newValue === undefined) return;

      result.push({ name: fieldNameRecord[name] || name, oldValue, newValue });
    });
    return result;
  }, [fieldNameRecord, oldView, updatedFields]);

  return <FieldsDiff fields={fields} />;
};
