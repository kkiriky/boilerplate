import type { Meta, StoryObj } from '@storybook/react';
import { default as PerViewCenterSliderComponent } from '@/components/Slider/PerViewCenterSlider';

const meta = {
  title: 'Boilerplate/Slider/PerViewCenterSlider',
  component: PerViewCenterSliderComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PerViewCenterSliderComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PerViewCenterSlider: Story = {};
