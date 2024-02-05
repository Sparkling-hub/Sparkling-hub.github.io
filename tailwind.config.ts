import type { Config } from 'tailwindcss'


const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
    "./data/**/*.{js,ts,jsx,tsx}"
  
  ],
  
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: { 
        '4xl': '2rem',
        '50procent': '50%'
      },
    
      backgroundColor: {
        'primary-light-light': '#CBF0E9',
        'primary-dark': '#285c5c',
        'active-office-color': '#C73926',
        // 'partner-office-color': '#D3E5EB',
        'partner-office-color': '#3498db',
      },
      borderColor: {
        'primary-light-light': '#CBF0E9',
        'primary-dark': '#285c5c',
        'active-office-color': '#C73926',
        // 'partner-office-color': '#D3E5EB',
        'partner-office-color': '#3498db',
      },
      colors: {
        primary: {
          light: '#86C0BB', 
          yellow: '#AECA13',
          darkTeal:'#1A5858'      
        },
      },
      animations: {
        fadeInHeight: 'fadeInHeight 1s ease-in-out',
        fadeOutHeight: 'fadeOutHeight 1s ease-in-out',
      },
      keyframes: {
        fadeInHeight: {
          '0%': { height: '0' },
          '100%': { height: '100%' },
        },
        fadeOutHeight: {
          '0%': { height: '100%' },
          '100%': { height: '0' },
        },}
    }, 
  },
  plugins: [],
}
export default config
