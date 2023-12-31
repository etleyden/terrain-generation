module.exports = {
  entry: "./src/index.js",
  output: {
      path: __dirname,
      filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                "@babel/preset-env"
              ]
            ]
          }
        }
      },
      {
        test: /\.m?js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      }
    ]
  }
};
