import React, { ReactNode } from 'react';

interface IShowViewProps {
  when: boolean;
  children: ReactNode;
  fallback?: ReactNode | null;
}

const ShowView: React.FC<IShowViewProps> = ({
  when,
  children,
  fallback = null,
}) => {
  if (!when) return fallback;

  return <>{children}</>;
};

export default React.memo(ShowView);
