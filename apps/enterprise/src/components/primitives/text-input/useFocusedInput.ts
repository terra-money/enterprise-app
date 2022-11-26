import { useCallback, useState } from 'react';

type Callback = React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;

export const useFocusedInput = () => {
  const [focused, setFocused] = useState(false);

  const onFocus = useCallback<Callback>(() => {
    setFocused(true);
  }, [setFocused]);

  const onBlur = useCallback<Callback>(() => {
    setFocused(false);
  }, [setFocused]);

  return {
    onFocus,
    onBlur,
    focused,
  };
};
