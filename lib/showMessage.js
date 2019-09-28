// eslint-disable-next-line import/no-unresolved
const vscode = require('vscode');

const config = vscode.workspace.getConfiguration('vue-component-importer');

module.exports = (msg, error) => {
  if (config.get('enableDebugMessages')) {
    if (error) {
      vscode.window.showErrorMessage(msg);
    } else {
      vscode.window.showInformationMessage(msg);
    }
  }
};
