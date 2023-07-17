import { useTx, TxBuilder } from 'chain/transactions';
import { enterprise_factory } from 'types/contracts';
import { TX_KEY } from './txKey';
import { useTxOverrides } from './useFeeOverrides';
import { useMyAddress } from 'chain/hooks/useMyAddress';
import { assertDefined } from 'lib/shared/utils/assertDefined';
import { useContractAddress } from 'chain/hooks/useContractAddress';
import { useChainID } from 'chain/hooks/useChainID';

export type CreateDaoMsgType = Extract<enterprise_factory.ExecuteMsg, { create_dao: {} }>;

export const useCreateDAOTx = () => {
  const contractAddress = useContractAddress('enterprise-factory');

  const txOverrides = useTxOverrides();

  const myAddress = useMyAddress();

  const chainID = useChainID();

  return useTx<CreateDaoMsgType>(
    ({ create_dao }) => {
      console.log(create_dao);
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
