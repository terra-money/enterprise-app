import { LabeledValue } from 'lib/ui/LabeledValue';
import { DaoTVLValue } from './DaoTVLValue';

export const DaoTVL = () => {
  return (
    <LabeledValue name="Treasury total value">
      <DaoTVLValue />
    </LabeledValue>
  );
};
