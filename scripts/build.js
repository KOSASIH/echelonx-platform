const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const config = require('../webpack.config.prod');

const buildDir = path.resolve(__dirname, '../dist');

fs.emptyDirSync(buildDir);

webpack(config, (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  console.log(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  }));
});
