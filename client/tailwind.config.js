/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [require('daisyui'), require('@tailwindcss/line-clamp')],
    daisyui: {
        themes: [
            {
                light: {
                    ...require('daisyui/src/theming/themes')[
                        '[data-theme=light]'
                    ],
                    primary: '#000000',
                    secondary: 'red',
                    accent: '#4CFF00',
                },
                dark: {
                    ...require('daisyui/src/theming/themes')[
                        '[data-theme=dark]'
                    ],
                    primary: '#ffffff',
                    secondary: 'red',
                    accent: '#4CFF00',
                },
            },
        ],
        base: true,
        styled: true,
        utils: true,
    },
};
