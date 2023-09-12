import Big from 'big.js';
import { FormFooter } from 'components/form-footer';
import { Text } from 'lib/ui/Text';
import { useNavigate } from 'react-router';

import { useCW20TokenInfoQuery } from 'queries';
import { Stack } from 'lib/ui/Stack';
import { fromChainAmount } from 'chain/utils/fromChainAmount';
import { formatAmount } from 'lib/shared/utils/formatAmount';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import styles from './CreateProposalFooter.module.sass';
import { useAssertMyAddress } from 'chain/hooks/useAssertMyAddress';
import { Line } from 'lib/ui/Line';
import { Spinner } from 'lib/ui/Spinner';
import { Button } from 'lib/ui/buttons/Button';
import { useAssetBalanceQury } from 'chain/queries/useAssetBalanceQuery';

interface DepositOverviewProps {
  minimumDeposit: Big;
  tokenAddress: string;
  balance: string;
  isBalanceLoading: boolean;
}

const DepositOverview = (props: DepositOverviewProps) => {
  const { minimumDeposit, tokenAddress, balance, isBalanceLoading } = props;

  const { data: token } = useCW20TokenInfoQuery(tokenAddress);

  return (
    <>
      <Line />
      <Stack className={styles.deposits} direction="row" gap={48}>
        <Stack direction="column" gap={8}>
          {token ? (
            <>
              <Text
                className={styles.heading}
                size={14}
                color="supporting"
              >{`Deposit required (${token.symbol})`}</Text>
              <Text weight="semibold">
                {formatAmount(fromChainAmount(Big(minimumDeposit).toNumber(), token.decimals), { decimals: 2 })}
              </Text>
            </>
          ) : (
            <>
              <Text className={styles.heading} size={14} color="supporting">
                Deposit required
              </Text>
              <Spinner />
            </>
          )}
        </Stack>
        <Stack direction="column" gap={8}>
          {isBalanceLoading || !token ? (
            <>
              <Text className={styles.heading} size={14} color="supporting">
                Your balance
              </Text>
              <Spinner />
            </>
          ) : (
            <>
              <Text className={styles.heading} size={14} color="supporting">
                {`Your balance (${token.symbol})`}
              </Text>
              <Text color={Big(balance).gte(minimumDeposit) ? 'regular' : 'alert'} weight="semibold">
                {formatAmount(fromChainAmount(Big(balance).toNumber(), token.decimals), { decimals: 2 })}
              </Text>
            </>
          )}
        </Stack>
      </Stack>
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

  const { data: balance = '0', isLoading: isBalanceLoading } = useAssetBalanceQury({
    address: myAddress,
    asset: {
      type: 'cw20',
      id: tokenAddress,
    },
  });

  const isSubmitDisabled = disabled || (isDepositRequired && (!balance || Big(balance).lt(minimumDeposit)));
  const buttonTooltipMessage = (isDepositRequired && (!balance || Big(balance).lt(minimumDeposit))) ? "Insufficient balance to create proposal" : "Please fill in all relevant fields";

  return (
    <Stack className={styles.root} direction="column">
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
          <Button isDisabled={isSubmitDisabled ? buttonTooltipMessage : false} loading={loading || isBalanceLoading} onClick={onSubmit}>
            Create
          </Button>
        }
        secondary={
          <Button kind="secondary" onClick={() => navigate(`/dao/${dao.address}/proposals`)}>
            Cancel
          </Button>
        }
      />
    </Stack>
  );
};
