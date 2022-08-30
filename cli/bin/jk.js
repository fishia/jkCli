#! /usr/bin/env node
const yParser = require('yargs-parser');

const program = require('commander');
const package = require('../package.json');

const args = yParser(process.argv.slice(2));
const script = args._[0] || 0;
const project = args._[1];

const run = require('../lib/run.js');

program.version(package.version).usage('<command>');

program.command('new (template)').description('create a project');

program.parse(process.argv);

switch (script) {
    case 'new':
        run({ name: project });
        break;
    default:
        program.help();
        break;
}
