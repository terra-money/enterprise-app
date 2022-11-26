import { TitledCard } from 'components/titled-card';
import { FieldsDiff } from './FieldsDiff';

interface Props {
  title: string;
  fieldNameRecord: Record<string, string>;
  oldView: Record<string, string>;
  updatedFields: Record<string, string | undefined>;
}

export const ProposalActionDiff = ({ title, oldView, updatedFields, fieldNameRecord }: Props) => {
  return (
    <TitledCard title={title}>
      <FieldsDiff
        fields={Object.entries(updatedFields).map(([name, newValue]) => {
          const oldValue = oldView[name];
          return { name: fieldNameRecord[name] || name, oldValue, newValue: newValue as string };
        })}
      />
    </TitledCard>
  );
};
