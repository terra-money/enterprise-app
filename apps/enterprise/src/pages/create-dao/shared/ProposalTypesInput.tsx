import { enterprise_factory } from 'types/contracts';

import { forwardRef, ForwardedRef } from 'react';
import { without } from 'lib/shared/utils/without';
import { FixedOptionsInput } from 'lib/ui/inputs/Combobox/FixedOptionsInput';
import { SelectedOption } from 'lib/ui/inputs/Select/SelectedOption';
import { HStack, VStack } from 'lib/ui/Stack';

const proposalTypeName: Record<enterprise_factory.ProposalActionType, string> = {
  update_metadata: 'Update metadata',
  update_gov_config: 'Update governance config',
  update_council: 'Update council',
  update_asset_whitelist: 'Update asset whitelist',
  update_nft_whitelist: 'Update NFT whitelist',
  request_funding_from_dao: 'Request funding from DAO',
  upgrade_dao: 'Upgrade DAO',
  execute_msgs: 'Execute messages',
  modify_multisig_membership: 'Modify multisig membership',
};

export const proposalTypes = Object.keys(proposalTypeName) as enterprise_factory.ProposalActionType[];

interface Props {
  value: enterprise_factory.ProposalActionType[];
  onChange: (value: enterprise_factory.ProposalActionType[]) => void;
  error?: string;
}

const label = 'Allowed proposal types';

export const ProposalTypesInput = forwardRef(function InnerCollectionsInput(
  { value, onChange, error }: Props,
  ref: ForwardedRef<HTMLInputElement | null>
) {
  const handlAdd = (proposalType: enterprise_factory.ProposalActionType) => {
    onChange([...value, proposalType]);
  };

  const handleRemove = (proposalType: enterprise_factory.ProposalActionType) => {
    onChange(value.filter((v) => v !== proposalType));
  };

  return (
    <VStack>
      <FixedOptionsInput<enterprise_factory.ProposalActionType>
        label={label}
        placeholder="Select proposal type"
        value={null}
        ref={ref}
        onChange={(value) => {
          if (value) {
            handlAdd(value);
          }
        }}
        error={error}
        optionToString={(option) => proposalTypeName[option]}
        options={without(proposalTypes, value)}
        clearAfterOptionSelected
      />
      <HStack gap={8} wrap="wrap">
        {value.map((type) => {
          return <SelectedOption key={type} value={proposalTypeName[type]} onRemove={() => handleRemove(type)} />;
        })}
      </HStack>
    </VStack>
  );
});
