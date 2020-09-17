/**
 * Eva programming language.
 *
 * AST interpreter.
 *
 * Course info: http://dmitrysoshnikov.com/courses/essentials-of-interpretation/
 *
 * (C) 2018-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

const Environment = require('./Environment');
const Transformer = require('./transform/Transformer');
const evaParser = require('./parser/evaParser');

const fs = require('fs');

/**
 * Eva interpreter.
 */
class Eva {
  /**
   * Creates an Eva instance with the global environment.
   */
  constructor(global = GlobalEnvironment) {
    this.global = global;
    this._transformer = new Transformer();
  }

  /**
   * Evaluates global code wrapping into a block.
   */
  evalGlobal(exp) {
    return this._evalBody(exp, this.global);
  }

  /**
   * Evaluates an expression in the given environment.
   */
  eval(exp, env = this.global) {

    // --------------------------------------------
    // Self-evaluating expressions:

    if (this._isNumber(exp)) {
      // Implement here: see Lecture 5
    }

    if (this._isString(exp)) {
      // Implement here: see Lecture 5
    }

    // --------------------------------------------
    // Block: sequence of expressions

    if (exp[0] === 'begin') {
      const blockEnv = new Environment({}, env);
      return this._evalBlock(exp, blockEnv);
    }

    // --------------------------------------------
    // Variable declaration: (var foo 10)

    if (exp[0] === 'var') {
      // Implement here: see Lecture 6
    }

    // --------------------------------------------
    // Variable update: (set foo 10)

    if (exp[0] === 'set') {
      // Implement here: see Lectures 6 and 15
    }

    // --------------------------------------------
    // Variable access: foo

    if (this._isVariableName(exp)) {
      // Implement here: see Lecture 6
    }

    // --------------------------------------------
    // if-expression:

    if (exp[0] === 'if') {
      // Implement here: see Lecture 8
    }

    // --------------------------------------------
    // while-expression:

    if (exp[0] === 'while') {
      // Implement here: see Lecture 8
    }

    // --------------------------------------------
    // Function declaration: (def square (x) (* x x))
    //
    // Syntactic sugar for: (var square (lambda (x) (* x x)))

    if (exp[0] === 'def') {
      // Implement here: see Lectures 11, 12
    }

    // --------------------------------------------
    // Switch-expression: (switch (cond1, block1) ... )
    //
    // Syntactic sugar for nested if-expressions

    if (exp[0] === 'switch') {
      // Implement here: see Lecture 14
    }

    // --------------------------------------------
    // For-loop: (for init condition modifier body )
    //
    // Syntactic sugar for: (begin init (while condition (begin body modifier)))

    if (exp[0] === 'for') {
      // Implement here: see Lecture 14
    }

    // --------------------------------------------
    // Increment: (++ foo)
    //
    // Syntactic sugar for: (set foo (+ foo 1))

    if (exp[0] === '++') {
      // Implement here: see Lecture 14
    }

    // --------------------------------------------
    // Decrement: (-- foo)
    //
    // Syntactic sugar for: (set foo (- foo 1))

    if (exp[0] === '--') {
      // Implement here: see Lecture 14
    }

    // --------------------------------------------
    // Increment: (+= foo inc)
    //
    // Syntactic sugar for: (set foo (+ foo inc))

    if (exp[0] === '+=') {
      // Implement here: see Lecture 14
    }

    // --------------------------------------------
    // Decrement: (-= foo dec)
    //
    // Syntactic sugar for: (set foo (- foo dec))

    if (exp[0] === '-=') {
      // Implement here: see Lecture 14
    }

    // --------------------------------------------
    // Lambda function: (lambda (x) (* x x))

    if (exp[0] === 'lambda') {
      // Implement here: see Lecture 12
    }

    // --------------------------------------------
    // Class declaration: (class <Name> <Parent> <Body>)

    if (exp[0] === 'class') {
      // Implement here: see Lecture 15
    }

    // --------------------------------------------
    // Super expressions: (super <ClassName>)

    if (exp[0] === 'super') {
      // Implement here: see Lecture 16
    }

    // --------------------------------------------
    // Class instantiation: (new <Class> <Arguments>...)

    if (exp[0] === 'new') {
      // Implement here: see Lecture 15
    }

    // --------------------------------------------
    // Property access: (prop <instance> <name>)

    if (exp[0] === 'prop') {
      // Implement here: see Lecture 15
    }

    // --------------------------------------------
    // Module declaration: (module <name> <body>)

    if (exp[0] === 'module') {
      // Implement here: see Lecture 17
    }

    // --------------------------------------------
    // Module import: (import <name>)
    // (import (export1, export2, ...) <name>)

    if (exp[0] === 'import') {
      // Implement here: see Lecture 17
    }

    // --------------------------------------------
    // Function calls:
    //
    // (print "Hello World")
    // (+ x 5)
    // (> foo bar)

    if (Array.isArray(exp)) {

      const fn = this.eval(exp[0], env);

      const args = exp
        .slice(1)
        .map(arg => this.eval(arg, env));

      // 1. Native function:

      // See Lecture 10

      if (typeof fn === 'function') {
        return fn(...args);
      }

      // 2. User-defined function:

      return this._callUserDefinedFunction(fn, args);
    }


    throw `Unimplemented: ${JSON.stringify(exp)}`;
  }

  _callUserDefinedFunction(fn, args) {
    // Implement here: see Lecture 11
  }

  _evalBody(body, env) {
    if (body[0] === 'begin') {
      return this._evalBlock(body, env);
    }
    return this.eval(body, env);
  }

  _evalBlock(block, env) {
    // Implement here: see Lecture 7
  }

  _isNumber(exp) {
    return typeof exp === 'number';
  }

  _isString(exp) {
    return typeof exp === 'string' && exp[0] === '"' && exp.slice(-1) === '"';
  }

  _isVariableName(exp) {
    return typeof exp === 'string' && /^[+\-*/<>=a-zA-Z0-9_]+$/.test(exp);
  }
}

/**
 * Default Global Environment.
 */
const GlobalEnvironment = new Environment({
  null: null,

  true: true,
  false: false,

  VERSION: '0.1',

  // Operators:

  '+'(op1, op2) {
    return op1 + op2;
  },

  '*'(op1, op2) {
    return op1 * op2;
  },

  '-'(op1, op2 = null) {
    if (op2 == null) {
      return -op1;
    }
    return op1 - op2;
  },

  '/'(op1, op2) {
    return op1 / op2;
  },

  // Comparison:

  '>'(op1, op2) {
    return op1 > op2;
  },

  '<'(op1, op2) {
    return op1 < op2;
  },

  '>='(op1, op2) {
    return op1 >= op2;
  },

  '<='(op1, op2) {
    return op1 <= op2;
  },

  '='(op1, op2) {
    return op1 === op2;
  },

  // Console output:

  print(...args) {
    console.log(...args);
  },
});


module.exports = Eva;