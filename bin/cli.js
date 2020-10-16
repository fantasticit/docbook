#!/usr/bin/env node

const program = require('commander');
const dev = require('../lib/scripts/dev')
const build = require('../lib/scripts/build')

const commands = [
  {
    command: `dev`,
    options: [],
    description: '本地开发文档',
    action: dev,
  },
  {
    command: `build`,
    options: [],
    description: '打包编译文档',
    action: build,
  },
];

commands.forEach((command) => {
  let cmd = program.command(command.command);

  if (command.alias) {
    cmd.alias(command.alias);
  }

  if (command.description) {
    cmd.description(command.description);
  }

  if (command.options && command.options.length) {
    command.options.forEach((option) => {
      cmd.option.apply(cmd, option);
    });
  }

  cmd.action(command.action);
});

program.arguments('<command>').action((cmd) => {
  program.outputHelp();
  console.log('');
  console.log(`  ` + chalk.red(`未知命令 ${chalk.yellow(cmd)}.`));
  console.log();
});

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

program.parse(process.argv);
