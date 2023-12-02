import { Swiper as ReactSwiper, SwiperSlide } from 'swiper/react';
import { sampleList } from './data/sampleList';

export default function VerticalSlider() {
  return (
    <ReactSwiper className="aspect-square max-w-[500px]" direction="vertical">
      {sampleList.map((img, i) => (
        <SwiperSlide key={i}>
          <img src={img} alt="" className="aspect-square object-cover" />
        </SwiperSlide>
      ))}
    </ReactSwiper>
  );
}
