import { Swiper as ReactSwiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import useSlide from './hooks/useSlide';
import { sampleList2 } from './data/sampleList';
import SlideLeftIcon from '@/assets/icons/slide-left.svg?react';
import SlideRightIcon from '@/assets/icons/slide-right.svg?react';

// slidePerView와 loop를 같이 사용할 경우 주의할 점
// => total slide >= slidePerView x 2
// => 전체 슬라이드의 수는 slidePerView 설정 값의 2배 이상이어야 함
// => ex) 리스트(전체 슬라이드)의 개수가 5개인데, slidePerView가 3일 경우 이슈 발생
// => [...list,...list] 와 같이 2배로 늘리는 방식으로 해결 가능
export default function PerViewCenterSlider() {
  const { swiperRef, onPrevSlide, onNextSlide } = useSlide();

  return (
    <div className="perview-center-slider">
      <ReactSwiper
        ref={swiperRef}
        slidesPerView={'auto'} // 'auto'로 설정 시 slide의 너비가 고정되어야 함, number로 입력 시에는 slide의 너비를 자동으로 계산
        spaceBetween={40}
        centeredSlides
        loop
        autoplay
        modules={[Autoplay]}
      >
        {[...sampleList2, ...sampleList2].map((image, i) => (
          <SwiperSlide key={i} className="!w-fit">
            <img src={image} className="w-460 object-cover" />
          </SwiperSlide>
        ))}
      </ReactSwiper>
      {/* Slide Navigations */}
      <div className="absolute left-0 top-1/2 z-20 flex h-60 w-full -translate-y-1/2 justify-between">
        <button onClick={onPrevSlide} className="absolute left-64">
          <SlideLeftIcon />
        </button>
        <button onClick={onNextSlide} className="absolute right-64">
          <SlideRightIcon />
        </button>
      </div>
    </div>
  );
}
