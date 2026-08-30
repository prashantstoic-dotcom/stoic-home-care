import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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
