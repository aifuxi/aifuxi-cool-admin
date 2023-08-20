import { useEffect } from 'react';

import { Button } from '@arco-design/web-react';

import { STORAGE_KEY } from '@/constants/storage';
import { IconMoonFogBoldDuotone, IconSunFogBoldDuotone } from '@/icons';
import { cn } from '@/utils/helper';

export const ThemeSwitcher = ({ className }: { className?: string }) => {
  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.getItem(STORAGE_KEY.ARCO_THEME) === 'dark' ||
      (!(STORAGE_KEY.ARCO_THEME in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.body.setAttribute(STORAGE_KEY.ARCO_THEME, 'dark');
    } else {
      document.body.removeAttribute(STORAGE_KEY.ARCO_THEME);
    }
  }, []);

  const handleChangeTheme = () => {
    // if set via local storage previously
    if (localStorage.getItem(STORAGE_KEY.ARCO_THEME)) {
      if (localStorage.getItem(STORAGE_KEY.ARCO_THEME) === 'light') {
        document.body.setAttribute(STORAGE_KEY.ARCO_THEME, 'dark');
        localStorage.setItem(STORAGE_KEY.ARCO_THEME, 'dark');
      } else {
        document.body.removeAttribute(STORAGE_KEY.ARCO_THEME);
        localStorage.setItem(STORAGE_KEY.ARCO_THEME, 'light');
      }

      // if NOT set via local storage previously
    } else {
      if (document.documentElement.classList.contains('dark')) {
        document.body.removeAttribute(STORAGE_KEY.ARCO_THEME);
        localStorage.setItem(STORAGE_KEY.ARCO_THEME, 'light');
      } else {
        document.body.setAttribute(STORAGE_KEY.ARCO_THEME, 'dark');
        localStorage.setItem(STORAGE_KEY.ARCO_THEME, 'dark');
      }
    }
  };

  return (
    <>
      <Button
        className={cn('mr-4 hidden dark:inline-block', className)}
        size="large"
        icon={<IconSunFogBoldDuotone />}
        onClick={handleChangeTheme}
      ></Button>
      <Button
        className={cn('mr-4 dark:hidden', className)}
        size="large"
        icon={<IconMoonFogBoldDuotone />}
        onClick={handleChangeTheme}
      ></Button>
    </>
  );
};
