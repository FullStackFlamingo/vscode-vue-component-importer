const ChangeCase = require('change-case');
const constants = require('./constants');
const findInDocument = require('./findInDocument');
const getDocumentScriptBlockRange = require('./getDocumentScriptBlockRange');

module.exports = async (editor, componentName) => {
  const componentNamePascal = ChangeCase.pascalCase(componentName);

  const docScriptRange = getDocumentScriptBlockRange(editor);
  const propResult = findInDocument(
    constants.REGEX_COMPONENTS_PROP,
    editor.document,
    { range: docScriptRange },
  );

  const exportResult = findInDocument(
    constants.REGEX_EXPORT_STATEMENT,
    editor.document,
    { range: docScriptRange },
  );

  let insertPosition;
  let insertString;
  if (propResult) {
    insertPosition = propResult.end;
    insertString = `
    ${componentNamePascal},`;
  } else if (exportResult) {
    insertPosition = exportResult.end;
    insertString = `
  components: {
    ${componentNamePascal},
  },`;
  }
  if (!insertPosition) throw new Error('Couldnt insert component name');
  await editor.edit((editBuilder) => {
    editBuilder.insert(insertPosition, insertString);
  });
};
