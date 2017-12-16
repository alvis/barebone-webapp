exports.modifyWebpackConfig = ({ config, stage }) => {
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
