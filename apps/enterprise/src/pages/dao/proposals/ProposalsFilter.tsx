import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';
import { ShyTextButton } from 'lib/ui/buttons/ShyTextButton';
import { Checkbox } from 'lib/ui/inputs/Checkbox/Checkbox';
import { Line } from 'lib/ui/Line';
import { OverlayMenu } from 'lib/ui/Menu/OverlayMenu';
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
    <OverlayMenu
      title="Display proposal types"
      content={
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
