import type { Meta, StoryObj } from '@storybook/react';
import { default as TextBackgroundAnimationComponent } from '@/components/TextAnimation/TextBackgroundAnimation';

const meta = {
  title: 'Boilerplate/Text Animation/TextBackgroundAnimation',
  component: TextBackgroundAnimationComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TextBackgroundAnimationComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextBackgroundAnimation: Story = {};
