import { Meta, StoryObj } from '@storybook/react';
import { default as VerticalListComponent } from '@/components/DragAndDrop/DndKit/VerticalList/VerticalList';

const meta = {
  title: 'Boilerplate/Drag And Drop/dnd-kit/VerticalList',
  component: VerticalListComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof VerticalListComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VerticalList: Story = {};
