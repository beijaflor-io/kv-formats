"use strict";
exports.__esModule = true;
var program = require("commander");
var index_1 = require("./index");
var path = require("path");
var fs = require("fs");
program
    .usage('kv-formats [options] <input-file> [output-file]')
    .option('-i, --input-format <input-format>')
    .option('-o, --output-format <output-format>')
    .parse(process.argv);
if (!program.inputFormat && !program.args[0]) {
    console.error('  ERROR: Missing either --input-format or <input-file>');
    program.help();
}
if (!program.outputFormat && !program.args[1]) {
    console.error('  ERROR: Missing either --output-format or <output-file>');
    program.help();
}
var inputFormat = program.inputFormat || path.extname(program.args[0]).slice(1);
var outputFormat = program.outputFormat || path.extname(program.args[1]).slice(1);
var inputStream = program.args[0] ? fs.createReadStream(program.args[0]) : process.stdin;
var outputStream = program.args[1] ? fs.createWriteStream(program.args[1]) : process.stdout;
if (!index_1["default"][outputFormat]) {
    console.error("  ERROR: Invalid format " + outputFormat);
    console.error("    Supported Formats:");
    Object.keys(index_1["default"]).forEach(function (f) {
        console.error("      - " + f);
    });
}
if (!index_1["default"][inputFormat]) {
    console.error("  ERROR: Invalid format " + inputFormat);
    console.error("    Supported Formats:");
    Object.keys(index_1["default"]).forEach(function (f) {
        console.error("      - " + f);
    });
}
var input = '';
inputStream.on('data', function (d) { return input += d; });
inputStream.on('end', function () {
    var output = index_1["default"][outputFormat].stringify(index_1["default"][inputFormat].parse(input));
    outputStream.write(output);
});
