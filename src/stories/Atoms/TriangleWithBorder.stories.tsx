import type { Meta, StoryObj } from '@storybook/react';
import '@/styles/triangle.scss';

const meta = {
  title: 'Boilerplate/Atoms/TriangleWithBorder',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 정삼각형
export const EquilateralTriangle: Story = {
  render: function Render() {
    return (
      <div className="relative rounded-4 border border-gray-400 p-16">
        Content Box
        <div className="equilateral-triangle" />
      </div>
    );
  },
};

// 이등변 삼각형
export const IsoscelesTriangle: Story = {
  render: function Render() {
    return (
      <div className="relative rounded-4 border border-gray-400 p-16">
        Content Box
        <div className="isosceles-triangle" />
      </div>
    );
  },
};

export const Example1: Story = {
  render: function Render() {
    return (
      <div className="relative rounded-4 border border-gray-400 p-16">
        Content Box
        <div className="triangle-example1" />
      </div>
    );
  },
};

export const Example2: Story = {
  render: function Render() {
    return (
      <div className="relative rounded-4 border border-gray-400 p-16">
        Content Box
        <div className="triangle-example2" />
      </div>
    );
  },
};
