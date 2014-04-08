"use strict";

var chalk = require('chalk');

module.exports = {
  reporter: function (error, data, options) {

    options = options || {};
    var msg;
    var result = [
      '',
      chalk.underline(error.context_mark.name),
      chalk.yellow('Error ' + error.context + '. line: ' + error.context_mark.line + ', col: ' + error.context_mark.column),
      [
        '',
        chalk.gray('line ' + error.problem_mark.line),
        chalk.gray('col ' + error.problem_mark.column),
        chalk.blue(error.message)
      ].join('  ')
    ];
    if(options.verbose) {
      result = result.concat([
        '',
        chalk.grey(error.problem_mark.buffer)
      ]);
    }

    msg = result.join('\n');

    console.log(msg + '\n');
  }
};