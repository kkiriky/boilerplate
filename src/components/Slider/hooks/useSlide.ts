import { useCallback, useRef, useState } from 'react';
import { SwiperRef } from 'swiper/react';
import { Swiper } from 'swiper/types';

const useSlide = () => {
  const swiperRef = useRef<SwiperRef | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onSlideChange = useCallback((swiper: Swiper) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  // 좌우 버튼 클릭 시 이동
  const onPrevSlide = useCallback(() => {
    swiperRef.current?.swiper.slidePrev();
  }, []);
  const onNextSlide = useCallback(() => {
    swiperRef.current?.swiper.slideNext();
  }, []);
  // 특정 슬라이드로 이동
  const onSlideTo = useCallback(
    (slideIndex: number) => () => {
      swiperRef.current?.swiper?.slideTo(slideIndex);
    },
    []
  );
  // loop가 활성화된 슬라이드의 경우, slideToLoop 이용하여야 정상적으로 동작
  const onSlideToLoop = useCallback(
    (slideIndex: number) => () => {
      swiperRef.current?.swiper.slideToLoop(slideIndex);
    },
    []
  );

  return {
    swiperRef,
    activeIndex,
    onSlideChange,
    onPrevSlide,
    onNextSlide,
    onSlideTo,
    onSlideToLoop,
  };
};

export default useSlide;
