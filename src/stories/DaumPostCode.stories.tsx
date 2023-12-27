import DaumPostCode from '@/components/DaumPostCode/DaumPostCode';
import useDaumPostCode from '@/components/DaumPostCode/hooks/useDaumPostCode';
import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';

const meta = {
  title: 'Boilerplate/DaumPostCode/DaumPostCode',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. hook을 사용하여 팝업 형태로 띄우는 방식
export const PopUp: Story = {
  render: function Render() {
    const [address, setAddress] = useState('');

    const { onOpenDaumPostCode } = useDaumPostCode({ setAddress });

    return (
      <div className="flex gap-16">
        <input
          readOnly
          className="w-300 rounded-8 border border-gray-300 px-20 py-16 outline-none placeholder:text-gray-400"
          placeholder="주소를 입력해주세요."
          value={address}
        />
        <button
          onClick={onOpenDaumPostCode}
          type="button"
          className="rounded-8 bg-blue-400 px-24 py-19 text-18 font-semibold leading-[100%] text-white"
        >
          주소검색
        </button>
      </div>
    );
  },
};

// 2. Embed 방식으로 넣는 방식
export const Embed: Story = {
  render: function Render() {
    const [address, setAddress] = useState('');

    const [isOpenPostCode, setIsOpenPostCode] = useState(false);
    const onOpenPostCode = useCallback(() => setIsOpenPostCode(true), []);
    const onClosePostCode = useCallback(() => setIsOpenPostCode(false), []);

    return (
      <div className="flex flex-col gap-32">
        <div className="flex gap-16">
          <input
            readOnly
            className="w-300 rounded-8 border border-gray-300 px-20 py-16 outline-none placeholder:text-gray-400"
            placeholder="주소를 입력해주세요."
            value={address}
          />
          <button
            onClick={onOpenPostCode}
            type="button"
            className="rounded-8 bg-blue-400 px-24 py-19 text-18 font-semibold leading-[100%] text-white"
          >
            주소검색
          </button>
        </div>

        {isOpenPostCode && (
          <DaumPostCode setAddress={setAddress} onClose={onClosePostCode} />
        )}
      </div>
    );
  },
};
