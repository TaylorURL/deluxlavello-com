/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  // The stylesheet carries its own element base, written against these pages
  // before Tailwind was here: lists in prose keep their markers and headings keep
  // the sizes the components give them. Preflight would reset both. `container`
  // is a component name on this site, not Tailwind's breakpoint box.
  corePlugins: { preflight: false, container: false },
  theme: {
    extend: {
      // Every colour is a semantic token that the three themes redefine, so a
      // utility follows the theme the reader picked.
      colors: {
        ground: 'var(--bg)',
        raised: 'var(--bg-raised)',
        surface: 'var(--surface)',
        ink: 'var(--text)',
        soft: 'var(--text-soft)',
        line: 'var(--line)',
        accent: { DEFAULT: 'var(--accent)', strong: 'var(--accent-strong)' },
        'accent-ink': { DEFAULT: 'var(--accent-ink)', strong: 'var(--accent-ink-strong)' },
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
      // Sizes only: the line height comes from the element, as it always has.
      fontSize: {
        xs: 'var(--text-xs)',
        sm: 'var(--text-sm)',
        base: 'var(--text-base)',
        md: 'var(--text-md)',
        lg: 'var(--text-lg)',
        xl: 'var(--text-xl)',
        hero: 'var(--text-hero)',
      },
      letterSpacing: {
        display: 'var(--tracking-display)',
        label: 'var(--tracking-label)',
        micro: 'var(--tracking-micro)',
      },
      maxWidth: {
        shell: 'var(--container)',
        narrow: 'var(--container-narrow)',
      },
    },
  },
  plugins: [],
};
