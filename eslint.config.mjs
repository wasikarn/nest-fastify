import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import unusedImports from 'eslint-plugin-unused-imports'
import jestPlugin from 'eslint-plugin-jest'
import stylistic from '@stylistic/eslint-plugin'

const eslintRecommended = js.configs.recommended
const typescriptRecommended = [
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: false,
  }),
]
const plugins = {
  '@typescript-eslint': tseslint.plugin,
  'unused-imports': unusedImports,
  jest: jestPlugin,
  '@stylistic': stylistic,
}
const typescriptResolver = {
  settings: {
    typescript: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
  },
}
const parserOptions = {
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      project: './tsconfig.json',
    },
  },
}
const fileIgnores = {
  ignores: [
    '**/build/**',
    '**/dist/**',
    '**/node_modules/**',
    '**/*.config.mjs',
    '**/*.config.js',
    'package.json',
    'package-lock.json',
  ],
}
const rules = {
  'no-unused-vars': 'off',
  'no-undef': 'off',
  'no-return-await': 'error',
  'unused-imports/no-unused-imports': 'error',
  'unused-imports/no-unused-vars': [
    'warn',
    {
      vars: 'all',
      varsIgnorePattern: '^_',
      args: 'after-used',
      argsIgnorePattern: '^_',
    },
  ],
  '@typescript-eslint/no-explicit-any': 'error',
  '@stylistic/indent': ['error', 2],
  '@stylistic/operator-linebreak': 'off',
  '@stylistic/lines-between-class-members': ['error', 'always'],
  '@stylistic/padding-line-between-statements': [
    'error',
    { blankLine: 'always', prev: '*', next: 'return' },
    { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
    {
      blankLine: 'any',
      prev: ['const', 'let', 'var'],
      next: ['const', 'let', 'var'],
    },
    { blankLine: 'always', prev: 'directive', next: '*' },
    { blankLine: 'any', prev: 'directive', next: 'directive' },
    { blankLine: 'always', prev: ['case', 'default', 'if'], next: '*' },
    { blankLine: 'always', prev: '*', next: 'try' },
    { blankLine: 'always', prev: 'try', next: '*' },
    { blankLine: 'always', prev: '*', next: 'throw' },
  ],
}
const jsFiles = {
  files: ['**/.js'],
  ...tseslint.configs.disableTypeChecked,
}
const testFiles = {
  files: ['test/**'],
  rules: { 'jest/prefer-expect-assertions': 'error' },
}

export default [
  eslintRecommended,
  ...typescriptRecommended,
  { plugins },
  typescriptResolver,
  parserOptions,
  fileIgnores,
  { rules },
  jsFiles,
  testFiles,
]
