const Path = require('path');
const Fs = require('fs');
const Cp = require('child_process');
const Webpack = require('webpack');
const UnoCSS = require('@unocss/webpack').default;

function getGitInfo(tags) {
    let revision = {
        tags: '',
        commit: '',
        branch: ''
    };

    const gitPath = Path.resolve('../../../.git');

    try {
        Fs.accessSync(gitPath, Fs.constants.R_OK | Fs.constants.W_OK);
        (revision.tags = tags || Cp.execSync('git describe --tags --always', { encoding: 'utf8' })),
            (revision.commit = Cp.execSync('git rev-list --max-count=1 --no-merges HEAD', {
                encoding: 'utf8'
            }));
        revision.branch = Cp.execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' });
    } catch (err) {
        console.error(err);
    }

    return revision;
}

const gitInfo = getGitInfo(process.env.GIT_TAG);
const resolve = dir => {
    return Path.join(__dirname, './', dir);
};

module.exports = {
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    devServer: {
        port: 5080,
        disableHostCheck: true,
        overlay: {
            warnings: true,
            errors: true
        },
        proxy: {
            '/vr': {
                target: 'http://47.94.165.170/',
                changeOrigin: true,
                logLevel: 'debug'
            }
        }
    },
    css: {
        loaderOptions: {
            sass: {
                additionalData: `@import "./src/assets/style/basic/mixins.scss"; @import "./src/assets/style/basic/variables.scss";`
            }
        },
        extract: true
    },
    configureWebpack: {
        plugins: [UnoCSS()]
    },
    chainWebpack(config) {
        config.resolve.alias.set('@', resolve('src'));
        config.performance.set('hints', false);
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, { limit: 10240 }));
        config.plugin('ContextReplacementPlugin').use(
            new Webpack.ContextReplacementPlugin(/^\.\/locale$/, context => {
                if (!/\/moment\//.test(context.context)) return;
                Object.assign(context, {
                    regExp: /^\.\/\w+/,
                    request: '../../locale'
                });
            })
        );
        config
            .plugin('ContextReplacementPlugin')
            .use(new Webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(zh-cn)$/));
        config.plugin('DefinePlugin').use(
            new Webpack.DefinePlugin({
                __TAGS__: JSON.stringify(gitInfo.tags),
                __COMMIT__: JSON.stringify(gitInfo.commit.trim()),
                __BRANCH__: JSON.stringify(gitInfo.branch.trim()),
                __BUILDDATE__: JSON.stringify(new Date())
            })
        );
        config.plugin('html').tap(args => {
            args[0].template =
                process.env.NODE_ENV === 'production'
                    ? './src/template/pro.html'
                    : './src/template/dev.html';
            return args;
        });
        config.when(process.env.NODE_ENV === 'development', config => {
            config.devtool('source-map');
            config
                .plugin('CaseSensitivePathsPlugin')
                .use(require.resolve('case-sensitive-paths-webpack-plugin'));
        });
        config.when(process.env.NODE_ENV === 'production', config => {
            config.plugin('CompressionPlugin').use(require.resolve('compression-webpack-plugin'), [
                {
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: /\.(js|css|html|svg)$/,
                    threshold: 2048,
                    minRatio: 0.8
                }
            ]);
            config.optimization.minimizer('terser').use(require.resolve('terser-webpack-plugin'), [
                {
                    parallel: true,
                    test: /\.js(\?.*)?$/i,
                    terserOptions: {
                        compress: {
                            drop_debugger: true,
                            pure_funcs: ['console.log']
                        },
                        warnings: false,
                        output: {
                            keep_quoted_props: true
                        }
                    }
                }
            ]);
            config.optimization
                .minimizer('css')
                .use(require.resolve('optimize-css-assets-webpack-plugin'), [
                    {
                        assetNameRegExp: /\.css$/g,
                        cssProcessorOptions: {
                            safe: true,
                            autoprefixer: false,
                            discardComments: {
                                removeAll: true
                            }
                        },
                        cssProcessor: require('cssnano'),
                        cssProcessorPluginOptions: {
                            preset: [
                                'default',
                                { discardComments: { removeAll: true }, normalizeUnicode: false }
                            ]
                        },
                        canPrint: true
                    }
                ]);
            config.optimization.splitChunks({
                chunks: 'all',
                minSize: 20000,
                minChunks: 2,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                name: true,
                automaticNameDelimiter: '-',
                cacheGroups: {
                    libs: {
                        chunks: 'initial',
                        test: /[\\/]node_modules[\\/]/,
                        name: 'chunk-libs',
                        priority: 10,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    commons: {
                        test: /common\/|components\/|utils\//,
                        name: 'chunk-commons',
                        chunks: 'initial',
                        minChunks: 3,
                        priority: 5,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    elementUI: {
                        test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
                        name: 'chunk-element',
                        priority: 20,
                        enforce: true,
                        reuseExistingChunk: true,
                        chunks: 'all'
                    },
                    styles: {
                        name: 'styles',
                        test: /\.(sa|sc|c|le)ss$/,
                        chunks: 'all',
                        enforce: true,
                        reuseExistingChunk: true
                    }
                }
            });
            config.optimization.runtimeChunk('single');
        });
    },
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
};
