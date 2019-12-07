module.exports = {
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx']
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader'
    },
  ]
  },
  devServer: {
    compress: true,
    disableHostCheck: true
 }
}
