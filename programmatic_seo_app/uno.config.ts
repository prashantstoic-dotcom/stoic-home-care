import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno({
      // We don't need preflight true because we are in coexistence mode with Bootstrap
      preflight: false,
    }),
  ],
  theme: {
    colors: {
      primary: 'var(--primary)',
      secondary: 'var(--secondary)',
      accent: 'var(--accent)',
    },
    fontFamily: {
      outfit: 'var(--font-outfit), sans-serif',
    }
  },
  content: {
    filesystem: [
      'app/**/*.{js,ts,jsx,tsx}',
      'components/**/*.{js,ts,jsx,tsx}',
    ]
  }
})
