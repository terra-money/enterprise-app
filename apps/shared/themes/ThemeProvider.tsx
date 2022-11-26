import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

export enum Theme {
  Light = "light",
  Dark = "dark",
}

type ThemeContextType = [Theme, Dispatch<SetStateAction<Theme>>];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw Error("ThemeContext has not been defined.");
  }
  return context;
};

interface ThemeProvider {
  defaultTheme: Theme;
  children: ReactNode;
}

const ThemeProvider = (props: ThemeProvider) => {
  const { defaultTheme, children } = props;

  const state = useState(defaultTheme);

  return (
    <ThemeContext.Provider value={state}>{children}</ThemeContext.Provider>
  );
};

export { ThemeProvider, useTheme };
