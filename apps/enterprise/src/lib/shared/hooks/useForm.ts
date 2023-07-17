import { Dispatch, useCallback, useEffect, useMemo } from 'react';
import { createReducer } from 'react-use';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';

export type FormInput<Input> = (input: Partial<Input>) => void;

type FormAction<State> = Partial<State>;

type FormDispatch<State> = ThunkDispatch<State, any, FormAction<State>>;

type FormThunkAction<State> = ThunkAction<Promise<void>, State, any, FormAction<State>>;

type ValidFieldsSet<T extends {}> = `${Extract<keyof T, string>}Valid`;
type ErrorFieldsSet<T extends {}> = `${Extract<keyof T, string>}Error`;

type ErrorFields<T extends {}> = {
  [k in ErrorFieldsSet<T>]: string;
};

type ValidFields<T extends {}> = {
  [k in ValidFieldsSet<T>]: boolean;
};

export type FormState<T extends {}> = T & Partial<ErrorFields<T>> & Partial<ValidFields<T>>;

export type FormModifier<State> = (state: Partial<State>) => State;

export type FormFunction<Input, State> = (
  input: Partial<Input>,
  getState: () => State,
  modifier: FormModifier<State>
) => Promise<void>;

export type FormInitializer<State> = (state: State, modifier: FormModifier<State>) => Promise<void>;

const reducer = <State>(state: State, action: FormAction<State>) => {
  return {
    ...state,
    ...action,
  };
};

function useForm<Input extends {}, State extends {}>(
  form: FormFunction<Input, State>,
  initialState: State,
  initializer?: FormInitializer<State>
): [FormInput<Input>, State, Dispatch<Partial<State>>] {
  const useReducer = useMemo(() => {
    return createReducer<FormAction<State>, State>(thunk);
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);

  const thunkDispatch = dispatch as FormDispatch<State>;

  const update = useCallback(
    async (input: Partial<Input>) => {
      const handler = (input: Partial<Input>): FormThunkAction<State> => {
        return (dispatch, getState) => {
          return form(input, getState, (s) => {
            dispatch(s);
            return getState();
          });
        };
      };

      thunkDispatch(handler(input));
    },
    [form, thunkDispatch]
  );

  useEffect(
    () => {
      if (initializer) {
        thunkDispatch((dispatch, getState) => {
          initializer(getState(), dispatch);
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [thunkDispatch]
  );

  return [update, state, dispatch];
}

export { useForm };

export function isFormStateValid<T extends {}>(formState: FormState<T>): boolean {
  return Object.entries(formState).every(([key, value]) => {
    const isErrorField = key.endsWith('Error');
    if (!isErrorField) {
      return true;
    }

    return isErrorField && !value;
  });
}
