/* eslint-disable no-undef */
/* eslint import/no-extraneous-dependencies: ["off"] */
const path = require('path');
const mix = require('laravel-mix');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'js/')
  .sass('resources/sass/app.scss', 'css/')
  .extract([
    'vue',
    'vuex',
    'axios',
    'lodash',
    'element-ui',
    'vue-router',
  ])
  .sourceMaps()
  .setResourceRoot()
  .webpackConfig({
    resolve: {
      alias: {
        styles: path.resolve(__dirname, 'resources/sass'),
        app: path.resolve(__dirname, 'resources/js'),
      },
    },
    plugins: mix.inProduction() ? [
      new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
    ] : [],
  });

if (mix.inProduction()) {
  mix.version();
}
