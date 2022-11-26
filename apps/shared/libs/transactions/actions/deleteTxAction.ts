import { ActionType, TxThunkAction } from ".";

const deleteTxAction = (txHash: string): TxThunkAction => {
  return (dispatch) => {
    dispatch({
      type: ActionType.Delete,
      payload: {
        txHash,
      },
    });
  };
};

export { deleteTxAction };
