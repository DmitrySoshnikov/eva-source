const assert = require('assert');
const {test} = require('./test-util');

module.exports = eva => {

  // Pass lambda as a callback

  test(eva,
  `
    (begin

      (var x 10)

      (switch ((= x 10) 100)
              ((> x 10) 200)
              (else     300))

    )

  `,
  100);

};