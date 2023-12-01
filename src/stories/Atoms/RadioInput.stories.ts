import type { Meta, StoryObj } from '@storybook/react';
import RadioInputComponent from '@/components/RadioInput/RadioInput';

const meta = {
  title: 'Boilerplate/Atoms/RadioInput',
  component: RadioInputComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RadioInputComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RadioInput: Story = {};
