/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      fontSize: {
        xs: "0.7rem", // reduced from 0.75rem
        sm: "0.85rem", // reduced from 0.875rem
        base: "0.95rem", // reduced from 1rem
        lg: "1rem", // reduced from 1.125rem
        xl: "1.1rem", // reduced from 1.25rem
        "2xl": "1.3rem", // reduced from 1.5rem
        "3xl": "1.65rem", // reduced from 1.875rem (was used for game titles)
        "4xl": "2rem", // reduced from 2.25rem
        "5xl": "2.4rem", // reduced from 3rem (Hero heading)
        "6xl": "2.8rem", // reduced from 3.75rem
        "7xl": "3.2rem", // reduced from 4.5rem (Hero heading on xl)
        "8xl": "3.6rem", // reduced from 6rem
        "9xl": "4rem", // reduced from 8rem
      },
    },
  },
};
