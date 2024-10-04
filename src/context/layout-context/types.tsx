export interface LayoutContextType {
  useDarkTheme: boolean;
  setUseDarkTheme(arg: boolean): void;
}

export enum LayoutActions {
  setUseDarkTheme = "setUseDarkTheme",
}

export type LayoutActionType = {
  type: LayoutActions.setUseDarkTheme;
  value: boolean;
};
