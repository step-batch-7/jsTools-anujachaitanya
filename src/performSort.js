const { parseUserArgs, sort } = require("./sortLib");

const sortForFile = function(streams, userOptions, error, data) {
  if (error) {
    return streams.error(`sort: No such a file or directory`);
  }
  const lines = data.split("\n");
  const sortedLines = sort(userOptions.options, lines);
  return streams.logger(sortedLines.join("\n"));
};

const sortForStdin = function(userOptions, streams) {
  let lines = "";
  streams.inputStream.on("data", data => {
    lines = lines.concat(data);
  });
  streams.inputStream.on("end", () => {
    lines = lines.split("\n");
    const sortedLines = sort(userOptions.options, lines);
    return streams.logger(sortedLines.join("\n"));
  });
};

const performSort = function(cmdLineArgs, fsTools, streams) {
  const userOptions = parseUserArgs(cmdLineArgs);
  if (userOptions.invalidOption) {
    return streams.error(
      `Option ${userOptions.invalidOption}: invalid options`
    );
  }
  if (userOptions.path) {
    return fsTools.reader(
      userOptions.path,
      fsTools.encoding,
      sortForFile.bind(null, streams, userOptions)
    );
  }
  return sortForStdin(userOptions, streams);
};

module.exports = { performSort, sortForFile };
