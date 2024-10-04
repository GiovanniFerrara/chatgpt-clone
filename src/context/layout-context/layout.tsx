import { useCallback, createContext, FC, useMemo, useReducer } from "react";
import { getUserDarkThemePreference } from "../../utils/get-user-dark-theme-preferences";

export const LayoutContext = createContext<LayoutContextType | undefined>(
  undefined
);

LayoutContext.displayName = "LayoutContext";

const initialState = {
  useDarkTheme: getUserDarkThemePreference(),
};

interface LayoutState {
  useDarkTheme: boolean;
}

enum LayoutActions {
  setUseDarkTheme = "setUseDarkTheme",
}

type LayoutActionType = {
  type: LayoutActions.setUseDarkTheme;
  value: boolean;
};

const layoutReducer = (state: LayoutState, action: LayoutActionType) => {
  switch (action.type) {
    case LayoutActions.setUseDarkTheme: {
      return { ...state, useDarkTheme: action.value };
    }
  }
};

interface LayoutContextType {
  useDarkTheme: boolean;
  setUseDarkTheme(arg: boolean): void;
}

const LayoutProvider: FC<{ children: JSX.Element }> = ({ children }) => {
  const [layoutState, dispatch] = useReducer(layoutReducer, initialState);

  const setUseDarkTheme = useCallback((value: boolean) => {
    dispatch({ value, type: LayoutActions.setUseDarkTheme });
  }, []);

  const value = useMemo(
    () => ({
      useDarkTheme: layoutState.useDarkTheme,
      setUseDarkTheme,
    }),
    [layoutState.useDarkTheme, setUseDarkTheme]
  );

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

export default LayoutProvider;
