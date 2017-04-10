const configuration = require('./lib/index').default;

function parseMime(str) {
  if (/yaml/.test(str)) return 'yaml';
  if (/yml/.test(str)) return 'yaml';
  if (/ini/.test(str)) return 'ini';
  if (/toml/.test(str)) return 'toml';
  if (/json/.test(str)) return 'json';
  if (/plist/.test(str)) return 'plist';
  return null;
}

exports.convert = function(event, context, cb) {
  const query = event.queryStringParameters || {};
  const mimeInput = query.inputFormat || parseMime(event.headers['Content-Type']) || 'json';
  const mimeOutput = query.outputFormat || parseMime(event.headers['Accept']) || 'yaml';
  const inp = event.body;
  const inputFormat = configuration[mimeInput];
  const outputFormat = configuration[mimeOutput];
  cb(null, {
    statusCode: 200,
    body: outputFormat.stringify(inputFormat.parse(inp))
  });
};
