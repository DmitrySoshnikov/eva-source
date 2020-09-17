const assert = require('assert');
const {test} = require('./test-util');

module.exports = eva => {

  test(eva,
  `
    (begin

      (var result 0)

      (+= result 5)

      result

    )

  `,
  5);

};