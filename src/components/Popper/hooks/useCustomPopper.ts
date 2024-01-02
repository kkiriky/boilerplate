import { useCallback, useEffect, useRef, useState } from 'react';

const useCustomPopper = () => {
  const referenceElement = useRef<HTMLButtonElement | null>(null);
  const [visible, setVisible] = useState(false);

  // 클릭 시 팝업을 on/off 할 경우
  const onToggleVisible = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setVisible((state) => !state);
  }, []);

  useEffect(() => {
    const clickHandler = () => setVisible(false);

    window.addEventListener('click', clickHandler);

    return () => {
      window.removeEventListener('click', clickHandler);
    };
  }, []);

  return { referenceElement, visible, onToggleVisible };
};

export default useCustomPopper;
