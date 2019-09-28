const findInDocument = require('./findInDocument');

module.exports = async (editor, componentName) => {
  // TODO: Make regex for component/export lines instead of perfect matches
  const componentsProp = 'components: {';
  const singleFileBegin = `export default {`;
  const propRange = findInDocument(componentsProp, editor.document);
  const beingRange = findInDocument(singleFileBegin, editor.document);
  let range;
  let replacementString;
  if (propRange) {
    range = propRange;
    replacementString = `${componentsProp}
    ${componentName},`;
  } else if (beingRange) {
    range = beingRange;
    replacementString = `${singleFileBegin}
  ${componentsProp}
    ${componentName},
  },`;
  }
  if (!replacementString) throw new Error(`Couldn't insert component name`);
  await editor.edit(editBuilder => {
    editBuilder.replace(range, replacementString);
  });
};
