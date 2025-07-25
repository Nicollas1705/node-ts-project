// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    rules: {
      'indent': ['warn', 2],  
      'semi': ['warn', 'always'],
      'quotes': ['warn', 'single'],
      'linebreak-style': ['warn', 'unix'],
      '@typescript-eslint/no-empty-object-type': ['off'],
      '@typescript-eslint/no-unused-vars': ['warn'],
    },
  }
);

// import js from '@eslint/js';
// import globals from 'globals';
// import tseslint from 'typescript-eslint';
// import json from '@eslint/json';
// import markdown from '@eslint/markdown';
// import css from '@eslint/css';
// import { defineConfig } from 'eslint/config';

// export default defineConfig([
//   { files: ['**/*.{js,mjs,cjs,ts,mts,cts}'], plugins: { js }, extends: ['js/recommended'], languageOptions: { globals: globals.node } },
//   tseslint.configs.recommended,
//   { files: ['**/*.json'], plugins: { json }, language: 'json/json', extends: ['json/recommended'] },
//   { files: ['**/*.jsonc'], plugins: { json }, language: 'json/jsonc', extends: ['json/recommended'] },
//   { files: ['**/*.md'], plugins: { markdown }, language: 'markdown/gfm', extends: ['markdown/recommended'] },
//   { files: ['**/*.css'], plugins: { css }, language: 'css/css', extends: ['css/recommended'] },
//   { rules: {
//     'indent': ['warn', 2],  
//     'semi': ['warn', 'always'],
//     'quotes': ['warn', 'single'],
//     'linebreak-style': ['warn', 'unix'],
//     '@typescript-eslint/no-empty-object-type': ['off'],
//     '@typescript-eslint/no-unused-vars': ['warn'],
//   }}
// ]);
