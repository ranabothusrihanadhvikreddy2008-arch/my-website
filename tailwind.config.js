/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FBF8EF',
          100: '#F5EED6',
          200: '#EBDCAE',
          300: '#DFC681',
          400: '#D4AF37', // Brand Primary
          500: '#E5B544', // Brand Bright Button
          600: '#B88B24',
          700: '#8E6719',
          800: '#644712',
          900: '#3D2A0B',
          950: '#261805',
        },
        obsidian: {
          950: '#0C0A09', // Main Dark Canvas
          900: '#14110E', // Surface
          850: '#1A1612', // Card Surface
          800: '#231D17', // Hover Surface
          750: '#2D251E', // Borders
          700: '#3D3228', // Distinct Borders
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        royal: '0.18em',
        eyebrow: '0.22em',
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.25)',
        'gold-glow-lg': '0 0 35px rgba(229, 181, 68, 0.4)',
        'luxury-card': '0 10px 30px -10px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(212, 175, 55, 0.1)',
      },
      backgroundImage: {
        'gold-metallic': 'linear-gradient(135deg, #F5D37C 0%, #D4AF37 50%, #A87A1E 100%)',
        'gold-sheen': 'linear-gradient(90deg, #D4AF37 0%, #FFF2CC 50%, #D4AF37 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(26, 22, 18, 0.95) 0%, rgba(18, 15, 12, 0.98) 100%)',
      }
    },
  },
  plugins: [],
}
