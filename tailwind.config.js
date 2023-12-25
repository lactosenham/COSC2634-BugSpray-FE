module.exports = {
    content: ["./views/**/*.{ejs,js}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: "#eff6ff",
                    100: "#dbeafe",
                    200: "#bfdbfe",
                    300: "#93c5fd",
                    400: "#60a5fa",
                    500: "#3b82f6",
                    600: "#2563eb",
                    700: "#1d4ed8",
                    800: "#1e40af",
                    900: "#1e3a8a",
                    950: "#172554",
                },
                palette: {
                    1: '#fafafa',
                    2: '#1450a3',
                    3: '#0c4474',
                    4: '#041c44',
                }
            },
            fontFamily: {
                sans: [
                    "-apple-system",
                    "BlinkMacSystemFont",
                    '"Segoe UI"',
                    "Roboto",
                    '"Helvetica Neue"',
                    "Arial",
                    '"Noto Sans"',
                    "sans-serif",
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                    '"Noto Color Emoji"',
                ],
                serif: ["Georgia", "Cambria", '"Times New Roman"', "Times", "serif"],
                mono: [
                    "Menlo",
                    "Monaco",
                    "Consolas",
                    '"Liberation Mono"',
                    '"Courier New"',
                    "monospace",
                ],
            },
        },
    },
    plugins: [
        // require('flowbite/plugin'),
        function ({ addUtilities }) {
            addUtilities(
                {
                    '.center-and-half': {
                        width: '50%',
                        margin: '0 auto',
                    },
                },
                ['responsive', 'hover']
            );
        },
    ],
};
