import type { Meta, StoryObj } from '@storybook/react';
import { Suspense, useCallback } from 'react';
import { RecoilRoot } from 'recoil';
import { useConfirmModal } from '@/components/Modals/hooks/useModal';
import Modals from '@/components/Modals/Modals';

const meta = {
  title: 'Boilerplate/Modal/ConfirmModal',
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => {
      return (
        <RecoilRoot>
          <Story />

          <Suspense>
            <Modals />
          </Suspense>
        </RecoilRoot>
      );
    },
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ConfirmModal: Story = {
  render: function Render() {
    const { openConfirmModal } = useConfirmModal();

    const onOpenConfirmModal = useCallback(() => {
      openConfirmModal({
        message: 'Do you want to do this?',
        onConfirm: () => {},
      });
    }, [openConfirmModal]);

    return (
      <button
        onClick={onOpenConfirmModal}
        className="rounded-4 border border-gray-400 px-20 py-8 text-gray-500"
      >
        Open Confirm Modal
      </button>
    );
  },
};
