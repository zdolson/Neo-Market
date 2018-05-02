module.exports = {
  webpack: (config, { dev }) => {
    config.module.rules.push(
      {
        test: /\.(css|scss)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      },
      {
        test: /\.css$/,
        loader: 'babel-loader!raw-loader'
      },
      {
        test: /\.scss$/,
        loader: 'babel-loader!raw-loader!sass-loader'
      },
      {
        test: /\.svg$/,
        loader: 'babel-loader!svg-react-loader'
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'babel-loader!file-loader'
      }
    )
    return config
  }
}
