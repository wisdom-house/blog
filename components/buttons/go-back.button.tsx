'use client';

import SvgIcon from '../icon';

const GoBackButton = () => {
  return (
    <button onClick={() => history.back()} className="flex items-center gap-2">
      <span className="w-fit h-fit p-2 aspect-square border disabled:opacity-50 rounded-full border-primary">
        <SvgIcon name="chevron-right" className="w-3 h-3 rotate-180" />
      </span>
      <span>Back</span>
    </button>
  );
};

export default GoBackButton;
