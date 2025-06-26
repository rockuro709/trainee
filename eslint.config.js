//eslint.config.js
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";

export default [
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
];
