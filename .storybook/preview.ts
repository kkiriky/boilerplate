import type { Preview } from '@storybook/react';
import '../src/styles/index.css';
import '../src/styles/animations.css';
import '../src/styles/react-select.scss';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
