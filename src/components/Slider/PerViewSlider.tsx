import { Swiper as ReactSwiper, SwiperSlide } from 'swiper/react';
import useSlide from './hooks/useSlide';
import { sampleList } from './data/sampleList';

import ArrowLeftIcon from '@/assets/icons/arrow-left.svg?react';
import ArrowRightIcon from '@/assets/icons/arrow-right.svg?react';

export default function PerViewSlider() {
  const { swiperRef, onPrevSlide, onNextSlide } = useSlide();

  return (
    <div className="mx-auto xl:w-[1200px]">
      <div className="mx-auto mb-24 flex w-fit gap-30">
        <div className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-full border border-black">
          <ArrowLeftIcon onClick={onPrevSlide} />
        </div>
        <div className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-full border border-black">
          <ArrowRightIcon onClick={onNextSlide} />
        </div>
      </div>

      <ReactSwiper
        ref={swiperRef}
        slidesPerView={'auto'}
        spaceBetween={16}
        breakpoints={{
          1280: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {sampleList.map((img, i) => (
          <SwiperSlide key={i} className="mo:!w-fit">
            <img src={img} alt="" className="w-300 object-cover xl:w-full" />
          </SwiperSlide>
        ))}
      </ReactSwiper>
    </div>
  );
}
