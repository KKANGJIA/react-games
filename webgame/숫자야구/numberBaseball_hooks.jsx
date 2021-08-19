import Try from './Try';
import { useState } from 'react';

function getNumbers() {
  const shuffle = [];
  const arr = [1,2,3,4,5,6,7,8,9];
  for(let i=0; i<4; i++) {
    const num = arr.splice(Math.floor(Math.random() * (9-i)), 1)[0]; //0~9
    shuffle.push(num);
  }
  return shuffle
}

const NumberBaseball = () => {
  
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState(getNumbers());
  const [result, setResult] = useState('');
  const [tries, setTries] = useState([]);

  const onSubmit = e => {
    e.preventDefault();
    if(value === answer.join('')){ // 홈런이면
      setResult('홈런');
      setTries((prevState) => { //이전 state값을 이용하기 때문에 함수형
        return [...prevState.tries, {try: value, result: '홈런!'}]
      });
      alert('게임을 다시 시작합니다.');
      setValue('');
      setAnswer(getNumbers());
      setTries([]);
    } else { //홈런 아니면
      const answerArray = value.split('').map((v)=>parseInt(v));
      let strike = 0;
      let ball = 0;
      if ( tries.length >= 9 ) { //10번 이상 틀렸을때
        setResult(`10번넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`);
        alert('게임을 다시 시작합니다.');
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
      } else {
        for (let i=0; i<4; i++) {
          if(answerArray[i] === answer[i]) {
            strike += 1;
          } else if(answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        setTries((prevState) => {
          return [...prevState.tries, {try: value, result: `${strike}스트라이크, ${ball}볼`}]
        });
        setValue('');
      }
    }
  };

  const onChange = e => {
    console.log(answer); //정답을 확인
    setValue(e.target.value);
  }

  return (
    <>
    <h1>{result}</h1>
      <form onSubmit={onSubmit}>
        <input maxLength={4} onChange={onChange} value={value}/>
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {tries.map((v,i) => 
          <Try key={`${i} + 1차 시도`} tryInfo={v} />)} 
      </ul>
    </>
  );
};

export default NumberBaseball;