// eslint-disable-next-line import/no-unresolved
const vscode = require('vscode');

module.exports = (string, document) => {
  let lineNo = 0;
  let startIndex = 0;
  for (lineNo = 0; lineNo < document.lineCount; lineNo += 1) {
    const line = document.lineAt(lineNo);
    const index = line.text.indexOf(string);
    if (index !== -1) {
      startIndex = index;
      return new vscode.Range(
        new vscode.Position(lineNo, startIndex),
        new vscode.Position(lineNo, startIndex + string.length)
      );
    }
  }
  return null;
};
