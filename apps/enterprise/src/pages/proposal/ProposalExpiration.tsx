import { Text } from 'lib/ui/Text';
import { getExpirationMessage } from 'utils';
import { useCurrentProposal } from './CurrentProposalProvider';

const NANO_SECOND_IN_MILLISECOND = 1000000;

export const ProposalExpiration = () => {
  const { expires } = useCurrentProposal();

  if ('at_time' in expires) {
    const expirationDate = new Date(Number(expires.at_time) / NANO_SECOND_IN_MILLISECOND);

    return (
      <Text size={14} color="supporting">
        {getExpirationMessage(expirationDate)}
      </Text>
    );
  }

  return null;
};
