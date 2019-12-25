module.exports = {
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx']
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader'
     },
     {
      test: /\.(scss)$/,
      use: [
        {
          loader: 'style-loader' // css to dom
        },
        {
          loader: 'css-loader' // imports
        },
        {
          loader: 'sass-loader' // scss -> css
        }
      ]
    }
    ]
  },
  devServer: {
    compress: true,
    disableHostCheck: true
  }
}
