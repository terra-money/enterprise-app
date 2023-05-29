import { useChainID, useContractAddress } from '@terra-money/apps/hooks';
import { useTx, TxBuilder } from '@terra-money/apps/libs/transactions';
import { enterprise_factory } from 'types/contracts';
import { TX_KEY } from './txKey';
import { useTxOverrides } from './useFeeOverrides';
import { useMyAddress } from 'chain/hooks/useMyAddress';
import { assertDefined } from '@terra-money/apps/utils';

export type CreateDaoMsgType = Extract<enterprise_factory.ExecuteMsg, { create_dao: {} }>;

export const useCreateDAOTx = () => {
  const contractAddress = useContractAddress('enterprise-factory');

  const txOverrides = useTxOverrides();

  const myAddress = useMyAddress();

  const chainID = useChainID();

  return useTx<CreateDaoMsgType>(
    ({ create_dao, wallet }) => {
      const tx = TxBuilder.new()
        .execute<enterprise_factory.ExecuteMsg>(assertDefined(myAddress), contractAddress, {
          create_dao,
        })
        .build();

      return {
        chainID,
        ...txOverrides,
        ...tx,
      };
    },
    {
      txKey: TX_KEY.CREATE_DAO,
    }
  );
};
