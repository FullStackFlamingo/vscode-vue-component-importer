// eslint-disable-next-line import/no-unresolved
const vscode = require('vscode');
const getComponentNameFromSelection = require('./lib/getComponentNameFromSelection');
const insertImportStatement = require('./lib/insertImportStatement');
const insertComponentProp = require('./lib/insertComponentProp');
const showMessage = require('./lib/showMessage');

function activate(context) {
  const disposable = vscode.commands.registerCommand(
    'extension.vue-component-importer.importFromCursor',
    async () => {
      try {
        const editor = vscode.window.activeTextEditor;
        const componentName = getComponentNameFromSelection(editor);

        await insertImportStatement(editor, componentName);
        await insertComponentProp(editor, componentName);
      } catch (error) {
        showMessage(error.message, true);
      }

      /* vscode.commands.executeCommand(
        'vscode.executeFormatDocumentProvider',
        editor.document.uri.path
      ); */
    },
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
