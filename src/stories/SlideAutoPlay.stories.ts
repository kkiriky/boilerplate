import type { Meta, StoryObj } from '@storybook/react';

import SlideAutoPlay from '@/components/SlideAutoPlay/SlideAutoPlay';

const meta = {
  title: 'Boilerplate/Slide Auto Play',
  component: SlideAutoPlay,
  tags: ['autodocs'],
} satisfies Meta<typeof SlideAutoPlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Bidirection: Story = {
  args: {
    isBidirection: true,
  },
};
