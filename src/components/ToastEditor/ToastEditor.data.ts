// import type { ToolbarItemOptions } from '@toast-ui/editor/types/ui';

export const colorSyntaxOptions = {
  preset: [
    '#333333',
    '#666666',
    '#FFFFFF',
    '#EE2323',
    '#F89009',
    '#009A87',
    '#006DD7',
    '#8A3DB6',
    '#781B33',
    '#5733B1',
    '#953B34',
    '#FFC1C8',
    '#FFC9AF',
    '#9FEEC3',
    '#99CEFA',
    '#C1BEF9',
  ],
};

interface ToolbarItem {
  name: string;
  el: HTMLButtonElement;
  tooltip: string;
}

export type ToolbarItems = (string | ToolbarItem)[][];
// export type ToolbarItems = (string | ToolbarItemOptions)[][];

export const toolbarItemsExceptImage: ToolbarItems = [
  ['heading', 'bold', 'italic', 'strike'],
  ['hr', 'quote'],
  ['ul', 'ol', 'task', 'indent', 'outdent'],
  // ['code', 'codeblock'],
  ['table', 'link'],
];
