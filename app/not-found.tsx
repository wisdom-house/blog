// pages/404.tsx
import Footer from '@/components/footer';
import Header from '@/components/header';
import { routes } from '@/lib/routes';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <>
      <Header />

      <div className="flex section-padding relative max-w-[1200px] mx-auto flex-col items-center justify-center min-h-[80vh] px-6 text-app-text">
        <div className="max-w-md text-center">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
          <p className="mt-2 text-app-text">
            Oops! The page you are looking for does not exist or has been moved.
          </p>
          <div className="mt-6">
            <Link
              href={routes.home()}
              className="px-4 py-2 text-white bg-primary rounded-md hover:bg-primary/70 focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
        <div className="absolute w-full aspect-video top-[50%] translate-y-[-50%] -z-1">
          <div className="relative w-full aspect-video [&>img]:object-contain">
            <Image
              src="/assets/404.png"
              alt="error 404"
              fill
              className="object-cover opacity-100 dark:opacity-25 mix-blend-saturation"
              sizes="100%"
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
