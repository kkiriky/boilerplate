import { Meta, StoryObj } from '@storybook/react';
import { default as HorizontalListComponent } from '@/components/DragAndDrop/DndKit/HorizontalList/HorizontalList';

const meta = {
  title: 'Boilerplate/Drag And Drop/dnd-kit/HorizontalList',
  component: HorizontalListComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof HorizontalListComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HorizontalList: Story = {};
