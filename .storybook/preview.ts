import type { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import '../src/styles/index.css';
import '../src/styles/animations.css';
import '../src/styles/radio.scss';
import '../src/styles/scrollbar.scss';
import '../src/styles/react-select.scss';
import '../src/styles/pagination.scss';
import '../src/styles/react-datepicker.scss';
import 'swiper/css';
import '../src/styles/triangle.scss';
import '../src/styles/popper.scss';
import '../src/styles/ag-grid.scss';

// Initialize MSW
initialize({
  onUnhandledRequest: 'bypass',
});

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
  loaders: [mswLoader],
};

export default preview;
