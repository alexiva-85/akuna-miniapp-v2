/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './external/akuna-pay-pilot/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  prefix: "",
  safelist: [
    { pattern: /(bg|text|border)-(primary|secondary|muted|card|foreground)$/ },
    { pattern: /(rounded|shadow)(-|$).*/ },
    { pattern: /^(p|px|py|m|mx|my)-(0|1|2|3|4|6|8|12)$/ },
    { pattern: /^h-(10|11|12|14)$/ },
    { pattern: /^w-(10|11|12|14|16|20|24)$/ },
    { pattern: /^gap-(1|2|3|4|6|8)$/ },
    { pattern: /^space-y-(1|2|3|4|6|8)$/ },
    { pattern: /^grid-cols-(1|2|3|4)$/ },
    { pattern: /^flex-(1|col|row)$/ },
    { pattern: /^items-(center|start|end)$/ },
    { pattern: /^justify-(center|between|around)$/ },
    { pattern: /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl)$/ },
    { pattern: /^font-(medium|semibold|bold)$/ },
    { pattern: /^cursor-(pointer|default)$/ },
    { pattern: /^transition-(colors|all)$/ },
    { pattern: /^hover:bg-(card|muted)/ },
    { pattern: /^animate-(spin|pulse)$/ },
    { pattern: /^border-(b|t|l|r)$/ },
    { pattern: /^opacity-(0|50|60|70|90|100)$/ },
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
