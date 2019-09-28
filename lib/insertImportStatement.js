const findInDocument = require('./findInDocument');
const getRelativeImportFromComponentName = require('./getRelativeImportFromComponentName');

module.exports = async (editor, componentName) => {
  const scriptTag = '<script>';
  const range = findInDocument(scriptTag, editor.document);
  if (!range) throw new Error(`Couldn't find <script> tag`);
  const relativeImport = await getRelativeImportFromComponentName(
    editor,
    componentName
  );
  const replacementString = `${scriptTag}
import ${componentName} from '${relativeImport}';
`;
  await editor.edit(editBuilder => {
    editBuilder.replace(range, replacementString);
  });
};
