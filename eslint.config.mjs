import globals from "globals";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: globals.browser,
    },
    rules: {
      // Custom rules
      "no-console": "warn", // Warn on console statements
      "quotes": ["error", "double"], // Enforce double quotes
      "semi": ["error", "always"], // Enforce semicolons
      "indent": ["error", 2], // Enforce 2 spaces for indentation
      "react/prop-types": "off", // Disable React prop-types validation
      "react/jsx-uses-react": "off", // Disable for React 17+
      "react/react-in-jsx-scope": "off", // Disable for React 17+
    },
    plugins: {
      react: pluginReact,
    },
    settings: {
      react: {
        version: "detect", // Automatically detect React version
      },
    },
  },
];
