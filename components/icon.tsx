import { FC, SVGProps } from 'react';

import { IconName } from '@/types/icon.type';

interface ISvgProps extends SVGProps<SVGSVGElement> {
  name: IconName;
}

const SvgIcon: FC<ISvgProps> = ({ name, ...props }) => {
  return (
    <svg fill="currentColor" {...props}>
      <use xlinkHref={`/assets/sprite.svg#${name}`} />
    </svg>
  );
};

export default SvgIcon;
