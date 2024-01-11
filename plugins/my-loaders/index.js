module.exports = function (context, options) {
  return {
    name: 'my-loaders',
    configureWebpack(config, isServer) {
      config.resolve.alias.canvas = false
      config.resolve.alias.encoding = false
      return {
        module: {
          rules: [
            {
              test: /\.m?js/,
              resolve: {
                fullySpecified: false
              }
            },
          ],
        },
      };
    },
  };
};