const React = require('react');
const { Component } = React;
const Ball = require('./Ball');

function getBalls (){
  const shuffle = [];
  const candidate = Array(45).fill().map((v, i) => i + 1);
  while (candidate.length > 0) {
  const random = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
  shuffle.push(random);
  }
  bonus = shuffle[shuffle.length - 1];
  balls = shuffle.slice(0, 6).sort((a,b)=>a-b); 
  return [...balls, bonus];
}

class Rotto extends Component {
  state = {
    ballNumbers: getBalls(), 
    balls: [],
    bonus: null, // 보너스 공
    redo: false, //  재실행하는 state
  }

  timeouts = [];

  runTimeouts = () => {
    const { ballNumbers } = this.state;
    for(let i=0; i< this.state.ballNumbers.length -1; i++){
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          return {
            ballNumbers: [...prevState.ballNumbers, ballNumbers[i]],
          }
        }, (i + 1) * 1000)
      })
    }
    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: ballNumbers[6],
        redo: true, //보너스 공까지 나오면 사람들한테 보이도록 표시하기 위해 true로 변경함
      })
    }, 7000)
  }

  componentDidMount(){ // 화면이 렌더링되자마자 실행되야하니까
   this.runTimeouts();
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.ballNumbers.length === 0){
      this.runTimeouts();
    }
  }

  componentWillUnmount(){ 
    // 부모컴포넌트가 사라지기 전에 자식을 없애주지 않으면 반복적인 타이머가 계속 실행되서
    // 메모리 누수 문제같은 에러가 발생할 수 있기 때문에 여기서 꼭 없애줘야 함
    this.timeouts.forEach((v) => {
      clearTimeout(v);
    })
    
  }

  onClickRedo = () => {
    this.setState({
      ballNumbers: getBalls(), 
      balls: [],
      bonus: null, // 보너스 공
      redo: false, //  재실행하는 state
    })
    this.timeouts = [];
  }
    

  render() {
    const {ballNumbers, bonus, redo} = this.state;
    return (
      <div>
        <div>당첨숫자</div>
        <div id ="결과창">
          {balls.map((v)=><Ball key={v} number={v}/>)}
        </div>
        <div>보너스</div>
        {bonus && <Ball number={bonus}/>}
        {redo && <button onClick={this.onClickRedo}> 한번 더 </button>}
      </div>
    );
  }
}

module.exports =  Rotto;