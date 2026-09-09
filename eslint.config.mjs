import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

export default defineConfig([
  globalIgnores([
    // Trees inside the repo that are not part of the application.
    'Context/**',
    'archive/**',
    // The design workspace is plain hand-written HTML/CSS/JS with no build step;
    // linting it against the Next/React rule set produces only noise.
    'design/**',
    'tools/**',
    // Defaults of eslint-config-next, restated because globalIgnores overrides them.
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Generated / binary.
    'public/media/**',
  ]),
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    rules: {
      // Deliberate: static export plus build-time derivatives, so next/image is bypassed.
      '@next/next/no-img-element': 'off',
    },
  },
]);
