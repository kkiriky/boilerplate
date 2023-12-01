import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';

const meta = {
  title: 'Boilerplate/Atoms/CustomScrollbar',
  component: () => (
    <div className="custom-scrollbar h-500 w-400 overflow-auto px-8">
      {faker.lorem.paragraphs(50)}
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const CustomScrollbar: Story = {};
