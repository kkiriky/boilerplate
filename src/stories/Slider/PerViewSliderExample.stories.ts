import type { Meta, StoryObj } from '@storybook/react';
import { default as PerViewSliderExampleComponent } from '@/components/Slider/PerViewSliderExample';

const meta = {
  title: 'Boilerplate/Slider/PerViewSliderExample',
  component: PerViewSliderExampleComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PerViewSliderExampleComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PerViewSliderExample: Story = {};
