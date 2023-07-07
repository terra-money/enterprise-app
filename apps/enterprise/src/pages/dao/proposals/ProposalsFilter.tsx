import { Button } from 'lib/ui/buttons/Button';
import { ShyTextButton } from 'lib/ui/buttons/ShyTextButton';
import { Checkbox } from 'lib/ui/inputs/Checkbox/Checkbox';
import { Line } from 'lib/ui/Line';
import { Menu } from 'lib/ui/Menu';
import { VStack } from 'lib/ui/Stack';
import { proposalStatuses, proposalStatusName } from 'proposal';
import { enterprise } from 'types/contracts';

interface ProposalsFilterProps {
  value: enterprise.ProposalStatus[];
  onChange: (value: enterprise.ProposalStatus[]) => void;
}

export const ProposalsFilter = ({ value, onChange }: ProposalsFilterProps) => {
  const areAllIncluded = proposalStatuses.every((status) => value.includes(status));

  return (
    <Menu
      title="Display proposal types"
      renderContent={() => (
        <VStack fullWidth alignItems="start" gap={12}>
          {proposalStatuses.map((daoType) => (
            <Checkbox
              label={proposalStatusName[daoType]}
              key={daoType}
              value={value.includes(daoType)}
              onChange={(shouldInclude) =>
                onChange(shouldInclude ? [...value, daoType] : value.filter((v) => v !== daoType))
              }
            />
          ))}
          {!areAllIncluded && (
            <>
              <Line />
              <ShyTextButton text="Reset filters" onClick={() => onChange(proposalStatuses)} />
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
