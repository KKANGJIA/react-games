const React = require('react');
const { Component } = React;

function makeRandomImg() {
  const rock = 'https://previews.123rf.com/images/julinzy/julinzy1310/julinzy131000173/23262897-%ED%9D%B0%EC%83%89-%EB%B0%B0%EA%B2%BD%EC%97%90-%EB%B0%94%EC%9C%84-%EC%A2%85%EC%9D%B4-%EA%B0%80%EC%9C%84-%EA%B2%8C%EC%9E%84-%EA%B3%A0%EB%A6%BD-%EB%90%9C-%EB%B2%A1%ED%84%B0%EC%9D%98-%EC%86%90-%EA%B8%B0%ED%98%B8.jpg';
  const paper = 'https://previews.123rf.com/images/julinzy/julinzy1310/julinzy131000180/23262904-%ED%9D%B0%EC%83%89-%EB%B0%B0%EA%B2%BD%EC%97%90-%EB%B0%94%EC%9C%84-%EC%A2%85%EC%9D%B4-%EA%B0%80%EC%9C%84-%EA%B2%8C%EC%9E%84-%EA%B3%A0%EB%A6%BD-%EB%90%9C-%EB%B2%A1%ED%84%B0%EC%9D%98-%EC%86%90-%EA%B8%B0%ED%98%B8.jpg';
  const scissor = 'https://previews.123rf.com/images/julinzy/julinzy1310/julinzy131000181/23262905-%ED%9D%B0%EC%83%89-%EB%B0%B0%EA%B2%BD%EC%97%90-%EB%B0%94%EC%9C%84-%EC%A2%85%EC%9D%B4-%EA%B0%80%EC%9C%84-%EA%B2%8C%EC%9E%84-%EA%B3%A0%EB%A6%BD-%EB%90%9C-%EB%B2%A1%ED%84%B0%EC%9D%98-%EC%86%90-%EA%B8%B0%ED%98%B8.jpg';
  const array = [rock, scissor, paper];
  let random = Math.floor(Math.random() * 3); 
  // console.log(random)
  return array[random]
}

class Rsp extends Component {
  state = {
    url: makeRandomImg(),
    result: '버튼을 클릭해주세요.',
  }

  //화면이 첫 렌더링되었을 때 바로 실행하기 위해서 IIFE를 사용함
  timer;
  changeImg = (() => {
    this.timer = setInterval(() => {
      this.setState({
        url: makeRandomImg(),
      });
    }, 100);
    
  })();

  rock = 'https://previews.123rf.com/images/julinzy/julinzy1310/julinzy131000173/23262897-%ED%9D%B0%EC%83%89-%EB%B0%B0%EA%B2%BD%EC%97%90-%EB%B0%94%EC%9C%84-%EC%A2%85%EC%9D%B4-%EA%B0%80%EC%9C%84-%EA%B2%8C%EC%9E%84-%EA%B3%A0%EB%A6%BD-%EB%90%9C-%EB%B2%A1%ED%84%B0%EC%9D%98-%EC%86%90-%EA%B8%B0%ED%98%B8.jpg';
  paper = 'https://previews.123rf.com/images/julinzy/julinzy1310/julinzy131000180/23262904-%ED%9D%B0%EC%83%89-%EB%B0%B0%EA%B2%BD%EC%97%90-%EB%B0%94%EC%9C%84-%EC%A2%85%EC%9D%B4-%EA%B0%80%EC%9C%84-%EA%B2%8C%EC%9E%84-%EA%B3%A0%EB%A6%BD-%EB%90%9C-%EB%B2%A1%ED%84%B0%EC%9D%98-%EC%86%90-%EA%B8%B0%ED%98%B8.jpg';
  scissor = 'https://previews.123rf.com/images/julinzy/julinzy1310/julinzy131000181/23262905-%ED%9D%B0%EC%83%89-%EB%B0%B0%EA%B2%BD%EC%97%90-%EB%B0%94%EC%9C%84-%EC%A2%85%EC%9D%B4-%EA%B0%80%EC%9C%84-%EA%B2%8C%EC%9E%84-%EA%B3%A0%EB%A6%BD-%EB%90%9C-%EB%B2%A1%ED%84%B0%EC%9D%98-%EC%86%90-%EA%B8%B0%ED%98%B8.jpg';

  onButtonClick = (event) => {
    if(event.target.id === 'rock'){ // user
      if (this.state.url === this.scissor){ //computer
        this.setState({
          result:'이겼습니다!',
        })
        clearInterval(this.timer);
      } else if(this.state.url === this.paper) {
        this.setState({
          result:'졌습니다!',
        })
        clearInterval(this.timer);
      } else if(this.state.url === this.rock) {
        this.setState({
          result:'비겼습니다!',
        })
        clearInterval(this.timer);
      }
    } else if(event.target.id === 'scissor'){ // user
      if (this.state.url === this.scissor){ //computer
        this.setState({
          result:'비겼습니다!',
        })
        clearInterval(this.timer);
      } else if(this.state.url === this.paper) {
        this.setState({
          result:'이겼습니다!',
        })
        clearInterval(this.timer);
      } else if(this.state.url === this.rock) {
        this.setState({
          result:'졌습니다!',
        })
        clearInterval(this.timer);
      }
    } else if(event.target.id === 'paper'){ // user
      if (this.state.url === this.scissor){ //computer
        this.setState({
          result:'졌습니다!',
        })
        clearInterval(this.timer);
      } else if(this.state.url === this.paper) {
        this.setState({
          result:'비겼습니다!',
        })
        clearInterval(this.timer);
      } else if(this.state.url === this.rock) {
        this.setState({
          result:'이겼습니다!',
        })
        clearInterval(this.timer);
      }
    }
  }

  onReset = () => {
    this.timer = setInterval(() => {
      this.setState({
        url: makeRandomImg(),
      });
    }, 100);
    this.setState({
      result: '버튼을 클릭해주세요.',
    })
  }

  render() {
    return (
      <div>
        <p>가위바위보 게임</p>
        <img style={{width:'200px', height: '200px'}} src={this.state.url}></img>
        <button id='rock' onClick={this.onButtonClick}>묵</button>
        <button id='scissor' onClick={this.onButtonClick}>찌</button>
        <button id='paper' onClick={this.onButtonClick}>빠</button>
        <div>{this.state.result}</div>
        <button onClick={this.onReset}>regame</button>
      </div>
    );
  }
}

module.exports = Rsp;