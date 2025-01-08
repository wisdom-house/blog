import Image from 'next/image';
import React from 'react';
import { Button } from '../buttons/button';

const NoAdvertCard = () => {
  return (
    <div className="grid place-items-center p-6 relative aspect-video lmd:aspect-square group">
      <Image
        src={`https://picsum.photos/1900/1111`}
        alt="advertise here"
        sizes="100%"
        fill
        className="object-cover absolute bg-app-gray-50/5 brightness-[0.3] group-hover:brightness-95 transition-all ease-linear duration-300 -z-1"
      />

      <div>
        <p className="text-a-16 text-white text-center mb-5">Advertise here</p>
        <Button>Contact us</Button>
      </div>
    </div>
  );
};

export default NoAdvertCard;
