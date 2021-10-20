const React = require('react');
const { Component } = React;

class ResponseCheck extends Component {
  state = {
    text: 'If you ready, you have to click me!',
    result: 0,
    avg: 0,
  }

  //블록스코프때문에 안에서 const, let으로 선언하면 지역변수로 defined가
  //나오니까 빆에다가 선언하고 안에서 this로 작성하면 스코프에 구애받지 않게 됨
  timer;
  startTime;
  endTime;
  Times = [];
  onClick = (event) => {
    if(event.target.id === 'screen') { //파랑, 대기
      event.target.style.backgroundColor = 'red';
      event.target.id = 'ready';
      this.setState({
        text: '초록색이 나오면 클릭하세요.', 
      })
      this.timer = setTimeout(() => {
        this.startTime = new Date(); // 시작시간 재기
        event.target.id = 'go';
        event.target.style.backgroundColor = 'green';
        this.setState({
          text: '클릭하세요!',
        })
      }, Math.random()*4000)
    } else if (event.target.id === 'ready') { // 빨강, 준비
      this.setState({
        text: '성급하군요! 초록색이 나오면 클릭하세요.', 
      })
      setTimeout(()=> {
        event.target.id = 'screen';
        event.target.style.backgroundColor = 'powderblue';
        clearTimeout(this.timer);
        this.setState({
          text: 'If you ready, you have to click me!',
        })
      }, 2000)
    }  else if (event.target.id === 'go') { // 초록, 끝
      this.endTime = new Date(); //끝 시간 재기
      // console.log(this.endTime, this.startTime);
      this.Times.push(this.endTime - this.startTime);
      console.log(this.Times);
      this.setState(()=> {
        return {
        text: '당신의 반응속도는?',
        result: this.endTime -this.startTime,
        avg: this.Times.reduce((a,c)=> a+c) / this.Times.length
        }
      });

      //리셋
      setTimeout(()=>{
        event.target.id = 'screen';
        event.target.style.backgroundColor = 'powderblue';
        clearTimeout(this.timer);
        this.setState({
          result: '',
          text: 'If you ready, you have to click me!',
        })
      }, 3000)
    }
  }

  render() {
    return (
      <div>
        <div style={{ backgroundColor: 'powderblue'}} id="screen" onClick={this.onClick}>{this.state.text}</div>
        <div>현재시간: {this.state.result}ms</div>
        <div>평균시간: {this.state.avg}ms</div>
      </div>
    );
  }
}

module.exports = ResponseCheck;