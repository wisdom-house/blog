'use client';

import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import { BlogPostCardProps } from './cards/blog-post-card';
import SvgIcon from './icon';
import NoBlogPosts from './no-blog-posts';
import ShowView from './show-view';

import { routes } from '@/lib/routes';
import { urlFor } from '@/sanity/lib/image';
import { DATE_FORMAT } from '@/utils/constants';

import 'swiper/css';

interface HeroProps {
  posts: BlogPostCardProps[];
}

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

  if (totalSlides <= 1) {
    return null;
  }

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

const Hero = ({ posts }: HeroProps) => {
  if (!posts.length) {
    return (
      <div className="section-padding ">
        <NoBlogPosts />
      </div>
    );
  }
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
    >
      <ShowView when={posts.length > 1}>
        <NavButton direction="prev" />
        <NavButton direction="next" />
      </ShowView>

      <div className="absolute top-0 section-padding z-1">
        <p className="bg-red-700  w-max py-2 px-5 text-white rounded font-bold z-1">
          LATEST
        </p>
      </div>
      <div className="relative min-h-[80vh]">
        {posts?.map(
          ({ title, mainImage, excerpt, slug, publishedAt, author }, i) => (
            <SwiperSlide key={i}>
              <section className="section-padding text-left h-inherit flex flex-col items-center justify-end">
                <div className="absolute top-0 left-0 -z-1 w-full h-[90vh]">
                  <Image
                    src={urlFor(mainImage).url()}
                    alt={mainImage.alt}
                    sizes="100%"
                    fill
                    className="object-cover brightness-[0.3] bg-primary/80 opacity-95"
                    priority
                  />
                </div>

                <div className="relative h-full w-full pt-16 pb-6 text-app-white font-bold">
                  <div className="pt-24 md:pt-32 max-w-[650px] bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl p-6">
                    <p className="text-a-18 lg:text-a-40 line-clamp-2">
                      {title}
                    </p>

                    <p className=" line-clamp-2 my-2  ">{excerpt}</p>

                    <p className="flex gap-[1ch] items-center my-4 font-light">
                      <span className="font-bold">{author}</span>
                      <span>-</span>
                      <span>{dayjs(publishedAt).format(DATE_FORMAT)}</span>
                    </p>

                    <Link
                      href={routes.post(slug)}
                      className="text-primary w-max"
                    >
                      Read now
                    </Link>
                  </div>
                </div>
              </section>
            </SwiperSlide>
          )
        )}
      </div>

      <Pagination totalSlides={posts.length} />
    </Swiper>
  );
};

export default Hero;
