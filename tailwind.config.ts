import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'

export default {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                'christmas-red': '#dc2626',
                'christmas-green': '#059669',
                'christmas-gold': '#f59e0b',
                'snow-white': '#fef7f7',
            },
            animation: {
                'pulse-christmas': 'pulse-christmas 2s infinite',
                'winner-celebration':
                    'winner-celebration 0.6s ease-in-out infinite',
                snowfall: 'snowfall linear infinite',
            },
            fontFamily: {
                geist: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                christmas:
                    '0 10px 25px rgba(220, 38, 38, 0.1), 0 10px 25px rgba(5, 150, 105, 0.1)',
                festive: '0 0 20px rgba(245, 158, 11, 0.3)',
            },
        },
    },
    plugins: [daisyui],
    daisyui: {
        themes: [
            {
                christmas: {
                    primary: '#dc2626',
                    secondary: '#059669',
                    accent: '#f59e0b',
                    neutral: '#374151',
                    'base-100': '#ffffff',
                    'base-200': '#f9fafb',
                    'base-300': '#e5e7eb',
                    info: '#3b82f6',
                    success: '#10b981',
                    warning: '#f59e0b',
                    error: '#ef4444',
                },
            },
            'dark',
        ],
    },
} satisfies Config
