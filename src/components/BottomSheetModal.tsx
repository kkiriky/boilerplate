import { useCallback, useMemo, useRef, useState } from 'react';
import { PanInfo, Variants, motion, useAnimation } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { throttle } from 'throttle-debounce';
import { faker } from '@faker-js/faker';

// 실제 사용 시 포탈로 사용
// {createPortal(<BottomSheetModal />, document.body)}

const lorem = faker.lorem.paragraphs(50);
type Position = 'top' | 'middle' | 'bottom';

const sheetHeight = window.innerHeight - 50; // 상단으로부터 50px까지
const variants: Variants = {
  top: { y: -(sheetHeight - 50) }, // Sheet 헤더 50px만큼 제외하고 위로 이동
  middle: { y: -(sheetHeight / 2) },
  bottom: { y: 0 },
};

export default function BottomSheetModal() {
  const controls = useAnimation(); // 애니메이션을 원할 때 실행시키기 위하여 controls 이용 (드래그가 끝난 시점)
  const currentPosition = useRef<Position>('bottom'); // 리렌더링을 방지하기 위하여 ref 사용
  const sheetBodyRef = useRef<HTMLDivElement>(null); // 스크롤이 생성될 경우 스크롤의 위치를 파악하기 위함
  const [isScrollable, setIsScrollable] = useState(false); // Sheet의 위치가 top일 경우에만 Sheet 바디의 스크롤이 가능하게 하기 위함
  const [isScrollTop, setIsScrollTop] = useState(true); // Sheet의 위치가 top이고 바디 Sheet에서 스크롤을 조금이라도 내렸다면, 드래그는 방지하고 스크롤만 동작하도록 하기 위함 (onPointerDownCapture)

  const onDragEnd = useCallback(
    (_e: TouchEvent, info: PanInfo) => {
      const dir = info.offset.y < 0 ? 'up' : 'down';

      if (currentPosition.current === 'bottom') {
        if (dir === 'up') {
          const boundary = (sheetHeight * 3) / 4;
          if (Math.abs(info.offset.y) > boundary) {
            currentPosition.current = 'top';
            controls.start('top');
          } else {
            currentPosition.current = 'middle';
            controls.start('middle');
          }
        } else {
          // 버그 방지용
          controls.start('bottom');
        }
      } else if (currentPosition.current === 'middle') {
        if (dir === 'up') {
          currentPosition.current = 'top';
          controls.start('top');
        } else {
          currentPosition.current = 'bottom';
          controls.start('bottom');
        }
      } else if (currentPosition.current === 'top') {
        if (dir === 'down') {
          const boundary = (sheetHeight * 3) / 4;
          if (info.offset.y < boundary) {
            currentPosition.current = 'middle';
            controls.start('middle');
          } else {
            currentPosition.current = 'bottom';
            controls.start('bottom');
          }
        } else {
          // 버그 방지용
          controls.start('top');
        }
      }

      setIsScrollable(currentPosition.current === 'top');
    },
    [controls]
  );

  const onScroll = useMemo(
    () =>
      throttle(300, (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        setIsScrollTop((e.target as HTMLDivElement).scrollTop === 0);
      }),
    []
  );

  // framer motion의 drag event를 막기 위함 (Sheet의 위치가 top이고 바디 Sheet에서 스크롤을 조금이라도 내렸을 경우)
  const onPointerDownCapture = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (currentPosition.current === 'top' && !isScrollTop) {
        e.stopPropagation();
      }
    },
    [isScrollTop]
  );

  return (
    <motion.div
      variants={variants}
      drag={'y'}
      dragConstraints={{ top: -(sheetHeight - 50), bottom: 0 }}
      onDragEnd={onDragEnd}
      dragElastic={false} // constraints 외부로 움직이기를 원치 않을 경우 false로 설정
      transition={{ bounce: 0.1 }} // default: 0.25
      animate={controls}
      whileTap={{ cursor: 'grabbing' }}
      className="fixed -bottom-[calc(100vh-100px)] left-0 right-0 z-[100] h-[calc(100vh-50px)] rounded-[24px_24px_0_0] border border-solid border-gray-200 bg-white shadow-[0_10px_10px_8px_rgba(0,0,0,0.3)]"
    >
      {/* 모달 헤더 */}
      <div className="flex h-50 items-center justify-center">
        <div className="h-3 w-32 bg-slate-300" />
      </div>
      {/* 모달 바디 */}
      <div
        ref={sheetBodyRef}
        className={twMerge(
          'h-[calc(100vh-100px)] px-16 pb-16',
          isScrollable ? 'overflow-auto' : 'overflow-hidden', // Sheet의 위치가 top일 경우에만 Sheet 바디의 스크롤이 가능하게 하기 위함
          isScrollTop ? 'touch-pan-down' : 'touch-pan-y' // Sheet의 위치가 top이고 바디 Sheet에서 스크롤 top이 0이라면 , 바디를 잡고서 드래그가 가능하게 하기 위함
        )}
        onScroll={onScroll}
        onPointerDownCapture={onPointerDownCapture}
      >
        {lorem}
      </div>
    </motion.div>
  );
}
