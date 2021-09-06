const withNx = require("@nrwl/next/plugins/with-nx");

const nextConfig = {
  nx: {
    svgr: true,
  },
};

module.exports = withNx(nextConfig);
