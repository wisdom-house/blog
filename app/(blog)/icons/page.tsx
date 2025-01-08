import { Metadata } from 'next';

import IconsPage from '@/components/icons-page';

import { pageTitle } from '@/utils/pageTitle';
import { redirect } from 'next/navigation';
import { routes } from '@/lib/routes';

export const metadata: Metadata = {
  title: pageTitle('Icons'),
};

const Icons = () => {
  if (process.env.NODE_ENV === 'production') {
    redirect(routes.home());
  }

  return <IconsPage />;
};

export default Icons;
