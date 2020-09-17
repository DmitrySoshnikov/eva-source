const assert = require('assert');
const {test} = require('./test-util');

module.exports = eva => {

  test(eva,
  `
    (begin

      (def square (x)
        (* x x))

      (square 2)

    )

  `,
  4);

  // Complex body:

  test(eva,
  `
    (begin

      (def calc (x y)
        (begin
          (var z 30)
          (+ (* x y) z)
        ))

      (calc 10 20)

    )

  `,
  230);

  // Closure:

  test(eva,
  `
    (begin

      (var value 100)

      (def calc (x y)
        (begin
          (var z (+ x y))

          (def inner (foo)
            (+ (+ foo z) value))

          inner

        ))

      (var fn (calc 10 20))

      (fn 30)

    )

  `,
  160);

  // Recursive function:

  test(eva,
  `

    (begin

      (def factorial (x)
        (if (= x 1)
          1
          (* x (factorial (- x 1)))))

      (factorial 5)

    )

  `,
  120);

};