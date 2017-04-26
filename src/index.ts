import * as Bluebird from 'bluebird';
import * as fs from 'fs'
import * as path from 'path'

import * as _ini from 'ini';
import * as _plist from 'plist';
import * as _qs from 'qs';
import * as _toml from 'toml-js';
import * as _yaml from 'yamljs';

Bluebird.promisifyAll(fs);

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
};

const environment: ConfigReader & ConfigWriter = {
  parse(inp) {
    return inp.split('\n');
  },

  stringify(obj) {
    return _qs.stringify(obj);
  }
};


const querystring: ConfigReader & ConfigWriter = {
  parse(inp) {
    return _qs.parse(inp);
  },

  stringify(obj) {
    return _qs.stringify(obj);
  }
};

const yaml: ConfigReader & ConfigWriter = {
  parse(inp) {
    return _yaml.parse(inp);
  },

  stringify(obj) {
    return _yaml.stringify(obj);
  }
};

const toml: ConfigReader & ConfigWriter = {
  parse(inp) {
    return _toml.parse(inp);
  },

  stringify(obj) {
    return _toml.dump(obj);
  }
};

const ini: ConfigReader & ConfigWriter = {
  parse(inp) {
    return _ini.parse(inp);
  },

  stringify(obj) {
    return _ini.stringify(obj);
  }
};

const plist: ConfigReader & ConfigWriter = {
  parse(inp) {
    return _plist.parse(inp);
  },

  stringify(obj) {
    return _plist.build(obj);
  }
};

const configuration = {
  querystring,
  yaml,
  yml: yaml,
  toml,
  ini,
  json,
  plist,
};

export default configuration;

export async function readFileAuto(fp) {
  const extname = path.extname(fp).slice(1);
  const input = await (<any>fs).readFileAsync(fp).toString();
  return configuration[extname].parse(input);
}

export function writeFileAuto(fp, contents) {
  const extname = path.extname(fp).slice(1);
  const output = configuration[extname].stringify(contents);
  return (<any>fs).writeFileAsync(fp, output);
}
