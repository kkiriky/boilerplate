import type { Meta, StoryObj } from '@storybook/react';
import { default as ImageUploadDropzoneComponent } from '@/components/Dropzone/ImageUploadDropzone';

const meta = {
  title: 'Boilerplate/Dropzone/ImageUploadDropzone',
  component: ImageUploadDropzoneComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ImageUploadDropzoneComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ImageUploadDropzone: Story = {};
