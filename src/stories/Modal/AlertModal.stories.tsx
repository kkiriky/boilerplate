import type { Meta, StoryObj } from '@storybook/react';
import { Suspense, useCallback } from 'react';
import { RecoilRoot } from 'recoil';
import { useAlertModal } from '@/components/Modals/hooks/useModal';
import Modals from '@/components/Modals/Modals';

const meta = {
  title: 'Boilerplate/Modal/AlertModal',
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

export const AlertModal: Story = {
  render: function Render() {
    const { openAlertModal } = useAlertModal();

    const onOpenSuccessAlertModal = useCallback(() => {
      openAlertModal({ message: 'Success Message' });
    }, [openAlertModal]);

    const onOpenErrorAlertModal = useCallback(() => {
      openAlertModal({
        type: 'error',
        message: 'Error Message',
      });
    }, [openAlertModal]);

    return (
      <div className="flex flex-col gap-16">
        <button
          onClick={onOpenSuccessAlertModal}
          className="rounded-4 border border-gray-400 px-20 py-8 text-gray-500"
        >
          Open Success Alert Modal
        </button>
        <button
          onClick={onOpenErrorAlertModal}
          className="rounded-4 border border-gray-400 px-20 py-8 text-gray-500"
        >
          Open Error Alert Modal
        </button>
      </div>
    );
  },
};
