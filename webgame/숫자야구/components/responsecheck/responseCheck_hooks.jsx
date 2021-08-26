const React = require('react');
const { useState, useRef } = React;

// useState는 실행되면 렌더링이 반복적으로 일어나는 반면
// useRef는 렌더링이 반복적으로 발생하지 않는다는 차이점
// 즉, 값은 바뀌지만 화면에 영향을 끼치고 싶지 않을 때 사용
const ResponseCheck = () => {
  const [text, setText] = useState('If you ready, you have to click me!');
  const [result,setResult] = useState(0);
  const [avg, setAvg] = useState(0);

  const timer  = useRef(null); //hooks에서는 this의 속성을 대신할 때 사용함
  const startTime = useRef(); //this. 대신에 .current를 사용하기
  const endTime = useRef(); // 
  const Times = useRef([]);

  const onClick = (event) => {
    if(event.target.id === 'screen') { //파랑, 대기
      event.target.style.backgroundColor = 'red';
      event.target.id = 'ready';
      setText('초록색이 나오면 클릭하세요.'); 
      timer.current = setTimeout(() => {
        startTime.current = new Date(); // 시작시간 재기
        event.target.id = 'go';
        event.target.style.backgroundColor = 'green';
        setText('클릭하세요!');
      }, Math.random()*4000)
    } else if (event.target.id === 'ready') { // 빨강, 준비
        setText('성급하군요! 초록색이 나오면 클릭하세요.'); 
      setTimeout(()=> {
        event.target.id = 'screen';
        event.target.style.backgroundColor = 'powderblue';
        clearTimeout(timer.current); //값을 가져올 때도 .currnet로 접근
        setText('If you ready, you have to click me!');
      }, 2000)
    }  else if (event.target.id === 'go') { // 초록, 끝
      endTime.current = new Date(); //끝 시간 재기
      // console.log(endTime, startTime);
      Times.current.push(endTime.current - startTime.current);
      // console.log(Times);
      setText('당신의 반응속도는?');
      setResult(endTime.current -startTime.current);
      setAvg(Times.current.reduce((a,c)=> a+c) / Times.current.length);

      //리셋
      setTimeout(()=>{
        event.target.id = 'screen';
        event.target.style.backgroundColor = 'powderblue';
        clearTimeout(timer);
        setResult('');
        setText('If you ready, you have to click me!');
      }, 3000)
    }
  }

  return (
    <div>
      <div style={{ backgroundColor: 'powderblue'}} id="screen" onClick={onClick}>{text}</div>
      <div>현재시간: {result}ms</div>
      <div>평균시간: {avg}ms</div>
    </div>
  );
}
  
module.exports = ResponseCheck;





