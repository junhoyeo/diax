const withSvgr = require('next-plugin-svgr');
const withInterceptStdout = require('next-intercept-stdout');

module.exports = withInterceptStdout(
  withSvgr({
    reactStrictMode: true,
  }),
  (text) => (text.includes('Duplicate atom key') ? '' : text),
);
