module.exports = {
  presets: [
    ['@babel/env', {
      targets: {
        node: 'current',
        chrome: '58',
        ie: '9',
      },
    }],
  ],
};
