"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Bluebird = require("bluebird");
var fs = require("fs");
var path = require("path");
var _ini = require("ini");
var _plist = require("plist");
var _qs = require("qs");
var _toml = require("toml-js");
var _yaml = require("yamljs");
Bluebird.promisifyAll(fs);
var json = {
    parse: function (inp) {
        return JSON.parse(inp);
    },
    stringify: function (obj) {
        return JSON.stringify(obj, null, 2);
    }
};
var environment = {
    parse: function (inp) {
        return inp.split('\n');
    },
    stringify: function (obj) {
        return _qs.stringify(obj);
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
var configuration = {
    querystring: querystring,
    yaml: yaml,
    yml: yaml,
    toml: toml,
    ini: ini,
    json: json,
    plist: plist
};
exports["default"] = configuration;
function readFileAuto(fp) {
    return __awaiter(this, void 0, void 0, function () {
        var extname, input;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    extname = path.extname(fp).slice(1);
                    return [4 /*yield*/, fs.readFileAsync(fp).toString()];
                case 1:
                    input = _a.sent();
                    return [2 /*return*/, configuration[extname].parse(input)];
            }
        });
    });
}
exports.readFileAuto = readFileAuto;
function writeFileAuto(fp, contents) {
    var extname = path.extname(fp).slice(1);
    var output = configuration[extname].stringify(contents);
    return fs.writeFileAsync(fp, output);
}
exports.writeFileAuto = writeFileAuto;
