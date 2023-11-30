import type { Meta, StoryObj } from '@storybook/react';
import { default as TypingAnimationComponent } from '@/components/TextAnimation/TypingAnimation';

const meta = {
  title: 'Boilerplate/Text Animation/TypingAnimation',
  component: TypingAnimationComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TypingAnimationComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TypingAnimation: Story = {};
