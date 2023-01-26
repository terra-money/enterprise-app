import { TitledCard } from 'components/titled-card';
import { useMemo } from 'react';
import { FieldChangeInfo, FieldsDiff } from './FieldsDiff';

interface Props {
  title: string;
  fieldNameRecord: Record<string, string>;
  oldView: Record<string, string | undefined>;
  updatedFields: Record<string, string | undefined>;
}

export const ProposalActionDiff = ({ title, oldView, updatedFields, fieldNameRecord }: Props) => {
  const fields = useMemo(() => {
    const result: FieldChangeInfo[] = [];

    Object.entries(updatedFields).forEach(([name, newValue]) => {
      const oldValue = oldView[name];
      if (oldValue === undefined || newValue === undefined) return;

      result.push({ name: fieldNameRecord[name] || name, oldValue, newValue: newValue as string });
    });
    return result;
  }, [fieldNameRecord, oldView, updatedFields]);

  return (
    <TitledCard title={title}>
      <FieldsDiff fields={fields} />
    </TitledCard>
  );
};
