import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import MobileMenuButton from '@/components/MobileMenuButton';

const meta = {
  title: 'Boilerplate/MobileMenuButton',
  component: MobileMenuButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MobileMenuButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    isOpen: false,
    onToggleMenu: () => {},
  },
  render: function Render(args) {
    const [{ isOpen }, updateArgs] =
      useArgs<Parameters<typeof MobileMenuButton>[0]>();

    function onToggleMenu() {
      updateArgs({ isOpen: !isOpen });
    }

    return (
      <MobileMenuButton {...args} onToggleMenu={onToggleMenu} isOpen={isOpen} />
    );
  },
};
