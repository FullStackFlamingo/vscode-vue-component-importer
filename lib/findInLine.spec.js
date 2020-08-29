const findInLine = require('./findInLine');
const vscode = require('vscode');

describe('findInLine', () => {
  // Applies only to tests in this describe block
  let document;
  let regex;
  let regexMatches;
  let regexMatch0;
  let line;
  beforeEach(() => {
    line = jest.fn();
    regexMatch0 = [];
    regexMatches = [regexMatch0];
    regexMatches.index = 3;
    regex = {
      exec: jest.fn(() => regexMatches),
    };
    document = {
      lineAt: jest.fn(() => line),
    };
  });

  test('', () => {
    const start = jest.fn();
    const end = jest.fn();
    vscode.Position.mockReturnValueOnce(start);
    vscode.Position.mockReturnValueOnce(end);
    const result = findInLine(regex, document, 1);
    expect(result).toEqual(
      expect.objectContaining({ match: regexMatch0, start, end, line }),
    );
  });
});
