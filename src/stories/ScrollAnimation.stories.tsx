import type { Meta, StoryObj } from '@storybook/react';
import ScrollTriggeredItem from '@/components/ScrollTriggeredItem';

const meta = {
  title: 'Boilerplate/Scroll Animation/Example',
  component: () => (
    <div className="flex flex-col gap-[300px] p-200">
      <ScrollTriggeredItem />
      <ScrollTriggeredItem />
      <ScrollTriggeredItem />
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ScrollTriggeredItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
