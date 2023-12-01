import { Meta, StoryObj } from '@storybook/react';
import { default as GridListComponent } from '@/components/DragAndDrop/ReactDnd/GridList/GridList';

const meta = {
  title: 'Boilerplate/Drag And Drop/react-dnd/GridList',
  component: GridListComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof GridListComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GridList: Story = {};
