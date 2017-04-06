import * as fs from 'fs'
import * as path from 'path'

import * as _ini from 'ini';
import * as _qs from 'qs';
import * as _toml from 'toml-js';
import * as _yaml from 'yamljs';

interface ConfigReader {
  parse(inp: string): object;
}

interface ConfigWriter {
  stringify(obj: object): string;
}

const json: ConfigReader & ConfigWriter = {
  parse(inp) {
    return JSON.parse(inp);
  },

  stringify(obj) {
    return JSON.stringify(obj, null, 2);
  }
}

const querystring: ConfigReader & ConfigWriter = {
  parse(inp) {
    return _qs.parse(inp);
  },

  stringify(obj) {
    return _qs.stringify(obj);
  }
}

const yaml: ConfigReader & ConfigWriter = {
  parse(inp) {
    return _yaml.parse(inp);
  },

  stringify(obj) {
    return _yaml.stringify(obj);
  }
}

const toml: ConfigReader & ConfigWriter = {
  parse(inp) {
    return _toml.parse(inp);
  },

  stringify(obj) {
    return _toml.dump(obj);
  }
}

const ini: ConfigReader & ConfigWriter = {
  parse(inp) {
    return _ini.parse(inp);
  },

  stringify(obj) {
    return _ini.stringify(obj);
  }
}

export default const configuration = {
  querystring,
  yaml,
  yml: yaml,
  toml,
  ini,
  json,
}

// const [from, to] = process.argv.slice(2);

// const inputName = path.extname(from).slice(1);
// const inputFormat = configuration[inputName];
// const input = fs.readFileSync(from).toString();
// const obj = inputFormat.parse(input);
// const outputName = path.extname(to).slice(1);
// const outputFormat = configuration[outputName];
