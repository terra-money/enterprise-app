import { LabeledValue } from 'lib/ui/LabeledValue';
import { useAreIndexersEnabled } from 'state/hooks/useAreIndexersEnabled';
import { DaoTVLValue } from './DaoTVLValue';

export const DaoTVL = () => {
  const [areIndexersEnabled] = useAreIndexersEnabled();

  return (
    <LabeledValue name="Treasury total value">
      {areIndexersEnabled ? <DaoTVLValue /> : 'Indexers are not enabled'}
    </LabeledValue>
  );
};
