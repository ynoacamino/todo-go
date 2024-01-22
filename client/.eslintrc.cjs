module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    "plugin:@tanstack/eslint-plugin-query/recommended"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope': 0,
    'react/function-component-definition':0,
    'linebreak-style': 0,
    'no-console': 0,
    'jsx-a11y/label-has-associated-control': 0,
    "react/jsx-no-constructed-context-values": 0,
    "react-hooks/exhaustive-deps": 0,
    "react/jsx-props-no-spreading": 0
  },
  parserOptions: {
    project: './tsconfig.json'
  }
}
