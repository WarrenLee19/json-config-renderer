const context = require('../context');
const boss = require('./common/boss');

module.exports = function sourceLoader(content, map, meta) {
  if (this.cacheable) {
    this.cacheable();
  }

  const callback = this.async();
  boss.queue({
    filename: this.resourcePath,
    content: content,
    plugins: [],
    transformers: [],
    isBuild: context.isBuild,
    callback(err, result) {
      callback(err, `module.exports = ${result};`);
    },
  });
};
