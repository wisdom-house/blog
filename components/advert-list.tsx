'use client';

import { Autoplay, EffectCube, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import AdvertCard, { Advert } from './cards/advert-card';
import NoAdvertCard from './cards/no-advert-card';
import ShowView from './show-view';

import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

const AdvertList = ({ adverts }: { adverts: Advert[] }) => {
  return (
    <div className="top-[120px] z-1 sticky rounded-lg overflow-y-auto bg-app-background">
      <ShowView when={!!adverts.length} fallback={<NoAdvertCard />}>
        <h2 className="text-lg font-semibold mb-4 text-app-text text-center">
          Sponsored Adverts
        </h2>

        <Swiper
          effect="cube"
          grabCursor={true}
          cubeEffect={{
            shadow: false,
            slideShadows: false,
            shadowOffset: 20,
            shadowScale: 0.94,
          }}
          loop
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[EffectCube, Pagination, Autoplay]}
        >
          {adverts.map((ad, i) => (
            <SwiperSlide key={ad.banner + i} className="">
              <AdvertCard
                name={ad.name}
                banner={ad.banner}
                external_link={ad.external_link}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </ShowView>
    </div>
  );
};

export default AdvertList;
