const React = require('react');
const { memo } = require('react');

//화면에 띄우는 역할만 하는 함수 컴포넌트로 안에 useState, useRef가 없어서 Hooks가 아니고 함수 컴포넌트
//함수 컴포넌트에 memo를 한번 더 감싼 high order 컴포넌트(고차 컴포넌트)
const Ball = memo(({ number }) => {
  let background;
  if(number <= 10) {
    background = 'red';
  } else if(number <= 20) {
    background = 'orange';
  } else if(number <= 30) {
    background = 'yello';
  } else if(number <= 40) {
    background = 'blus';
  } else{
    background = 'green';
  } 
  return (
    <div className="ball" style={{ background }}>{number}</div>
  );
});

module.exports =  Ball;