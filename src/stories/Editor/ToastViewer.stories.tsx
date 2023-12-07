import type { Meta, StoryObj } from '@storybook/react';
import { default as ToastViewerComponent } from '@/components/ToastEditor/ToastViewer';
import { useGetPost } from '@/hooks/usePost';
import { postHandlers } from '@/mocks/postHandlers';
import ReactQueryProvider from '@/components/ReactQueryProvider';

const meta = {
  title: 'Boilerplate/Editor/ToastViewer',
  component: ToastViewerComponent,
  parameters: {
    layout: 'centered',
    msw: { handlers: postHandlers },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return (
        <ReactQueryProvider>
          <Story />
        </ReactQueryProvider>
      );
    },
  ],
} satisfies Meta<typeof ToastViewerComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ToastViewer: Story = {
  render: function Render() {
    const { data } = useGetPost();

    return <ToastViewerComponent initialValue={data} />;
  },
};
