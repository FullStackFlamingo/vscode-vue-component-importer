const findInDocument = require('./findInDocument');

module.exports = async (editor, componentName) => {
  const componentsPropRegex = /components *: *{/g;
  const propResult = findInDocument(componentsPropRegex, editor.document);

  const singleFileBeginRegex = /export *default *{/g;
  const exportResult = findInDocument(singleFileBeginRegex, editor.document);

  let insertPosition;
  let insertString;
  if (propResult) {
    insertPosition = propResult.end;
    insertString = `
    ${componentName},`;
  } else if (exportResult) {
    insertPosition = exportResult.end;
    insertString = `
  components: {
    ${componentName},
  },`;
  }
  if (!insertPosition) throw new Error(`Couldn't insert component name`);
  await editor.edit(editBuilder => {
    editBuilder.insert(insertPosition, insertString);
  });
};
