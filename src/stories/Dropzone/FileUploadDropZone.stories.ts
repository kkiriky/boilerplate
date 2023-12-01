import type { Meta, StoryObj } from '@storybook/react';
import { default as FileUploadDropzoneComponent } from '@/components/Dropzone/FileUploadDropZone';

const meta = {
  title: 'Boilerplate/Dropzone/FileUploadDropZone',
  component: FileUploadDropzoneComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof FileUploadDropzoneComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FileUploadDropZone: Story = {};
