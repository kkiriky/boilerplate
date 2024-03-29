import type { Meta, StoryObj } from '@storybook/react';
import Popper from '@/components/Popper/CustomPopper';
import { useCallback, useRef, useState } from 'react';
import { Placement } from '@popperjs/core';

const meta = {
  title: 'Boilerplate/Popper/Example',
  component: Popper,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: null,
    referenceElement: null,
    visible: false,
  },
} satisfies Meta<typeof Popper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: function Render() {
    const referenceElement = useRef<HTMLButtonElement | null>(null);
    const [visible, setVisibile] = useState(false);
    const onMouseEnter = useCallback(() => setVisibile(true), []);
    const onMouseLeave = useCallback(() => setVisibile(false), []);

    const [alwaysVisible, setAlwaysVisible] = useState(false); // storybook 용도
    const [placement, setPlacement] = useState<Placement>('bottom'); // storybook 용도

    return (
      <div className="flex flex-col gap-24 pt-100">
        <div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="mx-auto mb-100 w-fit p-16 "
        >
          {/* Reference */}
          <button
            ref={referenceElement}
            className="block rounded-4 border border-gray-400 p-16"
          >
            Hover Me!
          </button>

          <Popper
            referenceElement={referenceElement}
            visible={alwaysVisible ? alwaysVisible : visible}
            placement={placement}
            offset={[0, 16]}
            hasArrow
          >
            <div className="flex h-100 w-240 items-center justify-center rounded-4 border border-gray-400 bg-white p-16">
              Tooltip Content
            </div>
          </Popper>
        </div>

        {/* Storybook 용도 */}
        <div className="flex flex-col gap-8">
          <b>Visible: {alwaysVisible ? 'ON' : 'OFF'}</b>
          <label className="toggle">
            <input
              type="checkbox"
              onChange={(e) => setAlwaysVisible(e.target.checked)}
              checked={alwaysVisible}
              className="toggle-checkbox"
            />
            <div className="toggle-switch"></div>
          </label>
        </div>

        <div className="flex flex-col gap-8">
          <b>Position: {placement}</b>
          <div className="grid grid-cols-5 gap-16">
            {placement2DList.map((placementList, i) => (
              <div key={i} className="flex flex-col gap-12">
                {placementList.map((item, j) => (
                  <button
                    key={j}
                    onClick={() => setPlacement(item)}
                    className="rounded-4 border bg-blue-400 px-12 py-8 text-white  hover:bg-blue-300"
                  >
                    {item}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

const placement2DList: Placement[][] = [
  ['auto', 'auto-start', 'auto-end'],
  ['top', 'top-start', 'top-end'],
  ['right', 'right-start', 'right-end'],
  ['bottom', 'bottom-start', 'bottom-end'],
  ['left', 'left-start', 'left-end'],
];
