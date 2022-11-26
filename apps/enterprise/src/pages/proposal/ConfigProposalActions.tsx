import { useCurrentProposal } from './CurrentProposalProvider';
import styles from './ConfigProposalActions.module.sass';
import { Text } from 'components/primitives';
import * as govConfigView from './helpers/govConfigView';
import * as metadataView from './helpers/metadataView';

import { ProposalActionDiff } from './ProposalActionDiff';
import { useCW20TokenInfoQuery } from 'queries';

export const ConfigProposalActions = () => {
  const { proposal_actions, dao } = useCurrentProposal();
  const { data: token } = useCW20TokenInfoQuery(dao.membershipContractAddress, { enabled: dao.type === 'token' });

  return (
    <div className={styles.root}>
      <Text variant="text">DAO configuration changed values:</Text>
      <div className={styles.root}>
        {proposal_actions.map((action, index) => {
          if ('update_gov_config' in action) {
            return (
              <ProposalActionDiff
                key={index}
                fieldNameRecord={govConfigView.govConfigViewFieldNameRecord}
                title="Gov Configuration"
                oldView={govConfigView.fromDao(dao, token?.decimals)}
                updatedFields={govConfigView.getUpdatedFields(action.update_gov_config, token?.decimals)}
              />
            );
          }

          if ('update_metadata' in action) {
            return (
              <ProposalActionDiff
                key={index}
                fieldNameRecord={metadataView.metadataViewFieldNameRecord}
                title="DAO Metadata"
                oldView={metadataView.fromDao(dao)}
                updatedFields={metadataView.getUpdatedFields(action.update_metadata)}
              />
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};
