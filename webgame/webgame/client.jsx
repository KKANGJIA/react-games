const React = require('react');
const ReactDom = require('react-dom');

// const NumberBaseball = require('./numberBaseball');
// ReactDom.render(<NumberBaseball />, document.querySelector('#root'));

// const ResponseCheck = require('./responseCheck_hooks');
// ReactDom.render(<ResponseCheck />, document.querySelector('#root'))

// const RSP = require('./rsp');
// const RSP = require('./rsp_hooks');
// ReactDom.render(<RSP />, document.querySelector('#root'))

// const Lotto = require('./lotto');
// const Lotto = require('./lotto_hooks');
// ReactDom.render(<Lotto />, document.querySelector('#root'))

const Tictactoe = require('./tictactoe/tictactoe');
ReactDom.render(<Tictactoe />, document.querySelector('#root'))