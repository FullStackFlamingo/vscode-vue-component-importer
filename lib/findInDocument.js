const findInLine = require('./findInLine');

module.exports = (regex, document, { reverse = false, range } = {}) => {
  if (!reverse) {
    let lineNo = 0;
    let lineNoMax = document.lineCount;
    if (range) {
      lineNo = range.start.line;
      lineNoMax = range.end.line + 1;
    }
    for (lineNo; lineNo < lineNoMax; lineNo += 1) {
      const match = findInLine(regex, document, lineNo);
      if (match) return match;
    }
  } else {
    let lineNo = document.lineCount - 1;
    let lineNoMin = 0;
    if (range) {
      lineNo = range.end.line;
      lineNoMin = range.start.line;
    }
    for (lineNo; lineNo >= lineNoMin; lineNo -= 1) {
      const match = findInLine(regex, document, lineNo);
      if (match) return match;
    }
  }
  return null;
};
