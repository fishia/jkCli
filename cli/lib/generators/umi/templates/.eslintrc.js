module.exports = {
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            legacyDecorators: true,
        },
    },
    extends: ['@vtx/vortex', 'plugin:react/recommended'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    globals: {
        OPERATE_INFO: true,
    },
    rules: {
        'react/prop-types': 'off',
        'no-duplicate-imports': 'off',
        'react/display-name': 'off',
    },
};
