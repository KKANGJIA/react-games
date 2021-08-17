const React = require('react');
const ReactDom = require('react-dom');
//설치한 것 불러오기

const WordRelay = require('./wordRelay');

ReactDom.render(<WordRelay/>, document.querySelector('#root'));