const findFirstInDocument = require('./findFirstInDocument');

module.exports = async (editor, componentName) => {
  // TODO: Make regex for component/export lines instead of perfect matches
  const componentsPropRegex = /components *: *{/g;
  const singleFileBeginRegex = /export *default *{/g;
  const propResult = findFirstInDocument(componentsPropRegex, editor.document);
  const exportResult = findFirstInDocument(
    singleFileBeginRegex,
    editor.document
  );
  let endPosition;
  let insertString;
  if (propResult) {
    endPosition = propResult.end;
    insertString = `
    ${componentName},`;
  } else if (exportResult) {
    endPosition = exportResult.end;
    insertString = `
  components: {
    ${componentName},
  },`;
  }
  if (!insertString) throw new Error(`Couldn't insert component name`);
  await editor.edit(editBuilder => {
    editBuilder.insert(endPosition, insertString);
  });
};
