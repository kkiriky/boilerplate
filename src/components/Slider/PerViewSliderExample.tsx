import { useMemo } from 'react';
import { Swiper as ReactSwiper, SwiperSlide } from 'swiper/react';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';
import useSlide from './hooks/useSlide';
import { sampleList3 } from './data/sampleList';

// 슬라이드 아이템의 너비가 일정하지 않을 경우 slidePerView를 'auto'로 설정해야 함
// number로 설정 시 너비 / number의 등간격으로 슬라이드가 넘어가기 때문
// ex) 1200px / 3 = 400px => 하나의 슬라이드를 400px로 간주하고 400px씩 이동

interface SampleImageListItem {
  imageUrl1: string;
  imageUrl2: string;
}

export default function PerViewSliderExample() {
  const { activeIndex, onSlideChange } = useSlide();

  const slideImageList = useMemo(() => {
    return sampleList3.reduce((acc, image, i) => {
      // 3번째 이미지는 처리 X
      if (i % 4 === 2) return acc;

      // 1번째, 4번째 이미지는 1장
      if (i % 4 === 0 || i % 4 === 3) {
        return [...acc, { imageUrl1: image, imageUrl2: '' }];
      }

      // 2번째 이미지와 3번째 이미지를 묶어서 처리
      return [
        ...acc,
        { imageUrl1: image, imageUrl2: sampleList3[i + 1] ?? '' },
      ];
    }, [] as SampleImageListItem[]);
  }, []);

  const slidePaginationCount = useMemo(() => {
    if (slideImageList.length - 2 <= 0) return 0;

    return slideImageList.length - 2;
  }, [slideImageList.length]);

  return (
    <div className="relative w-[80vw]">
      <ReactSwiper
        slidesPerView={'auto'}
        spaceBetween={24}
        onSlideChange={onSlideChange}
        className="h-400"
      >
        {slideImageList.map((obj, i) => {
          if (i % 3 === 1) {
            return (
              <SwiperSlide key={i} className="!w-[calc(25%-24px)]">
                <div className="grid h-full grid-rows-2 gap-24">
                  <img
                    src={obj.imageUrl1}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  {obj.imageUrl2 && (
                    <img
                      src={obj.imageUrl2}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              </SwiperSlide>
            );
          }

          return (
            <SwiperSlide
              key={i}
              className={twMerge(
                '!w-[calc(50%-12px)]',
                i % 3 === 2 && '!w-[calc(25%-12px)]'
              )}
            >
              <img
                src={obj.imageUrl1}
                alt=""
                className="relative h-full w-full object-cover"
              />
            </SwiperSlide>
          );
        })}
      </ReactSwiper>

      <ul
        className="grid pt-28"
        style={{ gridTemplateColumns: `repeat(${slidePaginationCount},1fr)` }}
      >
        {[...Array(slidePaginationCount)].map((_, i) => (
          <li key={i} className="h-2 bg-[#D8D8D8]">
            {activeIndex === i && (
              <motion.div
                className="h-full w-full bg-black"
                layoutId="activeLine"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
