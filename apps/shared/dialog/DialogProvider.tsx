import { ReactNode, createContext, useContext, useMemo, useState, useCallback } from 'react';

type PushDialog = ReactNode | ((dialogs: ReactNode[]) => ReactNode);

interface DialogContextValue {
  pushDialog: (modal: PushDialog) => void;
  popDialog: () => void;
  dialogs: ReactNode[];
  popAllDialogs: () => void;
}

const DialogContext = createContext<DialogContextValue | undefined>(undefined);

const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw Error('The DialogContext has not been defined.');
  }
  return context;
};

interface DialogProviderProps {
  children: ReactNode;
}

const DialogProvider = (props: DialogProviderProps) => {
  const { children } = props;

  const [dialogs, setDialogs] = useState<ReactNode[]>([]);

  const pushDialog = useCallback(
    (param: PushDialog) => {
      setDialogs((previous) => {
        const modal = typeof param === 'function' ? param(previous) : param;
        return [...previous, modal];
      });
    },
    [setDialogs]
  );

  const popDialog = useCallback(() => {
    setDialogs((previous) => previous.slice(0, previous.length - 1));
  }, [setDialogs]);

  const popAllDialogs = useCallback(() => {
    setDialogs([]);
  }, [setDialogs]);

  const value = useMemo(() => {
    return {
      pushDialog,
      popDialog,
      dialogs,
      popAllDialogs,
    };
  }, [pushDialog, popDialog, dialogs, popAllDialogs]);

  return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>;
};

export { DialogProvider, useDialogContext };
