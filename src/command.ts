import * as program from 'commander';
import kvFormats from './index';
import * as path from 'path';
import * as fs from 'fs';

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

const inputFormat = program.inputFormat || path.extname(program.args[0]).slice(1);
const outputFormat = program.outputFormat || path.extname(program.args[1]).slice(1);
const inputStream = program.args[0] ? fs.createReadStream(program.args[0]) : process.stdin;
const outputStream = program.args[1] ? fs.createWriteStream(program.args[1]) : process.stdout;

if (!kvFormats[outputFormat]) {
  console.error(`  ERROR: Invalid format ${outputFormat}`);
  console.error(`    Supported Formats:`);
  Object.keys(kvFormats).forEach((f) => {
    console.error(`      - ${f}`);
  });
}

if (!kvFormats[inputFormat]) {
  console.error(`  ERROR: Invalid format ${inputFormat}`);
  console.error(`    Supported Formats:`);
  Object.keys(kvFormats).forEach((f) => {
    console.error(`      - ${f}`);
  });
}

let input = '';
inputStream.on('data', (d) => input += d);
inputStream.on('end', () => {
  const output = kvFormats[outputFormat].stringify(kvFormats[inputFormat].parse(input));
  outputStream.write(output);
});
