const React = require('react');
const { Component } = React;


//*strike,ball 정리하기
function getNumbers(){
  //정답만들기(랜덤)
  const shuffle = [];
  const arr = Array(9).fill(0).map((v,i) => v + i); // [1,2,3,4,5,6,7,8,9]
  for(let i=0; i<4; i++) {
    const numarr = arr.splice(Math.floor(Math.random() * 9), 1); //0~9
    const num = numarr[0];
    shuffle.push(num);
  }
  return shuffle
}

class NumberBaseball extends Component {
  state = {
    chance: 10,
    value: '',
    answer: getNumbers(),
    strike: 0,
    ball: 0,
    result: '',
    log: '',
  };

  onSubmit = e => {
    e.preventDefault();
    
    if(this.state.chance > 0){
      //console.log(this.state.value) //현재 입력값 출력
      console.log(this.state.answer, '현재정답') 
      const answer = this.state.answer;
      const inputValue = this.state.value;
      let ballCnt = 0;
      let strikeCnt = 0;
      answer.map( (v) => {
        if(answer.join('') === inputValue) {
          this.setState({ result: '홈런!', strike: 4 , ball: 0 })
          return;
        }
        if(inputValue.includes(v)){
          ballCnt++;
          if(answer.indexOf(v) === inputValue.indexOf(v)){
            strikeCnt++;
            this.setState((prevState) => {
              return {
                strike: this.state.strike + strikeCnt,
                chance: this.state.chance - 1,
                value: '',
                answer: prevState.answer,
                log: this.state.value,
              }
            })
          } else {
            this.setState((prevState) => {
              return {
                ball: this.state.ball + ballCnt,
                chance: this.state.chance - 1,
                value: '',
                answer: prevState.answer,
                log: this.state.value,
              }
            })
          }
        } 
        // inputValue.includes(v) ? 
        //   ( shuffle.indexOf(v) === inputValue.indexOf(v) ? 
        //     this.setState({ strike: this.state.strike + 1 }) : this.setState({ ball: this.state.ball + 1 }) )
      });

    }else if(this.state.chance === 0){
        //게임 끝나면 reset하기
        this.setState({result: '패배!', answer: getNumbers(), chance: 10, value: '', strike: 0, ball: 0,})
        return;
    }
  }

  onChange = e => {
    this.setState({ value: e.target.value })
  }

  render() {
    return (
      <>
        <form onSubmit={this.onSubmit}>
          <div>chance enabled: {this.state.chance}</div>
          <input onChange={this.onChange} value={this.state.value}/>
          <button>플레이볼</button>
        </form>
        <div>{this.state.strike}strike, {this.state.ball}ball, result: {this.state.result}</div>
        <div>기록: {this.state.log}</div>
      </>
    );
  }
}

module.exports = NumberBaseball;