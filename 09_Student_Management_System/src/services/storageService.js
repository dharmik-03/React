const THEME_STORAGE_KEY = 'sms_theme_mode';

export const getStoredTheme = () => {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) || 'light';
  } catch {
    return 'light';
  }
};

export const setStoredTheme = (theme) => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (err) {
    void err;
  }
};
