const { sort } = require('./src/executeSort');
const [, , ...cmdLineArgs] = process.argv;
const fs = require('fs');
const main = function ()
{
  sort(cmdLineArgs, fs.createReadStream, ({ error, contents }) =>
  {
    process.stdout.write(contents);
    process.stderr.write(error);
  });
};

main();
