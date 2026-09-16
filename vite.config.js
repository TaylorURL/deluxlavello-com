import { readFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const here = (p) => fileURLToPath(new URL(p, import.meta.url));

const { version } = JSON.parse(readFileSync(here('./package.json'), 'utf8'));

// The browser chrome takes a literal colour, and a meta element cannot read a
// custom property. Lifting the value out of the token block at build time keeps
// the ground named in one place rather than two that drift apart.
const themeColor = readFileSync(here('./src/index.css'), 'utf8').match(
  /--delux-navy-950:\s*(#[0-9a-f]{3,8})/i,
)?.[1];

const shellValues = () => ({
  name: 'shell-values',
  transformIndexHtml: (html) => html.replace('<!--themecolor-->', themeColor ?? ''),
});

// The server build only needs the module graph; copying public/ into it would
// duplicate every asset outside dist.
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), shellValues()],
  build: {
    copyPublicDir: !isSsrBuild,
    target: 'es2022',
    modulePreload: { polyfill: false },
  },
  define: { __BUILD_VERSION__: JSON.stringify(version) },
  resolve: {
    alias: {
      '@app': here('./src/app'),
      '@components': here('./src/app/components'),
      '@sections': here('./src/app/components/sections'),
      '@views': here('./src/app/views'),
      '@constants': here('./src/app/constants'),
      '@context': here('./src/app/context'),
      '@hooks': here('./src/app/hooks'),
      '@lib': here('./src/app/lib'),
      '@i18n': here('./i18n'),
    },
  },
}));
