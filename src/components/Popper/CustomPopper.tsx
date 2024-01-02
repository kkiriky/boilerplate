import { Placement } from '@popperjs/core';
import { OffsetsFunction } from '@popperjs/core/lib/modifiers/offset';
import { useState } from 'react';
import { usePopper } from 'react-popper';

import '@/styles/popper.scss';

interface TooltipProps {
  /** content */
  children: React.ReactNode;
  /** reference element */
  referenceElement: React.RefObject<HTMLButtonElement> | null;
  /** visible */
  visible: boolean;
  /** popper position */
  placement?: Placement;
  offset?:
    | OffsetsFunction
    | [number | null | undefined, number | null | undefined];
  hasArrow?: boolean;
}

export default function Popper({
  children,
  referenceElement,
  visible,
  placement = 'auto',
  offset,
  hasArrow,
}: TooltipProps) {
  const [popperEl, setPopperEl] = useState<HTMLDivElement | null>(null);
  const [arrowEl, setArrowEl] = useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(
    referenceElement?.current,
    popperEl,
    {
      placement,
      modifiers: [
        { name: 'arrow', options: { element: arrowEl } },
        { name: 'offset', options: { offset } },
      ],
    },
  );

  if (!visible) {
    return null;
  }

  return (
    <div
      ref={setPopperEl}
      style={styles.popper}
      {...attributes.popper}
      className="popper"
    >
      {hasArrow && (
        <div ref={setArrowEl} style={styles.arrow} className="popper-arrow" />
      )}
      {children}
    </div>
  );
}
