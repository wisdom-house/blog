'use client';

import { useTheme } from 'next-themes';

import SvgIcon from '../icon';
import Popover from '../popover';
import { IconName } from '@/types/icon.type';
import { useState } from 'react';
import { cn } from '@/lib/classnameMerge';

const themes = [
  {
    icon: 'monitor-smartphone',
    label: 'system',
  },
  {
    icon: 'moon',
    label: 'dark',
  },
  {
    icon: 'sun',
    label: 'light',
  },
];

const themeIconMapping: Record<string, IconName> = {
  light: 'sun',
  dark: 'moon',
  system: 'monitor-smartphone',
};

interface IThemeToggleProps {
  hideOnDesktop?: boolean;
  hideOnMobile?: boolean;
}

const ThemeToggler = ({ hideOnDesktop, hideOnMobile }: IThemeToggleProps) => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  console.log('first', themes);

  return (
    <Popover
      onOpenChange={(open) => setIsOpen(open)}
      trigger={
        <button
          aria-label="theme toggler"
          className="flex items-end justify-center gap-2 text-app-text group rounded-1/2"
        >
          <SvgIcon
            name={themeIconMapping[theme ?? 'light']}
            className="w-6 h-6"
          />
          <SvgIcon
            name={'chevron-right'}
            className={cn('w-3 h-3 rotate-90', isOpen && '-rotate-90')}
          />
        </button>
      }
      sideOffset={20}
      align="start"
      collisionPadding={10}
    >
      {(close) => (
        <div
          className={cn(
            'bg-app-background rounded border w-40 shadow-lg z-5 overflow-hidden',
            hideOnDesktop && 'lmd:hidden',
            hideOnMobile && 'hidden lmd:block'
          )}
        >
          {themes.map((t) => (
            <button
              key={t.label}
              className="flex gap-3 items-center p-2 px-4 w-full capitalize [&:not(:last-of-type)]:border-b"
              onClick={() => {
                setTheme(t.label);
                close();
              }}
            >
              <SvgIcon name={t.icon as IconName} className="w-4 h-4" />

              <p>{t.label}</p>
            </button>
          ))}
        </div>
      )}
    </Popover>
  );
};

export default ThemeToggler;
