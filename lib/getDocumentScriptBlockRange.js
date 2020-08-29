// eslint-disable-next-line import/no-unresolved
const vscode = require('vscode');
const constants = require('./constants');
const findInDocument = require('./findInDocument');

module.exports = (editor) => {
  const scriptBlockBegin = findInDocument(
    constants.REGEX_SCRIPT_TAG_BEGIN,
    editor.document,
  );
  const scriptBlockEnd = findInDocument(
    constants.REGEX_SCRIPT_TAG_END,
    editor.document,
  );
  if (!scriptBlockBegin || !scriptBlockEnd) {
    throw new Error('Cant find <script> block in file');
  }
  return new vscode.Range(scriptBlockBegin.start, scriptBlockEnd.end);
};
