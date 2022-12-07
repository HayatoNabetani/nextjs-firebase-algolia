/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
        container: {
            center: true,
            padding: {
                DEFAULT: "16px",
                md: "24px",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/line-clamp"),
    ],
};
