import { Address } from 'components/address';
import { Text } from 'components/primitives';
import { HStack } from 'lib/ui/Stack';
import { useCurrentProposal } from './CurrentProposalProvider';
import styles from './UpdateAssetsWhitelistAction.module.sass';

export const UpdateNFTsWhitelistAction = () => {
  const { proposal_actions } = useCurrentProposal();

  const action = proposal_actions.find((action) => 'update_nft_whitelist' in action);
  if (!action) return null;

  const updateNFTsAction = 'update_nft_whitelist' in action ? action.update_nft_whitelist : undefined;
  if (!updateNFTsAction) return null;

  return (
    <div className={styles.root}>
      {Object.entries(updateNFTsAction).map(([action, nfts]) => {
        if (!nfts.length) return null;

        return (
          <div key={action} className={styles.section}>
            <Text variant="heading4">Whitelisted NFTs to {action}</Text>
            <HStack gap={16} wrap="wrap">
              {(nfts as string[]).map((nft, index) => (
                <Address truncation="none" address={nft} />
              ))}
            </HStack>
          </div>
        );
      })}
    </div>
  );
};
