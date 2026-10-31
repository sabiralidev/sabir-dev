/** @type {import('tailwindcss').Config} */
export const darkMode = 'class';
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    colors: {
      brand: {
        black: '#050505',
        surface: '#0d0d0d',
        elevated: '#141414',
        card: '#101010',
        border: 'rgba(255, 255, 255, 0.08)',
        borderHover: 'rgba(255, 255, 255, 0.22)',
        silver: '#E0E0E0',
        muted: '#8A8A8A',
        dim: '#555555',
      },
      zinc: {
        850: '#1b1b1f',
        900: '#121214',
        950: '#050505',
      },
    },
    letterSpacing: {
      widest2: '0.25em',
      widest3: '0.35em',
      widest4: '0.5em',
    },
    boxShadow: {
      'monochrome': '0 0 50px -10px rgba(255, 255, 255, 0.05)',
      'monochrome-lg': '0 0 80px -15px rgba(255, 255, 255, 0.08)',
      'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.05)',
      'card': '0 10px 40px -10px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.08)',
      'card-hover': '0 20px 60px -15px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.2)',
    },
    animation: {
      'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    },
  },
};
export const plugins = [];

