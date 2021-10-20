const { useEffect, useCallback, useMemo } = require('react');
const React = require('react');
const { useState, useRef } = React;
const Ball = require('./Ball');

function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

const Lotto = () => {
  const lottoNumbers = useMemo(() => getWinNumbers, []); 
  // 함수형 컴포넌트듣 render만 실행되는 class 컴포넌트와 달리 모든 코드가 계속 실행되기 때문에 분리해둔 함수마저 여러번 호출되는 문제가 발생한다
  // useMemo는 복잡한 함수의 결과값을 기억해서 함수가 여러번 호출되는 것을 방지해서 위의 문제를 해결한다
  // 주의할 점: 두번째인자인 빈배열에 값을 넣으면 함수가 재호출되는 현상이 발생한다
  const [winNumbers, setWinNumbers] = useState(lottoNumbers); // 당첨 숫자들
  const [winBalls,setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null); // 보너스 공
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);


  useEffect(() => {
    console.log('runTimeouts');
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => { //currnet 요소에 넣어주는 거라서 변하는 시점이 아니다
        setWinBalls((preBall) => [...preBall, winNumbers[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true); //보너스 공까지 나오면 사람들한테 보이도록 표시하기 위해 true로 변경함
    }, 7000);
    
    return () => { //componentWillUnmpount는 return하기
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [ timeouts.current ]); // 배열에는 변하는 요소 넣기
  //inputs 자리가 빈 배열이면 componentDidMount랑 비슷한 것
  // 배열에 요소가 존재하면 componentDidMount랑 componentDidUpdate 둘다 수행함
  //useEffect는 componentDidUPdate와 조건 부분이 일치하지 않을 수도 있기때문에 이런 부분이 헷갈릴 수 있음

  useEffect(() => { //componentDidUPdate
    console.log('로또 숫자를 생성합니다.'); // winNumbers가 바뀔 때마다 실행되는 게 필요하면 배열에 요소만 넣어서 useEffect를 또 만들면 된다!
  }, [winNumbers]); // 변하는 state를 요소로 추가

  onClickRedo = useCallback(() => { //함수의 리렌더링을 방지하기 위해서 useCallback으로 감싸주기(함수 전체를 기억하는 useCallback)
    console.log('onClickRedo');
    console.log(winNumbers); // 이전 당첨 숫자 반환
    setWinNumbers(getWinNumbers()); // 당첨 숫자들
    setWinBalls([]);
    setBonus(null); // 보너스 공
    setRedo(false); //  재실행하는 state
    timeouts.current = []; // current에 직접 넣어주기 떄문에 이때 변하는 시점이다.
  }, [winNumbers]); // 이전 state값을 useCallback이 꼐속 기억하고 있어서 변하지 않기 때문에 요소로 추가햐여 기억을 재부팅함

  return(
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map((v) => <Ball key={v} number={v} />)}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus}  onClick={onClickRedo}  />}
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
    
  )
};

  module.exports =  Lotto;