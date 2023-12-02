import plugin from 'tailwindcss/plugin';

const px0_10 = { ...[...Array(11)].map((_, i) => `${i}px`) };
const px0_100 = { ...[...Array(101)].map((_, i) => `${i}px`) };
const px0_600 = { ...[...Array(601)].map((_, i) => `${i}px`) };

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderWidth: px0_10,
      borderRadius: px0_100,
      fontSize: px0_100,
      lineHeight: px0_100,
      minWidth: px0_600,
      minHeight: px0_600,
      spacing: px0_600,
    },
  },
  corePlugins: {
    textOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
    divideOpacity: false,
    placeholderOpacity: false,
    ringOpacity: false,
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('mo', "@media (max-width: theme('screens.xl'))"); // instead of hard-coded 640px use sm breakpoint value from config. Or anything
    }),
  ],
};
