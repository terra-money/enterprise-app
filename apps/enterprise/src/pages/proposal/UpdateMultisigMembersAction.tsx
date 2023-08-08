import { getRecord } from 'lib/shared/utils/getRecord';
import { Text } from 'lib/ui/Text';
import { ValueDiff } from 'components/value-diff';
import { useCurrentDaoMultisigMembers } from 'pages/create-proposal/multisig-members/CurrentDAOMultisigMembersProvider';
import { ReactComponent as MinusIcon } from 'components/assets/Minus.svg';
import { ReactComponent as PlusIcon } from 'components/assets/Plus.svg';
import { HStack, VStack } from 'lib/ui/Stack';
import { Panel } from 'lib/ui/Panel/Panel';
import { SameWidthChildrenRow } from 'lib/ui/Layout/SameWidthChildrenRow';
import { useCurrentProposalAction } from 'dao/components/CurrentProposalActionProvider';
import { enterprise } from 'types/contracts';
import { Address } from 'chain/components/Address';
import styled, { useTheme } from 'styled-components';
import { roundedCSS } from 'lib/ui/utils/roundedCSS';
import { getSameDimensionsCSS } from 'lib/ui/utils/getSameDimensionsCSS';
import { centerContentCSS } from 'lib/ui/utils/centerContentCSS';
import { getColor } from 'lib/ui/theme/getters';

const Icon = styled.div`
  ${roundedCSS};
  ${getSameDimensionsCSS(40)};
  ${centerContentCSS};
  background: ${getColor('mist')};
  font-size: 14px;
`;

// TODO: highlight what members will be added and removed
export const UpdateMultisigMembersAction = () => {
  const currentMembers = useCurrentDaoMultisigMembers();
  const currentMembersRecord = getRecord(currentMembers, (member) => member.addr);

  const { msg } = useCurrentProposalAction() as { msg: enterprise.ModifyMultisigMembershipMsg };

  const { colors } = useTheme();

  return (
    <VStack gap={24}>
      <Text weight="semibold">Update members</Text>
      <SameWidthChildrenRow gap={20} minChildrenWidth={320} maxColumns={2}>
        {msg.edit_members.map(({ address, weight }) => {
          const renderChange = () => {
            if (weight === '0') {
              return (
                <Icon style={{ color: colors.alert.toCssValue() }}>
                  <MinusIcon />
                </Icon>
              );
            }

            const currentMember = currentMembersRecord[address];
            if (currentMember === undefined) {
              return (
                <>
                  <Text size={14} color="supporting">
                    {weight}
                  </Text>
                  <Icon style={{ color: colors.success.toCssValue() }}>
                    <PlusIcon />
                  </Icon>
                </>
              );
            }

            return <ValueDiff oldValue={currentMember.weight.toString()} newValue={weight} />;
          };
          return (
            <Panel>
              <HStack fullWidth justifyContent="space-between" style={{ minHeight: 40 }} alignItems="center" gap={20}>
                <Address value={address} />
                {renderChange()}
              </HStack>
            </Panel>
          );
        })}
      </SameWidthChildrenRow>
    </VStack>
  );
};
