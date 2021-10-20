const React = require('react');
const ReactDom = require('react-dom');
//설치한 것 불러오기

const Gugudan = require('./gugudan');
//파일 불러오기

ReactDom.render(<Gugudan/>, document.querySelector('#root'));