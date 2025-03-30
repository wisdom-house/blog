'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import SvgIcon from './icon';
import Logo from './logo';
import Search from './search';
import ShowView from './show-view';

import { cn } from '@/lib/classnameMerge';
import { routes } from '@/lib/routes';

const ThemeToggler = dynamic(
  () => import('@/components/buttons/toggle-theme'),
  { ssr: false }
);

const navItems = [
  {
    label: 'Home',
    route: routes.home(),
  },
  {
    label: 'About Us',
    route: routes.about(),
  },
  {
    label: 'Contact',
    route: routes.contact(),
  },
  {
    label: 'Charity',
    route: routes.charity(),
    newTab: true,
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
    <header className="sticky top-0 left-0 w-full backdrop-blur-3xl shadow-lg bg-app-foreground z-10 py-2 lg:pb-0">
      <nav className="app-padding flex w-full justify-between items-center">
        <Logo leftTop />

        <div className="flex flex-1 items-center justify-end gap-5">
          <ShowView when={isOpen}>
            <div
              className="fixed h-lvh w-screen bg-primary/[.3] top-0 left-0 lg:hidden z-10 "
              onClick={handleIsOpen}
            />
          </ShowView>

          <Search isDesktop />

          <div
            className={cn(
              `flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 w-0 overflow-hidden max-w-[500px] bg-app-foreground lg:w-max fixed h-lvh lg:h-auto top-0 left-0 lg:relative max-lg:p-5 lg:p-[auto] lg:translate-x-0 z-20 transition-transform `,
              isOpen ? 'translate-x-0 w-full' : 'translate-x-[-100%]'
            )}
          >
            <button
              className="flex lg:hidden mb-10 ml-auto"
              onClick={handleIsOpen}
            >
              <SvgIcon name="close" className="w-6 h-6" />
            </button>

            <ThemeToggler showOnDesktop />

            <ul className="flex flex-col lg:flex-row lg:gap-10 mb-10 lg:m-0 lg:items-center  lg:justify-center ">
              {navItems.map((item, index) => (
                <li
                  key={index}
                  className="border-b lg:border-none mt-1 lg:mb-0 pt-4 lg:pt-0 pb-5 lg:pb-0"
                >
                  <Link
                    href={item.route}
                    className={cn(
                      'hover:border-primary border-b',
                      `${isActive(item.route) && 'text-primary font-medium hover:!text-primary'}`
                    )}
                    target={item.newTab ? '_blank' : ''}
                  >
                    <p>{item.label}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex  items-center gap-3 lg:hidden">
          <ThemeToggler />

          <Search />
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
