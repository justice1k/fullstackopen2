import globals from 'globals'
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin-js'
import { defineConfig } from 'eslint/config'


export default defineConfig([{
  plugins: {
    '@stylistic/js': stylisticJs,
  },
  rules: {
    '@stylistic/js/indent': ['error', 2],
    '@stylistic/js/linebreak-style': ['error', 'unix'],
    '@stylistic/js/quotes': ['error', 'single'],
    '@stylistic/js/semi': ['error', 'never'],
    eqeqeq: 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'no-console': 'off',
  },
},
js.configs.recommended,
{ files: ['**/*.js'], languageOptions: {
  sourceType: 'commonjs',
  globals: { ...globals.node },
  ecmaVersion: 'latest',
} },
{
  ignores: ['dist/**']
},
{ files: ['**/*.{js,mjs,cjs}'], languageOptions: { globals: globals.node } },
])