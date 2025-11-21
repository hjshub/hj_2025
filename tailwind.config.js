/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx,scss}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'sans': ['Noto Sans CJK KR', 'Noto Sans KR', '맑은 고딕', '나눔 고딕', 'sans-serif'],
        'score': ['S-CoreDream-Regular', 'sans-serif'],
        'score-bold': ['S-CoreDream-Bold', 'sans-serif'],
        'score-extrabold': ['S-CoreDream-ExtraBold', 'sans-serif'],
        'score-heavy': ['S-CoreDream-Heavy', 'sans-serif'],
      },
      colors: {
        black: 'var(--black)',
        black2: 'var(--black2)',
        white: 'var(--white)',
        softGray: 'var(--softGray)',
        gray: {
          DEFAULT: 'var(--gray)',
          2: '#666666',
          3: '#dedede',
          4: '#c1c3cd',
          5: '#d1d1d1',
          6: '#99c6ff',
          7: '#333333',
        },
        blueGray: {
          DEFAULT: '#dee4ff',
          2: '#dee4ff',
        },
        skyblue: {
          DEFAULT: '#7fe3ff',
          2: '#01d3f5',
        },
        babyblue: '#009ddc',
        navy: '#9dc9ff',
        navy2: '#9dc9ff',
        yellow: '#f9d428',
        orange: '#ff684a',
        mint: '#3dffde',
        green: '#22c55e',
        red: '#dc4324',
        pink: '#fc2e89',
        purple: {
          DEFAULT: 'var(--purple)',
          light: '#9F7AEA',
          dark: '#553C9A',
        },
      },
      borderStyle: {
        'dashed': 'dashed',
      },
      transitionDuration: {
        '800': '800ms',
        '400': '400ms',
      },
      transitionTimingFunction: {
        'custom': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      keyframes: {
        fadeInUp: {
          '0%': { 
            opacity: '0',
            transform: 'translate3d(0, 30%, 0)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateZ(0)'
          }
        },
        fadeInDown: {
          '0%': {
            opacity: '0',
            transform: 'translate3d(0, -30%, 0)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateZ(0)'
          }
        },
        zoomIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.66) translate(-50%, -50%)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) translate(-50%, -50%)'
          }
        },
        tick: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-50%)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        scroll: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' }
        },
        jingle: {
          '0%': {
            animationTimingFunction: 'cubic-bezier(0.146, 0.2111, 0.5902, 1.3204)',
            transform: 'rotate(0)'
          },
          '11%': {
            animationTimingFunction: 'cubic-bezier(0.1079, 0.1992, -0.6462, 0.828)',
            transform: 'rotate(7.61deg)'
          },
          '23%': {
            animationTimingFunction: 'cubic-bezier(0.0504, 0.0951, 0.0163, 0.9677)',
            transform: 'rotate(-5.789999999999999deg)'
          },
          '36%': {
            animationTimingFunction: 'cubic-bezier(0.0475, 0.0921, 0.3134, 1.0455)',
            transform: 'rotate(3.35deg)'
          },
          '49%': {
            animationTimingFunction: 'cubic-bezier(0.0789, 0.1565, 0.3413, 1.0972)',
            transform: 'rotate(-1.93deg)'
          },
          '62%': {
            animationTimingFunction: 'cubic-bezier(0.141, 0.2885, 0.406, 1.1519)',
            transform: 'rotate(1.12deg)'
          },
          '75%': {
            animationTimingFunction: 'cubic-bezier(0.226, 0.4698, 0.5031, 1.1722)',
            transform: 'rotate(-0.64deg)'
          },
          '88%': {
            animationTimingFunction: 'cubic-bezier(0.3121, 0.5521, 0.5655, 0.8997)',
            transform: 'rotate(0.37deg)'
          },
          '100%': {
            transform: 'rotate(-0.28deg)'
          }
        }
      },
      animation: {
        fadeInUp: 'fadeInUp 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
        fadeInDown: 'fadeInDown 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
        zoomIn: 'zoomIn 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
        tick: 'tick 0.3s ease-out forwards',
        scroll: 'scroll 2s infinite',
        jingle: 'jingle 2s ease-in-out infinite'
      },
      textDecorationThickness: {
        'custom': '0.1em',
      },
      textUnderlineOffset: {
        'custom': '0.2em',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.no-underline-offset': {
          'text-underline-offset': '0',
          'text-decoration-skip-ink': 'none',
        },
        '.border-dashed': {
          'border-style': 'dashed',
        },
      })
    },
  ],
}

