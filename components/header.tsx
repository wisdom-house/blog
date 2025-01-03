'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import SvgIcon from './icon';
import Logo from './logo';
import Popover from './popover';
import Search from './search';
import ShowView from './show-view';

import { cn } from '@/lib/classnameMerge';

const ThemeToggler = dynamic(
  () => import('@/components/buttons/toggle-theme'),
  { ssr: false }
);

const navItems = [
  {
    label: 'About Us',
    route: '#',
  },
  {
    label: 'Contact',
    route: '#',
  },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const isActive = (route: string) => {
    return route === '/' ? pathname === route : pathname.startsWith(route);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'revert';
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 w-screen backdrop-blur-3xl shadow-lg bg-app-foreground lg:h-[100px] z-5 py-2 lmd:pb-0">
      <nav className="app-padding flex justify-between items-center">
        <Logo />

        <ShowView when={isOpen}>
          <div
            className="fixed h-lvh w-full bg-primary/[.3] top-0 left-0 lmd:hidden z-10 "
            onClick={handleIsOpen}
          />
        </ShowView>

        <div
          className={`flex flex-col flex-1 lmd:flex-row lmd:justify-between lmd:items-center gap-6 w-[90%] bg-app-foreground lmd:w-max fixed h-lvh lmd:h-auto top-0 right-0 lmd:relative p-5 lmd:p-[auto] ${isOpen ? 'translate-x-0 bg-whi' : 'translate-x-[100%]'} lmd:translate-x-0 z-20 transition-transform `}
        >
          <button className="flex lmd:hidden mb-10" onClick={handleIsOpen}>
            <SvgIcon name="close" className="w-6 h-6" />
          </button>

          <div className="hidden lmd:flex max-w-[600px] items-center ml-auto gap-10 justify-self-end flex-1">
            <Search iconButton />

            <ThemeToggler />
          </div>

          <ul className="flex flex-col lmd:flex-row lmd:gap-10 mb-10 lmd:m-0 lmd:items-center  lmd:justify-center ">
            {navItems.map((item, index) => (
              <li
                key={index}
                className="border-b lmd:border-none mt-1 lmd:mb-0 pt-4 lmd:pt-0 pb-5 lmd:pb-0"
              >
                <Link
                  href={item.route}
                  className={cn(
                    'hover:border-primary border-b',
                    `${isActive(item.route) && 'text-primary font-medium hover:!text-primary'}`
                  )}
                >
                  <p>{item.label}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-3 lmd:hidden">
          <ThemeToggler />

          <Popover
            trigger={
              <button className="block lmd:hidden" aria-label="search blog">
                <SvgIcon name="search" className="w-6 h-6" />
              </button>
            }
            sideOffset={25}
            align="end"
          >
            <div className="w-screen  p-5 xs:min-w-[300px] max-w-[500px] lmd:hidden rounded-4 bg-white border">
              <Search />
            </div>
          </Popover>

          <button
            className=" text-primary"
            aria-label="Open mobile menu"
            onClick={handleIsOpen}
          >
            <SvgIcon name="menu" className="w-8 h-8" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
