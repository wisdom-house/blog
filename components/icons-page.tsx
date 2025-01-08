'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import SvgIcon from './icon';
import { icons } from '@/types/icon.type';

const sortedIconNames = icons.sort();

const IconsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIcons = sortedIconNames.filter((icons) =>
    icons.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value).then(() => {
      toast.success(`Icon name has been copied`);
    });
  };

  return (
    <div className="bg-primary-50 app-padding py-10 xl:full-bleed">
      <div className="text-center">
        <h3 className="text-center text-2xl font-bold ">App Icons</h3>
        <p className="text-center italic mt-4">
          Click on any of icon to copy its name
        </p>
      </div>
      <div className=" flex justify-center w-full pt-8">
        <div className="flex justify-center gap-1 bg-white rounded-[100px] p-2 lg:min-h-[33px] border w-[40%]">
          <SvgIcon name="search" className="h-[20px] w-[20px] text-gray-400" />
          <input
            className=" bg-transparent focus:outline-0 focus:border-brand-gray-100 border-transparent pl-2 w-full"
            placeholder="Search Icon Names Here..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="flex flex-wrap py-10 min-h">
        {filteredIcons.map((icon, index) => (
          <button
            key={index}
            className="h-max w-40 flex flex-col items-center p-3 hover:scale-105"
            onClick={() => copyToClipboard(icon)}
            aria-label={icon + 'icon'}
          >
            <SvgIcon
              name={icon}
              color=""
              className="w-12 h-12 rounded-lg text-gray-600 p-1 text"
            />
            <p className="text-xs mt-2 font-bold">{icon}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default IconsPage;
