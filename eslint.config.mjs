import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // The abandoned first build. Kept in place per instruction, but it is a
    // separate project with its own tooling and must not be part of the root
    // site's type-check, lint or build graph.
    "Website/**",
  ]),
]);

export default eslintConfig;
