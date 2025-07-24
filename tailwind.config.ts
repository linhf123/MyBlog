import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // 缩小所有默认间距到80%
    spacing: {
      px: '1px',
      0: '0px',
      0.5: '0.1rem',    // 0.125rem * 0.8
      1: '0.2rem',      // 0.25rem * 0.8  
      1.5: '0.3rem',    // 0.375rem * 0.8
      2: '0.4rem',      // 0.5rem * 0.8
      2.5: '0.5rem',    // 0.625rem * 0.8
      3: '0.6rem',      // 0.75rem * 0.8
      3.5: '0.7rem',    // 0.875rem * 0.8
      4: '0.8rem',      // 1rem * 0.8
      5: '1rem',        // 1.25rem * 0.8
      6: '1.2rem',      // 1.5rem * 0.8
      7: '1.4rem',      // 1.75rem * 0.8
      8: '1.6rem',      // 2rem * 0.8
      9: '1.8rem',      // 2.25rem * 0.8
      10: '2rem',       // 2.5rem * 0.8
      11: '2.2rem',     // 2.75rem * 0.8
      12: '2.4rem',     // 3rem * 0.8
      14: '2.8rem',     // 3.5rem * 0.8
      16: '3.2rem',     // 4rem * 0.8
      20: '4rem',       // 5rem * 0.8
      24: '4.8rem',     // 6rem * 0.8
      28: '5.6rem',     // 7rem * 0.8
      32: '6.4rem',     // 8rem * 0.8
      36: '7.2rem',     // 9rem * 0.8
      40: '8rem',       // 10rem * 0.8
      44: '8.8rem',     // 11rem * 0.8
      48: '9.6rem',     // 12rem * 0.8
      52: '10.4rem',    // 13rem * 0.8
      56: '11.2rem',    // 14rem * 0.8
      60: '12rem',      // 15rem * 0.8
      64: '12.8rem',    // 16rem * 0.8
      72: '14.4rem',    // 18rem * 0.8
      80: '16rem',      // 20rem * 0.8
      96: '19.2rem',    // 24rem * 0.8
    },
    extend: {
      fontFamily: {
        sans: [
          'var(--font-geist-sans)',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif'
        ],
        mono: [
          'var(--font-geist-mono)',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace'
        ],
      },
      fontSize: {
        'xs': ['0.6rem', { lineHeight: '0.8rem' }],      // 0.75rem * 0.8
        'sm': ['0.7rem', { lineHeight: '1rem' }],        // 0.875rem * 0.8
        'base': ['0.8rem', { lineHeight: '1.2rem' }],    // 1rem * 0.8
        'lg': ['0.9rem', { lineHeight: '1.4rem' }],      // 1.125rem * 0.8
        'xl': ['1rem', { lineHeight: '1.4rem' }],        // 1.25rem * 0.8
        '2xl': ['1.2rem', { lineHeight: '1.6rem' }],     // 1.5rem * 0.8
        '3xl': ['1.5rem', { lineHeight: '1.8rem' }],     // 1.875rem * 0.8
        '4xl': ['1.8rem', { lineHeight: '2rem' }],       // 2.25rem * 0.8
        '5xl': ['2.4rem', { lineHeight: '1' }],          // 3rem * 0.8
        '6xl': ['3rem', { lineHeight: '1' }],            // 3.75rem * 0.8
        '7xl': ['3.6rem', { lineHeight: '1' }],          // 4.5rem * 0.8
        '8xl': ['4.8rem', { lineHeight: '1' }],          // 6rem * 0.8
        '9xl': ['6.4rem', { lineHeight: '1' }],          // 8rem * 0.8
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 2s infinite',
        'digit-bounce': 'digitBounce 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'digit-drop-in': 'digitDropIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'digit-drop-out': 'digitDropOut 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53)',
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(40px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideInLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        'pulse-slow': {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.5',
          },
        },
        digitBounce: {
          '0%': {
            transform: 'translateY(0) scale(1)',
          },
          '30%': {
            transform: 'translateY(-8px) scale(1.1)',
          },
          '70%': {
            transform: 'translateY(-2px) scale(1.05)',
          },
          '100%': {
            transform: 'translateY(0) scale(1)',
          },
        },
        digitDropIn: {
          '0%': {
            transform: 'translateY(-100%)',
            opacity: '0',
          },
          '50%': {
            transform: 'translateY(10%)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        digitDropOut: {
          '0%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(100%)',
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [],
}
export default config 