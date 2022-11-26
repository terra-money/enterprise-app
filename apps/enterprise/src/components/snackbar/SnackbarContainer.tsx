import { SnackbarKey, SnackbarMessage } from 'notistack';
import { Ref, forwardRef, createContext, useContext } from 'react';
import styles from './SnackbarContainer.module.sass';

const SnackbarContainerContext = createContext<SnackbarKey | undefined>(undefined);

const useSnackbarKey = () => {
  const context = useContext(SnackbarContainerContext);
  if (context === undefined) {
    throw Error('The SnackbarContainer context has not been defined.');
  }
  return context;
};

interface SnackbarContainerProps {
  id: SnackbarKey;
  message: SnackbarMessage;
}

const SnackbarContainer = forwardRef((props: SnackbarContainerProps, ref: Ref<HTMLDivElement>) => {
  const { id, message } = props;

  return (
    <SnackbarContainerContext.Provider value={id}>
      <div ref={ref} className={styles.root}>
        {message}
      </div>
    </SnackbarContainerContext.Provider>
  );
});

export { SnackbarContainer, useSnackbarKey };
