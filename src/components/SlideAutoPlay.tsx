const list = [...Array(8)].map((_, i) => i + 1);

interface SlideAutoPlayProps {
  isBidirection?: boolean;
}

export default function SlideAutoPlay({
  isBidirection = false,
}: SlideAutoPlayProps) {
  return (
    <div className="flex w-full flex-col gap-24 overflow-hidden">
      {/* 8개의 아이템을 16초간 이동 => 하나의 아이템이 사라지는데 걸리는 시간 2초 */}
      <ul className="flex animate-[auto-slide_16s_linear_infinite] gap-16">
        {[...list, ...list].map((item, i) => (
          <li
            key={i}
            className="flex w-240 shrink-0 items-center justify-center border border-gray-300 py-8"
          >
            Slide item {item}
          </li>
        ))}
      </ul>

      {/* reverse */}
      {isBidirection && (
        <ul className="flex animate-[auto-slide_16s_linear_infinite_reverse] gap-16">
          {[...list, ...list].reverse().map((item, i) => (
            <li
              key={i}
              className="flex w-240 shrink-0 items-center justify-center border border-gray-300 py-8"
            >
              Slide item {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
