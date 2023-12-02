import type { Meta, StoryObj } from '@storybook/react';
import { default as PerViewSliderComponent } from '@/components/Slider/PerViewSlider';

const meta = {
  title: 'Boilerplate/Slider/PerViewSlider',
  component: PerViewSliderComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PerViewSliderComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PerViewSlider: Story = {};
