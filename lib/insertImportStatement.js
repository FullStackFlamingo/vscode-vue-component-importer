const findInDocument = require('./findInDocument');
const getRelativeImportFromComponentName = require('./getRelativeImportFromComponentName');

module.exports = async (editor, componentName) => {
  const importRegex = /import.+["'`].+["'`].*;/g;
  const importResult = findInDocument(importRegex, editor.document, true);

  const scriptTagRegex = /<script>/g;
  const scriptResult = findInDocument(scriptTagRegex, editor.document);

  let insertPosition;
  if (importResult) {
    insertPosition = importResult.end;
  } else if (scriptResult) {
    insertPosition = scriptResult.end;
  }

  if (!insertPosition) {
    throw new Error(`Couldn't find a place to insert import statement`);
  }
  const relativeImport = await getRelativeImportFromComponentName(
    editor,
    componentName
  );
  const insertString = `
import ${componentName} from '${relativeImport}';`;
  await editor.edit(editBuilder => {
    editBuilder.insert(insertPosition, insertString);
  });
};
