import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: { center: true, padding: '1rem' },
      extend: { keyframes: { floatY: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-15px)' } } }, animation: { 'float': 'floatY 4s ease-in-out infinite', 'float-reverse': 'floatY 5s ease-in-out infinite reverse' },
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        outfit: ['var(--font-outfit)', 'sans-serif'],
      },
    },
  },
  corePlugins: {
    // IMPORTANT: Disable preflight to prevent Tailwind from removing 
    // default browser margins/paddings and breaking Bootstrap layouts globally.
    // This allows a seamless, component-by-component migration.
    preflight: false,
  },
  plugins: [],
}
export default config
