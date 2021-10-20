const React = require('react');
const { Component } = React;

const Gugudan = () => {
  const [first, setFirst] = React.useState(Math.floor(Math.random() * 9));
  const [second, setSecond] = React.useState(Math.floor(Math.random() * 9));
  const [value, setValue] = React.useState('');
  const [result, setResult] = React.useState('');
  //비구조화 할당(구조분해할당, destructuring assignment): 앞은 state, 뒤는 state의 전용 setState

  const onChange = e => {
    setValue(e.target.value);
  }

  const onSubmit = e => {
    e.preventDefault();
    if(parseInt(value) === first * second) {
      setResult(`${value}, 정답입니다!`);
      setValue('');
      setFirst(Math.floor(Math.random() * 9));
      setSecond(Math.floor(Math.random() * 9));
      inputRef.current.focus(); // hooks에서는 꼭 current를 붙여 접근
      //e.target.children[1].focus();
    } else {
      setResult('오답입니다! 다시 풀어보세요.');
      setValue('');
      inputRef.current.focus();
      //e.target.children[1].focus();
    }
  }

  const inputRef = React.useRef(null); //hooks에서 돔에 접근하기 위해 사용하는 메서드

  return (
    <>
       <div>MultiplicationTable</div> 
       <form onSubmit={onSubmit}>
         <h1>{first} X {second} = ? </h1>
         <input ref={inputRef} onChange={onChange} value={value}/>
         <button>입력</button>
       </form>
       <div>{result}</div>
      </>
  );
}

module.exports = Gugudan;

