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
  ]),
  // Custom rule overrides
  {
    rules: {
      // Deaktiviert: Diese Regel ist zu strikt für Standard-React-Patterns
      // wie setMounted(true) in useEffect für Portal/SSR-Hydration
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
