// eslint-disable-next-line import/no-unresolved
const vscode = require('vscode');

module.exports = (regex, document, lineNo) => {
  const line = document.lineAt(lineNo);
  const matches = regex.exec(line.text);
  if (matches && matches.length) {
    const startIndex = matches.index;
    const match = matches[0];
    return {
      start: new vscode.Position(lineNo, startIndex),
      end: new vscode.Position(lineNo, startIndex + match.length),
      match,
      line,
    };
  }
  return null;
};
