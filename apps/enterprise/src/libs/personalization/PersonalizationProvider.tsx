import { UIElementProps } from '@terra-money/apps/components';
import { ConnectedWallet, useConnectedWallet, NetworkInfo, useWallet } from '@terra-money/wallet-provider';
import { createContext, Dispatch, useContext, useEffect, useReducer } from 'react';
import { Favourite } from './types';

interface PersonalizationState {
  favourites: Array<Favourite>;
}

type ReloadAction = {
  type: 'RELOAD';
  payload: PersonalizationState;
};

type AddFavouriteAction = {
  type: 'ADD_FAVOURITE';
  payload: Favourite;
};

type RemoveFavouriteAction = {
  type: 'REMOVE_FAVOURITE';
  payload: string;
};

type PersonalizationActions = ReloadAction | AddFavouriteAction | RemoveFavouriteAction;

type PersonalizationContextType = [PersonalizationState, Dispatch<PersonalizationActions>];

const PersonalizationContext = createContext<PersonalizationContextType | undefined>(undefined);

const personalizationReducer = (state: PersonalizationState, action: PersonalizationActions): PersonalizationState => {
  switch (action.type) {
    case 'RELOAD':
      return { ...action.payload };
    case 'ADD_FAVOURITE':
      return {
        ...state,
        favourites: [...state.favourites, action.payload],
      };
    case 'REMOVE_FAVOURITE':
      return {
        ...state,
        favourites: state.favourites.filter((f) => f.address !== action.payload),
      };
  }
};

const initialValue: PersonalizationState = {
  favourites: [],
};

export const usePersonalization = () => {
  const context = useContext(PersonalizationContext);
  if (context === undefined) {
    throw new Error('The PersonalizationContext has not been defined.');
  }
  return context;
};

interface PersonalizationProviderProps extends UIElementProps {}

const createStorageKey = (network: NetworkInfo, connectedWallet?: ConnectedWallet) => {
  const parts = ['__personalization', network.name];

  if (connectedWallet) {
    parts.push(connectedWallet.walletAddress);
  }

  return parts.join('_');
};

export const PersonalizationProvider = (props: PersonalizationProviderProps) => {
  const { children } = props;

  const { network } = useWallet();

  const connectedWallet = useConnectedWallet();

  const storageKey = createStorageKey(network, connectedWallet);

  const value = useReducer(personalizationReducer, initialValue, (initial) => {
    const storage = localStorage.getItem(storageKey);
    return storage !== null ? JSON.parse(storage) : initial;
  });

  const [state, dispatch] = value;

  useEffect(() => {
    const storage = localStorage.getItem(storageKey);
    const payload: PersonalizationState = storage !== null ? JSON.parse(storage) : initialValue;
    dispatch({ type: 'RELOAD', payload });
  }, [storageKey, dispatch]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state, storageKey]);

  return <PersonalizationContext.Provider value={value}>{children}</PersonalizationContext.Provider>;
};
