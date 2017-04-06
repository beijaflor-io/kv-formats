"use strict";
exports.__esModule = true;
var _ini = require("ini");
var _qs = require("qs");
var _toml = require("toml-js");
var _yaml = require("yamljs");
var json = {
    parse: function (inp) {
        return JSON.parse(inp);
    },
    stringify: function (obj) {
        return JSON.stringify(obj, null, 2);
    }
};
var querystring = {
    parse: function (inp) {
        return _qs.parse(inp);
    },
    stringify: function (obj) {
        return _qs.stringify(obj);
    }
};
var yaml = {
    parse: function (inp) {
        return _yaml.parse(inp);
    },
    stringify: function (obj) {
        return _yaml.stringify(obj);
    }
};
var toml = {
    parse: function (inp) {
        return _toml.parse(inp);
    },
    stringify: function (obj) {
        return _toml.dump(obj);
    }
};
var ini = {
    parse: function (inp) {
        return _ini.parse(inp);
    },
    stringify: function (obj) {
        return _ini.stringify(obj);
    }
};
exports["default"] = ;
var configuration = {
    querystring: querystring,
    yaml: yaml,
    yml: yaml,
    toml: toml,
    ini: ini,
    json: json
};
// const [from, to] = process.argv.slice(2);
// const inputName = path.extname(from).slice(1);
// const inputFormat = configuration[inputName];
// const input = fs.readFileSync(from).toString();
// const obj = inputFormat.parse(input);
// const outputName = path.extname(to).slice(1);
// const outputFormat = configuration[outputName];
