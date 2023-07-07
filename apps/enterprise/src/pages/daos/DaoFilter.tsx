import { daoTypeName, daoTypes } from 'dao';
import { Button } from 'lib/ui/buttons/Button';
import { ShyTextButton } from 'lib/ui/buttons/ShyTextButton';
import { Checkbox } from 'lib/ui/inputs/Checkbox/Checkbox';
import { Line } from 'lib/ui/Line';
import { Menu } from 'lib/ui/Menu';
import { VStack } from 'lib/ui/Stack';
import { enterprise } from 'types/contracts';

interface DaoFilterProps {
  value: enterprise.DaoType[];
  onChange: (value: enterprise.DaoType[]) => void;
}

export const DaoFilter = ({ value, onChange }: DaoFilterProps) => {
  const areAllTypesIncluded = daoTypes.every((daoType) => value.includes(daoType));
  return (
    <Menu
      title="Display DAO types"
      renderContent={({ onClose }) => (
        <VStack fullWidth alignItems="start" gap={12}>
          {daoTypes.map((daoType) => (
            <Checkbox
              label={daoTypeName[daoType]}
              key={daoType}
              value={value.includes(daoType)}
              onChange={(shouldInclude) => {
                onClose();
                onChange(shouldInclude ? [...value, daoType] : value.filter((v) => v !== daoType));
              }}
            />
          ))}
          {!areAllTypesIncluded && (
            <>
              <Line />
              <ShyTextButton
                text="Reset filters"
                onClick={() => {
                  onChange(daoTypes);
                  onClose();
                }}
              />
            </>
          )}
        </VStack>
      )}
      renderOpener={(props) => (
        <div {...props}>
          <Button kind="secondary">Filter</Button>
        </div>
      )}
    />
  );
};
