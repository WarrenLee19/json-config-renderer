const sourceData = require('../../utils/source-data');
const stringify = require('../../utils/stringify');
const markdownTransformer = require("../../transformers/markdown");

process.on('message', (task) => {
  const {
    filename,
    content,
    plugins,
    transformers,
    isBuild,
  } = task;
  const parsedMarkdown = sourceData.process(
    filename,
    content,
    plugins,
      [{
        test: /\.(md)/,
        exclude: /node_modules/,
        use: markdownTransformer
      }],
    isBuild,
  );
  const result = stringify(parsedMarkdown);
  process.send(result);
});
