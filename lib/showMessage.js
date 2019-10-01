// eslint-disable-next-line import/no-unresolved
const vscode = require('vscode');

module.exports = (msg, error) => {
  const config = vscode.workspace.getConfiguration('vue-component-importer');
  if (config.get('enableDebugMessages')) {
    if (error) {
      vscode.window.showErrorMessage(msg);
    } else {
      vscode.window.showInformationMessage(msg);
    }
  }
};
