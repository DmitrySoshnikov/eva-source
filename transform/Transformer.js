/**
 * AST Transformer.
 *
 * Course info: http://dmitrysoshnikov.com/courses/essentials-of-interpretation/
 *
 * (C) 2018-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

class Transformer {

  /**
   * Translates `def`-expression (function declaration)
   * into a variable declaration with a lambda
   * expression.
   */
  transformDefToVarLambda(defExp) {
    const [_tag, name, params, body] = defExp;
    return ['var', name, ['lambda', params, body]];
  }

  /**
   * Transforms `switch` to nested `if`-expressions.
   */
  transformSwitchToIf(switchExp) {
    // Implement here: see Lecture 14
  }

  /**
   * Transforms `for` to `while`
   */
  transformForToWhile(forExp) {
    // Implement here: see Lecture 14
  }

  /**
   * Transforms `++ foo` to (set foo (+ foo 1))
   */
  transformIncToSet(incExp) {
    const [_tag, exp] = incExp;
    return ['set', exp, ['+', exp, 1]];
  }

  /**
   * Transforms `-- foo` to (set foo (- foo 1))
   */
  transformDecToSet(incExp) {
    const [_tag, exp] = incExp;
    return ['set', exp, ['-', exp, 1]];
  }

  /**
   * Transforms `+= foo val` to (set foo (+ foo val))
   */
  transformIncValToSet(incExp) {
    const [_tag, exp, val] = incExp;
    return ['set', exp, ['+', exp, val]];
  }

  /**
   * Transforms `+= foo val` to (set foo (+ foo val))
   */
  transformDecValToSet(incExp) {
    const [_tag, exp, val] = incExp;
    return ['set', exp, ['-', exp, val]];
  }

}

module.exports = Transformer;