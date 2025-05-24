// tailwind.config.js
const plugin = require('tailwindcss/plugin');
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-orange': '#f97316',
        'brand-orange-dark': '#c2410c',
      },
      keyframes: {
        bounceDown: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
      },
      animation: {
        bounceDown: 'bounceDown 1.5s infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function ({ addComponents }) {
      addComponents({
        '.btn-gradient-hover': {
          '@apply inline-flex items-center justify-center gap-2 px-5 py-2 text-base font-medium rounded-2xl text-white shadow-lg transform transition-all duration-500 ease-in-out':
            '',
          backgroundImage:
            'linear-gradient(to right, #ea580C, #f97316, #c2410c)', // usando colores directos
          backgroundSize: '200% 200%',
          backgroundPosition: '0% 50%',
          '&:hover': {
            backgroundPosition: '100% 50%',
            transform: 'translateY(-0.25rem)',
          },
        },
      });
    }),
  ],
};
