import { createContext, Dispatch, useContext, useEffect, useReducer } from 'react';
import { Favourite } from './types';
import { useMyAddress } from 'chain/hooks/useMyAddress';
import { ComponentWithChildrenProps } from 'lib/shared/props';
import { NetworkName, useNetworkName } from 'chain/hooks/useNetworkName';

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

interface PersonalizationProviderProps extends ComponentWithChildrenProps {}

const createStorageKey = (networkName: NetworkName, address?: string) => {
  const parts = ['__personalization', networkName];

  if (address) {
    parts.push(address);
  }

  return parts.join('_');
};

export const PersonalizationProvider = (props: PersonalizationProviderProps) => {
  const { children } = props;

  const networkName = useNetworkName();
  const myAddress = useMyAddress();

  const storageKey = createStorageKey(networkName, myAddress);

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
