import { daoTypeName, daoTypes } from 'dao';
import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';
import { ShyTextButton } from 'lib/ui/buttons/ShyTextButton';
import { Checkbox } from 'lib/ui/inputs/Checkbox/Checkbox';
import { Line } from 'lib/ui/Line';
import { OverlayMenu } from 'lib/ui/Menu/OverlayMenu';
import { VStack } from 'lib/ui/Stack';
import { enterprise } from 'types/contracts';

interface DaoFilterProps {
  value: enterprise.DaoType[];
  onChange: (value: enterprise.DaoType[]) => void;
}

export const DaoFilter = ({ value, onChange }: DaoFilterProps) => {
  const areAllTypesIncluded = daoTypes.every((daoType) => value.includes(daoType));
  return (
    <OverlayMenu
      title="Display DAO types"
      content={
        <VStack fullWidth alignItems="start" gap={12}>
          {daoTypes.map((daoType) => (
            <Checkbox
              label={daoTypeName[daoType]}
              key={daoType}
              value={value.includes(daoType)}
              onChange={(shouldInclude) =>
                onChange(shouldInclude ? [...value, daoType] : value.filter((v) => v !== daoType))
              }
            />
          ))}
          {!areAllTypesIncluded && (
            <>
              <Line />
              <ShyTextButton text="Reset filters" onClick={() => onChange(daoTypes)} />
            </>
          )}
        </VStack>
      }
      renderOpener={({ onClick, ref }) => (
        <div ref={ref}>
          <PrimaryButton kind="secondary" onClick={onClick}>
            Filter
          </PrimaryButton>
        </div>
      )}
    />
  );
};
