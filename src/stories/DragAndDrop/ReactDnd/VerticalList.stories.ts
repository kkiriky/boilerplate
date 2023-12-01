import { Meta, StoryObj } from '@storybook/react';
import { default as VerticalListComponent } from '@/components/DragAndDrop/ReactDnd/VerticalList/VerticalList';

const meta = {
  title: 'Boilerplate/Drag And Drop/react-dnd/VerticalList',
  component: VerticalListComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof VerticalListComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VerticalList: Story = {};
