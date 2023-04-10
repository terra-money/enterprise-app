import Big from 'big.js';
import { FormFooter } from 'components/form-footer';
import { Button, Divider, Text, Throbber } from 'components/primitives';
import { useNavigate } from 'react-router';
import { u } from '@terra-money/apps/types';
import { useCW20BalanceQuery, useCW20TokenInfoQuery } from 'queries';
import { Container } from '@terra-money/apps/components';
import { demicrofy, formatAmount } from '@terra-money/apps/libs/formatting';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import styles from './CreateProposalFooter.module.sass';
import { useAssertMyAddress } from 'chain/hooks/useAssertMyAddress';

interface DepositOverviewProps {
  minimumDeposit: Big;
  tokenAddress: string;
  balance: u<Big>;
  isBalanceLoading: boolean;
}

const DepositOverview = (props: DepositOverviewProps) => {
  const { minimumDeposit, tokenAddress, balance, isBalanceLoading } = props;

  const { data: token } = useCW20TokenInfoQuery(tokenAddress);

  return (
    <>
      <Divider />
      <Container className={styles.deposits} direction="row" gap={48}>
        <Container direction="column" gap={8}>
          {token ? (
            <>
              <Text className={styles.heading} variant="text">{`Deposit required (${token.symbol})`}</Text>
              <Text variant="heading4">
                {formatAmount(demicrofy(Big(minimumDeposit) as u<Big>, token.decimals), { decimals: 2 })}
              </Text>
            </>
          ) : (
            <>
              <Text className={styles.heading} variant="text">
                Deposit required
              </Text>
              <Throbber />
            </>
          )}
        </Container>
        <Container direction="column" gap={8}>
          {isBalanceLoading || !token ? (
            <>
              <Text className={styles.heading} variant="text">
                Your balance
              </Text>
              <Throbber />
            </>
          ) : (
            <>
              <Text className={styles.heading} variant="text">
                {`Your balance (${token.symbol})`}
              </Text>
              <Text
                style={{
                  color: balance.gte(minimumDeposit) ? 'var(--text-color-error)' : 'var(--text-color-primary)',
                }}
                variant="heading4"
              >
                {formatAmount(demicrofy(balance, token.decimals), { decimals: 2 })}
              </Text>
            </>
          )}
        </Container>
      </Container>
    </>
  );
};

interface CreateProposalFooterProps {
  disabled: boolean;
  loading: boolean;
  onSubmit: () => void;
}

export const CreateProposalFooter = ({ disabled, loading, onSubmit }: CreateProposalFooterProps) => {
  const dao = useCurrentDao();

  const navigate = useNavigate();

  const minimumDeposit = Big(dao.gov_config.minimum_deposit ?? '0');

  const isDepositRequired = minimumDeposit.gt(0);

  const tokenAddress = dao.dao_membership_contract;

  const myAddress = useAssertMyAddress();

  const { data: balance = Big(0) as u<Big>, isLoading: isBalanceLoading } = useCW20BalanceQuery(
    myAddress,
    tokenAddress,
    {
      enabled: isDepositRequired,
    }
  );

  const isSubmitDisabled = disabled || (isDepositRequired && balance.lt(minimumDeposit));

  return (
    <Container className={styles.root} direction="column">
      {isDepositRequired && (
        <DepositOverview
          minimumDeposit={minimumDeposit}
          tokenAddress={tokenAddress}
          balance={balance}
          isBalanceLoading={isBalanceLoading}
        />
      )}
      <FormFooter
        primary={
          <Button
            variant="primary"
            disabled={isSubmitDisabled}
            loading={loading || isBalanceLoading}
            onClick={onSubmit}
          >
            Create
          </Button>
        }
        secondary={
          <Button variant="secondary" onClick={() => navigate(`/dao/${dao.address}/proposals`)}>
            Cancel
          </Button>
        }
      />
    </Container>
  );
};
