module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "next/core-web-vitals",
    "plugin:react/recommended",
    "standard-with-typescript",
    "plugin:react/jsx-runtime",
  ],
  // "parser": "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"], // Specify it only for TypeScript files
  },
  plugins: [
    "react",
    "unused-imports",
    "simple-import-sort",
    "@typescript-eslint",
    "n",
  ],
  settings: {
    react: {
      pragma: "React", // Pragma to use, default to "React"
      fragment: "Fragment", // Fragment to use (may be a property of <pragma>), default to "Fragment"
      version: "detect", // React version. "detect" automatically picks the version you have installed.
      flowVersion: "0.53", // Flow version
    },
  },
  rules: {
    indent: "off",
    "@typescript-eslint/indent": ["error", 2],
    quotes: "off",
    "@typescript-eslint/comma-dangle": ["error", "always-multiline"],
    "comma-dangle": ["error", "always-multiline"],
    "@typescript-eslint/quotes": ["error", "double", { avoidEscape: true }],
    "member-delimiter-style": "off",
    "@typescript-eslint/member-delimiter-style": ["error", {
      multiline: {
        delimiter: "semi",
        requireLast: true,
      },
      singleline: {
        delimiter: "semi",
        requireLast: true,
      },
      overrides: {
        interface: {
          multiline: {
            delimiter: "semi",
            requireLast: true,
          },
        },
      },
    }],
    "react/jsx-curly-spacing": ["error", {
      when: "never",
      attributes: { allowMultiline: true },
      children: true,
    }],
    semi: "off",
    "@typescript-eslint/no-invalid-void-type": ["off"],
    "@typescript-eslint/semi": ["error", "always"],
    "explicit-function-return": "off",
    "@typescript-eslint/explicit-function-return": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-non-null-assertion": ["warn"],
    "unused-imports/no-unused-imports": "error",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/array-type": "off",
    "react/jsx-filename-extension": [1, { extensions: [".ts", ".tsx"] }],
    "no-unused-vars": "off",
    "@typescript-eslint/no-confusing-void-expression": ["off", { ignoreArrowShorthand: true, ignoreVoidOperator: true }],
    "@typescript-eslint/no-unused-vars": ["warn", { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }],
    "@typescript-eslint/promise-function-async": "off",
    "@typescript-eslint/ban-ts-comment": ["warn", { "ts-expect-error": "allow-with-description" }],
    "react/jsx-no-constructed-context-values": "error",
    "react/jsx-closing-bracket-location": "error",
    "react/jsx-closing-tag-location": "error",
    "react/jsx-curly-brace-presence": ["error", { propElementValues: "always", props: "never", children: "never" }],
    "react/jsx-curly-newline": ["error", "consistent"],
    "react/jsx-equals-spacing": "error",
    "react/jsx-first-prop-new-line": "error",
    "n/no-callback-literal": "off",
    "no-shadow": "error",
    // "eslint multiline-comment-style": ["error", "starred-block"],
    "no-restricted-imports": [ // imports must be absolute path
      "error",
      {
        patterns: [
          {
            group: ["../"], // "./import" is allowed
            message: "Relative imports are only allowed for elements in the same folder.",
          },
        ],
      },
    ],

    "max-len": ["warn", {
      code: 120, // Adjust this value to your preferred maximum line length
      ignoreComments: true, // Optionally, you can ignore comments
      ignoreTrailingComments: true, // Optionally, ignore trailing comments
      ignoreUrls: true, // Optionally, ignore URLs
      ignoreStrings: true, // Optionally, ignore string literals
      ignoreTemplateLiterals: true, // Optionally, ignore template literals
    }],
    "react/self-closing-comp": ["error", {
      component: true,
      html: false,
    }],
    "@typescript-eslint/explicit-function-return-type": "error",
    "simple-import-sort/imports": "error",
    "no-restricted-syntax": [
      "error",
      {
        selector: "TSEnumDeclaration",
        message: "No Enums are allowed. Use `const myEnum = { ... } as const` instead",
      },
    ],

  },
  ignorePatterns: [
    "src/components/ui/*", // Ignore external library components
    "*.d.ts", // Ignore definition files
  ],
  overrides: [
    {
      files: ["*.ts", "*.mts", "*.cts", "*.tsx"],
      rules: {
      },
    },
  ],
};
