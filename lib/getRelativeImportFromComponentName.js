const path = require('path');
// eslint-disable-next-line import/no-unresolved
const vscode = require('vscode');

/* const commonStringLength = (from, to) => {
  let i = 0;
  while (i < from.length && from.charAt(i) === to.charAt(i)) {
    i += 1;
  }
  return i;
}; */

module.exports = async (editor, componentName) => {
  const files = await vscode.workspace.findFiles(
    `**/${componentName}.vue`,
    '**/node_modules',
    10
  );

  const componentPath = files.length ? files[0].path : null;
  if (!componentPath) {
    throw new Error(
      `No component found for ${componentName} in '**/${componentName}.vue'`,
      true
    );
  }

  // TODO: Order file list by closest file - commonStringLength
  let relativeImport = path.posix.relative(
    path.posix.dirname(editor.document.uri.path),
    componentPath
  );
  if (relativeImport.charAt(0) !== '.') {
    relativeImport = `./${relativeImport}`;
  }
  return relativeImport;
};
