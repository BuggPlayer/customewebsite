/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': '300px',  // Custom extra small breakpoint (very small devices)
      'sm': '450px',  // Small mobile devices (portrait)
      'md': '768px',  // Tablets and small laptops
      'lg': '1024px', // Desktops and larger tablets in landscape
      'xl': '1280px', // Large desktops and screens
      '2xl': '1536px', // Extra large screens (large desktops, TVs, etc.)
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#d2a34b', // Gold
          dark: '#c69544',    // Darker gold
          light: '#e6c98f',   // Lighter gold
        },
        background: {
          DEFAULT: '#000000', // Black
          secondary: '#121212', // Dark gray
        },
        textColor: {
          primary: '#d2a34b', // Gold
          secondary: '#ffffff', // White
          muted: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white
        },
      },
      fontFamily: {
        primary: ['Lato', 'sans-serif'],
      },
      borderColor: {
        primary: '#d2a34b', // Gold
        faded: 'rgba(210, 163, 75, 0.3)', // Semi-transparent gold
      },
      backgroundColor: {
        'primary-transparent': 'rgba(210, 163, 75, 0.1)', // Semi-transparent gold
      },
      transitionDuration: {
        '2000': '2000ms',
      },
      animation: {
        'fade-down': 'fadeDown 0.5s ease-out',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 1s ease-out',
      },
      keyframes: {
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
