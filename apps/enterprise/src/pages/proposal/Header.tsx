import { Stack } from 'lib/ui/Stack';
import classNames from 'classnames';
import { Text as DeprecatedText } from 'components/primitives';
import { ProposalTags } from 'pages/shared/ProposalTags';
import { forwardRef, Ref } from 'react';
import { useNavigate } from 'react-router';
import { useCurrentProposal } from './CurrentProposalProvider';
import styles from './Header.module.sass';
import { DaoLogoLink } from 'components/dao-logo/DaoLogoLink';
import { Text } from 'lib/ui/Text';

interface HeaderProps {
  className?: string;
  compact?: boolean;
}

export const Header = forwardRef((props: HeaderProps, ref: Ref<HTMLDivElement>) => {
  const { className, compact = false } = props;

  const proposal = useCurrentProposal();

  const navigate = useNavigate();

  const title = (
    <DeprecatedText className={styles.name} variant="heading2">
      <Text style={{ marginRight: 8 }} as="span" color="shy">
        #{proposal.id}
      </Text>
      {proposal.title}
    </DeprecatedText>
  );

  if (compact) {
    return (
      <Stack direction="row" ref={ref} className={classNames(className, styles.root, styles.compact)}>
        <div className={styles.logo}>
          <DaoLogoLink address={proposal.dao.address} size="s" logo={proposal.dao.logo} />
        </div>
        {title}
        <ProposalTags proposal={proposal} />
      </Stack>
    );
  }

  return (
    <Stack ref={ref} className={classNames(className, styles.root)} direction="column">
      <Stack direction="row" className={styles.container}>
        <DeprecatedText className={styles.back} variant="link" onClick={() => navigate(-1)}>
          Back
        </DeprecatedText>
        <div className={styles.logo}>
          <DaoLogoLink address={proposal.dao.address} size="s" logo={proposal.dao.logo} />
        </div>
        {title}
        <ProposalTags proposal={proposal} />
      </Stack>
    </Stack>
  );
});
