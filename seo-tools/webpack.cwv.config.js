const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Enterprise Core Web Vitals: Webpack Code Splitting Config
 * 
 * Goal: Keep the main bundle as small as possible to ensure fast FCP and LCP.
 * Extract vendors (React, Lodash) into separate cacheable chunks.
 */
module.exports = {
  entry: './src/index.js',
  output: {
    // Use contenthash for long-term browser caching
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    moduleIds: 'deterministic', // Keep module hashes consistent across builds
    runtimeChunk: 'single',     // Extract Webpack runtime into its own small chunk
    splitChunks: {
      chunks: 'all',            // Split ALL chunks (both async and initial)
      maxInitialRequests: Infinity,
      minSize: 20000,           // Don't split files smaller than 20kb
      cacheGroups: {
        // 1. React & ReactDOM Vendor Chunk (Changes rarely)
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'vendor-react',
          chunks: 'all',
          priority: 20,
        },
        // 2. Heavy Utility Libraries (e.g., Lodash, Moment)
        utilsVendor: {
          test: /[\\/]node_modules[\\/](lodash|moment)[\\/]/,
          name: 'vendor-utils',
          chunks: 'all',
          priority: 15,
        },
        // 3. Fallback for all other node_modules
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor-default',
          chunks: 'all',
          priority: 10,
        },
        // 4. Shared components used across multiple pages
        default: {
          minChunks: 2,         // If a module is used in 2+ places, extract it
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // Minify HTML for extra speed
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
      }
    }),
  ],
};
