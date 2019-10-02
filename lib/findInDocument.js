const findInLine = require('./findInLine');

module.exports = (regex, document, reverse = true) => {
  if (!reverse) {
    for (let lineNo = 0; lineNo < document.lineCount; lineNo += 1) {
      const match = findInLine(regex, document, lineNo);
      if (match) return match;
    }
  } else {
    for (let lineNo = document.lineCount - 1; lineNo >= 0; lineNo -= 1) {
      const match = findInLine(regex, document, lineNo);
      if (match) return match;
    }
  }
  return null;
};
