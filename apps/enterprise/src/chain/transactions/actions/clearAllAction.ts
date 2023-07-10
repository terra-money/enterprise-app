import { ActionType, TxThunkAction } from ".";

const clearAllAction = (): TxThunkAction => {
  return (dispatch) => {
    dispatch({
      type: ActionType.ClearAll,
    });
  };
};

export { clearAllAction };
