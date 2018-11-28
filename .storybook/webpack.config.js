const path = require('path')

module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.less$/,
    loaders: [
      { loader: 'style-loader' },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          modules: true,
          localIdentName: '[local]___[hash:base64:5]',
        },
      },
      {
        loader: 'less-loader',
      },
    ],
  })
  config.module.rules.push({
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file-loader?minetype=image/svg+xml',
  })
  config.module.rules.push({
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file-loader?minetype=application/octet-stream',
  })
  config.module.rules.push({
    test: /\.(jpe?g|png|gif)$/i,
    loader: 'file-loader',
  })
  config.resolve.extensions.push('.less')
  return config
}
