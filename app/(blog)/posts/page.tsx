import { routes } from '@/lib/routes';
import { redirect } from 'next/navigation';

const page = () => {
  redirect(routes.home());
  return null;
};

export default page;
