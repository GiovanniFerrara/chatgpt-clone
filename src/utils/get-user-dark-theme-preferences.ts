export const getUserDarkThemePreference = (): boolean => {
  if (typeof window !== 'undefined') {
    console.log( window.matchMedia('(prefers-color-scheme: dark)'))
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  return true; 
};