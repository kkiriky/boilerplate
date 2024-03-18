import type { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import Pagination from '@/components/Pagination/Pagination';
import useCurrentPage from '@/components/Pagination/hooks/useCurrentPage';

const meta = {
  title: 'Boilerplate/Pagination/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  decorators: [withRouter],
  parameters: {
    layout: 'centered',
  },
  render: function Render(args) {
    const { currentPage } = useCurrentPage();

    console.log({ currentPage });

    return <Pagination {...args} currentPage={currentPage} />;
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    totalPage: 10,
    currentPage: 1,
  },
};
