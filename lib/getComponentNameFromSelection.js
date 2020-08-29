/*
  wordRegex from here, but without `-` detection
  https://github.com/microsoft/vscode/blob/4c8e61c0499dfd7531ec99ab6723c1e4371ed2f3/extensions/html-language-features/server/src/test/words.test.ts#L10
*/
// eslint-disable-next-line no-useless-escape
const wordRegex = /([^\`\~\!\@\#\%\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g;

module.exports = (editor) => {
  const cursorPosition = editor.selection.start;
  const wordRange = editor.document.getWordRangeAtPosition(
    cursorPosition,
    wordRegex,
  );
  if (!wordRange) throw new Error('Couldnt find component tag on cursor.');
  return editor.document.getText(wordRange);
};
