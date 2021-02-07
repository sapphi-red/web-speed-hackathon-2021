module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: '3',
        useBuiltIns: 'usage',
        loose: true,
        bugfixes: true,
      },
    ],
    [
      '@babel/preset-react',
      {
        development: process.env.BABEL_ENV === "development",
        runtime: 'automatic'
      },
    ],
    ...(process.env.BABEL_ENV === "production" ? [
      'transform-react-remove-prop-types'
    ] : [])
  ],
};
