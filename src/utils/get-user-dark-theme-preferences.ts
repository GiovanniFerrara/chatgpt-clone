export const getUserDarkThemePreference = (): boolean => {
  if (typeof window !== 'undefined') {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  return true; 
};