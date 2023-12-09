import type { Meta, StoryObj } from '@storybook/react';
import { default as NaverMapComponent } from '@/components/NaverMap';

const meta = {
  title: 'Boilerplate/Map/NaverMap',
  component: NaverMapComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof NaverMapComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NaverMap: Story = {};
