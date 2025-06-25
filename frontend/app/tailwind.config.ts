import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#f5f6fa', // couleur de fond personnalisée
      },
    },
  },
  plugins: [],
};
export default config;
