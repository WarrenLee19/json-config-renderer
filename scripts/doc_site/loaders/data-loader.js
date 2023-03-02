const fs = require('fs');
const path = require('path');
const sourceData = require('../utils/source-data');
const boss = require('./common/boss');

const pick = global.themeConfig.pick || [];

module.exports = function DataLoader(context, map, meta) {
  const markdown = sourceData.generate(global.siteConfig.source,  global.siteConfig.transformers);

  var callback = this.async();

  const picked = {};
  const pickedPromises = []; // Flag to remind loaders that job is done.

  sourceData.traverse(markdown, (filename) => {
    const fileContent = fs.readFileSync(path.join(process.cwd(), filename)).toString();
    pickedPromises.push(new Promise((resolve) => {
      boss.queue({
        filename,
        content: fileContent,
        transformers: global.siteConfig.transformers,
        isBuild: context.isBuild || false,
        callback(err, result) {
          const parsedMarkdown = eval(`(${result})`); // eslint-disable-line no-eval

          Object.keys(pick).forEach((key) => {
            if (!picked[key]) {
              picked[key] = [];
            }

            const picker = pick[key];
            const pickedData = picker(parsedMarkdown);
            if (pickedData) {
              picked[key].push(pickedData);
            }
          });

          resolve();
        },
      });
    }));
  });

  Promise.all(pickedPromises)
    .then(() => {
      const sourceDataString = sourceData.stringify(markdown, {
        lazyLoad: false,
      });
      callback(
        null,
        'module.exports = {' +
          `\n  markdown: ${sourceDataString},` +
          `\n  picked: ${JSON.stringify(picked, null, 2)},` +
          `\n  plugins: [\n\n],` +
          '\n};',
      );
    });
};
