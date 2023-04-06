module.exports = {
    presets: ['@vue/app'],
    plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-syntax-dynamic-import'
    ]
};
