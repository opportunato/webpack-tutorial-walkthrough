const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require("webpack");

module.exports = {
    
  context: __dirname + "/frontend",
    
  entry: {
      home:  "./home",
      about: "./about",
  },

  output: {
    path: __dirname + "/public",
    filename: "[name].js",
    library: "[name]",
  },

  watch: NODE_ENV == 'development',

  devtool: "development" ? "cheap-inline-module-source-map" : null,

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({ 
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "common"
    }),
  ],

  module: {
    loaders: [{
      test:    /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader:  'babel',
      query: {
        presets: ['react', 'es2015'],
        plugins: ['transform-runtime'] // doesn't work for some reason
      }
    }]
  }
}

if (NODE_ENV == 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    })
  );
}