import { Placement } from '@popperjs/core';
import { OffsetsFunction } from '@popperjs/core/lib/modifiers/offset';
import { useState } from 'react';
import { usePopper } from 'react-popper';

interface TooltipProps {
  /** reference element */
  referenceElement: React.RefObject<HTMLButtonElement> | null;
  /** visible */
  visible: boolean;
  /** popper position */
  placement?: Placement;
  offset?:
    | OffsetsFunction
    | [number | null | undefined, number | null | undefined];
}

export default function Tooltip({
  referenceElement,
  visible,
  placement = 'auto',
  offset,
}: TooltipProps) {
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(
    referenceElement?.current,
    popperElement,
    {
      placement,
      modifiers: [
        {
          name: 'arrow',
          options: { element: arrowElement },
        },
        {
          name: 'offset',
          options: { offset },
        },
      ],
    }
  );

  if (!visible) {
    return null;
  }

  return (
    <div
      ref={setPopperElement}
      style={styles.popper}
      {...attributes.popper}
      className="tooltip flex h-100 w-240 items-center justify-center rounded-4 border border-gray-400 bg-white p-16"
    >
      <span>Tooltip content</span>

      <div
        ref={setArrowElement}
        style={styles.arrow}
        className="tooltip-arrow"
      />
    </div>
  );
}
