'use client';

import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import SvgIcon from './icon';

import { DATE_FORMAT } from '@/utils/constants';

import 'swiper/css';

const NavButton = ({ direction }: { direction: 'next' | 'prev' }) => {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => {
        if (direction === 'next') swiper.slideNext();
        else swiper.slidePrev();
      }}
      className={`
            absolute top-1/2 transform -translate-y-1/2 z-10 
            bg-primary text-white p-2 rounded-full 
            ${direction === 'next' ? 'right-4 animate-pulse-right' : 'left-4 animate-pulse-left'}
            transition-opacity hover:opacity-80 focus:opacity-80
         `}
      aria-label={direction === 'next' ? 'Next slide' : 'Previous slide'}
    >
      <SvgIcon
        name="arrow-right"
        className={`w-5 h-5 ${
          direction === 'prev' ? 'rotate-180' : ''
        } transition-transform`}
      />
    </button>
  );
};

const Pagination = ({ totalSlides }: { totalSlides: number }) => {
  const swiper = useSwiper();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!swiper) return;

    const handleSlideChange = () => setActiveIndex(swiper.realIndex);

    swiper.on('slideChange', handleSlideChange);

    setActiveIndex(swiper.realIndex);

    return () => {
      swiper.off('slideChange', handleSlideChange);
    };
  }, [swiper]);

  return (
    <div className="flex absolute w-full app-padding bottom-8 left-0 z-1  space-x-2">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => swiper.slideTo(index)}
          className={`w-4 h-2 rounded ${
            index === activeIndex ? 'bg-primary' : 'bg-gray-300'
          } transition-colors`}
          aria-label={`slide ${index}`}
        />
      ))}
    </div>
  );
};

const Hero = () => {
  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={1}
      loop
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      autoHeight
    >
      <NavButton direction="prev" />
      <NavButton direction="next" />

      <div className="relative">
        {Array.from({ length: 2 }).map((_, i) => (
          <SwiperSlide key={i}>
            <section className="section-padding text-left min-h-[500px] md:min-h-[600px] flex flex-col justify-end">
              <div className="absolute top-0 left-0 -z-1 w-full h-full aspect-square">
                <Image
                  src={`https://picsum.photos/19${i + 8}0/208${i}`}
                  alt="hero background"
                  sizes="100%"
                  fill
                  className="object-cover brightness-[0.3] bg-primary/80 opacity-95"
                  priority
                />
              </div>

              <div className="relative h-full w-full pt-16 pb-6 text-app-white font-bold">
                <div className="pt-24 md:pt-32">
                  <p className="bg-app-foreground text-app-text text-a-12 rounded p-2 w-max mb-3">
                    {'CATEGORY'}
                  </p>

                  <p className="text-a-18">{'This is the blog title'}</p>

                  <p className=" line-clamp-3 my-2 max-w-[370px]">
                    {`WordPress News Magazine Charts the Most Chic and Fashionable Women of New York City WordPress News Magazine Charts the Most Chic and Fashionable Women of New York City`}
                  </p>

                  <p className="flex gap-[1ch] items-center my-4 text-a-12 font-light">
                    <span>{'Paul Oluwatoni'}</span>
                    <span>-</span>
                    <span>{dayjs().format(DATE_FORMAT)}</span>
                  </p>

                  <Link href={'#'} className="text-primary w-max">
                    Read now
                  </Link>
                </div>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </div>

      <Pagination totalSlides={2} />
    </Swiper>
  );
};

export default Hero;
