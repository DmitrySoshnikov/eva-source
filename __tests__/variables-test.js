const assert = require('assert');

module.exports = eva => {
  // Variables:

  assert.strictEqual(eva.eval(['var', 'x', 10]), 10);
  assert.strictEqual(eva.eval('x'), 10);

  assert.strictEqual(eva.eval(['var', 'y', 100]), 100);
  assert.strictEqual(eva.eval('y'), 100);

  assert.strictEqual(eva.eval('VERSION'), '0.1');

  // var isUser = true;
  assert.strictEqual(eva.eval(['var', 'isUser', 'true']), true);

  assert.strictEqual(eva.eval(['var', 'z', ['*', 2, 2]]), 4);
  assert.strictEqual(eva.eval('z'), 4);
};