const React = require('react');
const { useState, useRef  } = React; // 함수형 컴포넌트에서는 useState넣어줄 것

const wordRelay = () => {
  const [word, setWord] = useState('오레오');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [order, setOrder] = useState(1);
  const inputRef = React.useRef(null);

  const onChange = (e) => {
    setValue(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setValue(''),
        setResult('딩동댕!'),
        setOrder(order + 1),
        setWord(value),
        inputRef.current.focus();
    } else {
      setValue(''),
        setResult(`땡! ${word}의 앞글자로 시작해야합니다.`),
        // `current` points to the mounted text input element
        inputRef.current.focus();
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>{order}번째 참가자</div>
        <div>제시어: {word}</div>
        <input ref={inputRef} onChange={onChange} value={value} />
        <button>입력</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = wordRelay;

  