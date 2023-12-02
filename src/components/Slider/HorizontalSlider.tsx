import { Swiper as ReactSwiper, SwiperSlide } from 'swiper/react';
import useSlide from './hooks/useSlide';
import { sampleList } from './data/sampleList';

export default function HorizontalSlider() {
  const { activeIndex, onSlideChange } = useSlide();

  return (
    <div className="relative max-w-[500px]">
      <ReactSwiper onSlideChange={onSlideChange}>
        {sampleList.map((img, i) => (
          <SwiperSlide key={i}>
            <img src={img} alt="" className="aspect-square object-cover" />
          </SwiperSlide>
        ))}
      </ReactSwiper>
      <div className="absolute bottom-12 right-12 z-10 flex h-28 w-48 items-center justify-center rounded-14 bg-[rgba(0,0,0,0.2746)] text-14 font-semibold tracking-[1px] text-white">
        {activeIndex + 1}/{sampleList.length}
      </div>
    </div>
  );
}
