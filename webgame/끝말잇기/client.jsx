const React = require('react');
const ReactDom = require('react-dom');
//설치한 것 불러오기

const WordRelay = require('./wordRelay');
//파일 불러오기

ReactDom.render(<WordRelay/>, document.querySelector('#root'));