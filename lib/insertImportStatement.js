const findFirstInDocument = require('./findFirstInDocument');
const getRelativeImportFromComponentName = require('./getRelativeImportFromComponentName');

module.exports = async (editor, componentName) => {
  const scriptTag = /<script>/g;
  const findResult = findFirstInDocument(scriptTag, editor.document);
  if (!findResult) throw new Error(`Couldn't find <script> tag`);
  const relativeImport = await getRelativeImportFromComponentName(
    editor,
    componentName
  );
  const insertString = `
import ${componentName} from '${relativeImport}';`;
  await editor.edit(editBuilder => {
    editBuilder.insert(findResult.end, insertString);
  });
};
