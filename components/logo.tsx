import Image from 'next/image';
import Link from 'next/link';

import { routes } from '@/lib/routes';

interface LogoProps {
  leftTop?: boolean;
}

const Logo = ({ leftTop }: LogoProps) => {
  return (
    <Link href={routes.home()}>
      <div className="relative w-[150px] md:w-[200px] h-10 sm:h-[60px]">
        <Image
          src="/assets/logo-ii.png"
          alt="wisdom house logo"
          fill
          sizes="100%"
          className={`object-contain ${leftTop && 'object-left-top'} `}
        />
      </div>
    </Link>
  );
};

export default Logo;
