module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        'plugin:prettier/recommended',
        '@vue/prettier',
        'prettier',
        'eslint:recommended'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    plugins: ['prettier', 'vue'],
    rules: {
        'no-console': 0,
        'no-duplicate-case': 2,
        'no-empty-function': 2,
        'no-unreachable': 2,
        'no-empty': 2,
        'no-dupe-args': 2,
        'no-else-return': 0,
        'no-debugger': 0,
        'no-prototype-builtins': 0,
        'no-inner-declarations': 0,
        'prettier/prettier': 0
    },
    globals: {
        debugger: true,
        document: true,
        localStorage: true,
        window: true,
        __TAGS__: true,
        __COMMIT__: true,
        __BRANCH__: true,
        __BUILDDATE__: true,
        __VERSION__: true
    }
};
