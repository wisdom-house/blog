'use client';

import { useTheme } from 'next-themes';

import SvgIcon from '../icon';

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      aria-label="theme toggler"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex items-center justify-center text-app-text rounded-"
    >
      <SvgIcon name={theme === 'dark' ? 'sun' : 'moon'} className="w-6 h-6" />
    </button>
  );
};

export default ThemeToggler;
