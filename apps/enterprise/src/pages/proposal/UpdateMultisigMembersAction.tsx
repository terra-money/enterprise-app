import { getRecord } from '@terra-money/apps/utils';
import { Address } from 'components/address';
import { Text } from 'components/primitives';
import { ValueDiff } from 'components/value-diff';
import { useCurrentDaoMultisigMembers } from 'pages/create-proposal/multisig-members/CurrentDAOMultisigMembersProvider';
import { useCurrentProposal } from './CurrentProposalProvider';
import styles from './UpdateMultisigMembersAction.module.sass';
import { ReactComponent as MinusIcon } from 'components/assets/Minus.svg';
import { ReactComponent as PlusIcon } from 'components/assets/Plus.svg';
import classNames from 'classnames';
import { HStack, VStack } from 'lib/ui/Stack';
import { Panel } from 'lib/ui/Panel/Panel';
import { SameWidthChildrenRow } from 'lib/ui/Layout/SameWidthChildrenRow';

// TODO: highlight what members will be added and removed
export const UpdateMultisigMembersAction = () => {
  const { proposal_actions } = useCurrentProposal();
  const currentMembers = useCurrentDaoMultisigMembers();
  const currentMembersRecord = getRecord(currentMembers, (member) => member.addr);

  const action = proposal_actions.find((action) => 'modify_multisig_membership' in action);
  if (!action) return null;

  const updateMembersAction = 'modify_multisig_membership' in action ? action.modify_multisig_membership : undefined;
  if (!updateMembersAction) return null;

  return (
    <VStack gap={24}>
      <Text variant="heading4">Update members</Text>
      <SameWidthChildrenRow gap={20} minChildrenWidth={320} maxColumns={2}>
        {updateMembersAction.edit_members.map(({ address, weight }) => {
          const renderChange = () => {
            if (weight === '0') {
              return (
                <div className={styles.icon}>
                  <MinusIcon className={styles.remove} />
                </div>
              );
            }

            const currentMember = currentMembersRecord[address];
            if (currentMember === undefined) {
              return (
                <>
                  <Text variant="text">{weight}</Text>
                  <div className={classNames(styles.icon, styles.add)}>
                    <PlusIcon />
                  </div>
                </>
              );
            }

            return <ValueDiff oldValue={currentMember.weight.toString()} newValue={weight} />;
          };
          return (
            <Panel>
              <HStack fullWidth justifyContent="space-between" style={{ minHeight: 40 }} alignItems="center" gap={20}>
                <Address address={address} />
                {renderChange()}
              </HStack>
            </Panel>
          );
        })}
      </SameWidthChildrenRow>
    </VStack>
  );
};
