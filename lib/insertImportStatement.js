const ChangeCase = require('change-case');
const constants = require('./constants');
const findInDocument = require('./findInDocument');
const getRelativeImportFromComponentName = require('./getRelativeImportFromComponentName');
const getDocumentScriptBlockRange = require('./getDocumentScriptBlockRange');

module.exports = async (editor, componentName) => {
  const docScriptRange = getDocumentScriptBlockRange(editor);

  const importResult = findInDocument(
    constants.REGEX_IMPORT_STATEMENT,
    editor.document,
    {
      range: docScriptRange,
      reverse: true,
    },
  );

  const scriptResult = findInDocument(
    constants.REGEX_SCRIPT_TAG_BEGIN,
    editor.document,
  );

  let insertPosition;
  if (importResult) {
    insertPosition = importResult.end;
  } else if (scriptResult) {
    insertPosition = scriptResult.end;
  }

  if (!insertPosition) {
    throw new Error('Couldnt find a place to insert import statement');
  }
  const componentNamePascal = ChangeCase.pascalCase(componentName);

  const relativeImport = await getRelativeImportFromComponentName(
    editor,
    componentName,
  );
  const insertString = `
import ${componentNamePascal} from '${relativeImport}';`;
  await editor.edit((editBuilder) => {
    editBuilder.insert(insertPosition, insertString);
  });
};
