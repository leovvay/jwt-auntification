module.exports = {
    env: {
      browser: true,
      es6: true,
    },
    extends: ['airbnb', 'prettier', 'eslint-config-prettier'],
    plugins: ['react', 'react-hooks'],
    settings: {
      'import/resolver': {
        node: {
          paths: ['src'],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    rules: {
      'react/jsx-filename-extension': [1, {'extensions': ['.js', '.jsx']}],
      'no-console': ['error', { allow: ['warn', 'error']}],
    }
  };
  