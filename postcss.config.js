const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    postcssPresetEnv({
      features: {
        'all-property': true,
        'nesting-rules': true,
        'custom-properties': true,
      },
    }),
  ],
  options: {},
}
