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
  const mimeInput = query.inputType || parseMime(event.headers['Content-Type']);
  const mimeOutput = query.outputType || parseMime(event.headers['Accept']);
  const inp = event.body;

  if (!inp) {
    cb(null, {
      statusCode: 400,
      body: '400 Send some text\n',
    });
    return;
  }

  if (!mimeInput || !mimeOutput) {
    cb(null, {
      statusCode: 400,
      body: '400 Specify desired input and output in the query\n(`?outputType=...`/`?inputType=...`)\nor through the Accept/Content-Type headers\n',
    });
    return;
  }

  const inputFormat = configuration[mimeInput];
  if (!inputFormat) {
    cb(null, {
      statusCode: 400,
      body: `400 Invalid 'inputType' ${mimeInput}, send it with 'content-type' or '?inputType'\n`,
    });
    return;
  }
  const outputFormat = configuration[mimeOutput];
  if (!outputFormat) {
    cb(null, {
      statusCode: 400,
      body: `400 Invalid 'outputType' ${mimeOutput}, send it with 'accept' or '?outputType'\n`,
    });
    return;
  }

  let tmp;
  try {
    tmp = inputFormat.parse(inp);
  } catch (err) {
    cb(null, {
      statusCode: 422,
      body: `422 Failed to parse body as '${mimeInput}':\nError: ${err.message}\n`,
    });
    return;
  }

  let body;
  try {
    body = outputFormat.stringify(tmp);
  } catch (err) {
    cb(null, {
      statusCode: 422,
      body: `422 Failed to generate output '${mimeOutput}':\nError: ${err.message}\n`,
    });
    return;
  }

  cb(null, {
    statusCode: 200,
    headers: {
      'content-type': `application/${mimeOutput}`,
      'x-output-type': mimeOutput,
      'x-input-type': mimeInput,
    },
    body
  });
};
