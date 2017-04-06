"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var _plist = require("plist");
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
var plist = {
    parse: function (inp) {
        return _plist.parse(inp);
    },
    stringify: function (obj) {
        return _plist.build(obj);
    }
};
exports.configuration = {
    querystring: querystring,
    yaml: yaml,
    yml: yaml,
    toml: toml,
    ini: ini,
    json: json,
    plist: plist
};
var _a = process.argv.slice(2), outputName = _a[0], _from = _a[1];
var inputName = path.extname(_from).slice(1);
var inputFormat = exports.configuration[inputName];
var input = fs.readFileSync(_from).toString();
var obj = inputFormat.parse(input);
var outputFormat = exports.configuration[outputName];
console.log(outputFormat.stringify(obj));
