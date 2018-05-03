import webpack from 'webpack';

export const modifyWebpackConfig = ({ config, stage }) => {
  config.plugin('define-plugin', x => new webpack.DefinePlugin(x), [
    {
      'global.GENTLY': false
    }
  ]);

  switch (stage) {
    case 'build-javascript':
      const app = config._config.entry.app;
      config._config.entry.app = [require.resolve('./polyfills'), app];

      break;
    default:
      break;
  }

  return config;
};
