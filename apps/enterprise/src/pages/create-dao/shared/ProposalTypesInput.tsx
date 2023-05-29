import { forwardRef, ForwardedRef } from 'react';
import { without } from 'lib/shared/utils/without';
import { FixedOptionsInput } from 'lib/ui/inputs/Combobox/FixedOptionsInput';
import { SelectedOption } from 'lib/ui/inputs/Select/SelectedOption';
import { HStack, VStack } from 'lib/ui/Stack';

export const councilProposalActionTypes = [
  'update_metadata',
  'update_asset_whitelist',
  'update_nft_whitelist',
  'upgrade_dao',
] as const;

export type CouncilProposalActionType = (typeof councilProposalActionTypes)[number];

export const councilProposalActionTypeName: Record<CouncilProposalActionType, string> = {
  update_metadata: 'Update metadata',
  update_asset_whitelist: 'Update asset whitelist',
  update_nft_whitelist: 'Update NFT whitelist',
  upgrade_dao: 'Upgrade DAO',
} as const;

interface Props {
  value: CouncilProposalActionType[];
  onChange: (value: CouncilProposalActionType[]) => void;
  error?: string;
}

const label = 'Allowed proposal types';

export const ProposalTypesInput = forwardRef(function InnerCollectionsInput(
  { value, onChange, error }: Props,
  ref: ForwardedRef<HTMLInputElement | null>
) {
  const handlAdd = (proposalType: CouncilProposalActionType) => {
    onChange([...value, proposalType]);
  };

  const handleRemove = (proposalType: CouncilProposalActionType) => {
    onChange(value.filter((v) => v !== proposalType));
  };

  return (
    <VStack>
      <FixedOptionsInput
        label={label}
        placeholder="select a proposal type"
        value={null}
        ref={ref}
        onChange={(value) => {
          if (value) {
            handlAdd(value);
          }
        }}
        error={error}
        optionToString={(option) => councilProposalActionTypeName[option]}
        options={without(councilProposalActionTypes, value)}
        clearAfterOptionSelected
      />
      <HStack gap={8} wrap="wrap">
        {value.map((type) => {
          return (
            <SelectedOption
              key={type}
              value={councilProposalActionTypeName[type]}
              onRemove={() => handleRemove(type)}
            />
          );
        })}
      </HStack>
    </VStack>
  );
});
