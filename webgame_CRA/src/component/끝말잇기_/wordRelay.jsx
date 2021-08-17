const React = require('react');
const { Component } = React;

class WordRelay extends Component {
  state = {
    word: '오레오' ,//제시될 단어
    value: '', //사용자 입력 값
    result: '', // 끝말잇기 결과
    order: 1, //플레이어 순서
  };

  onChange = (e) => {
    this.setState({ value: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault();
    if(this.state.word[this.state.word.length - 1] === this.state.value[0]){
      this.setState({
        value:'',
        result: '딩동댕!',
        order: this.state.order + 1,
        word: this.state.value,
      })
      this.input.focus();
    } else {
      this.setState({
        value:'',
        result: `땡! ${this.state.word}의 앞글자로 시작해야합니다.`,
      })
      this.input.focus();
    }
  }
  
  input;
  inputRef = c => { this.input = c; }

  render() {
    return (
      <>
        <form onSubmit={this.onSubmit}>
          <div>{this.state.order}번째 참가자</div>
          <div>제시어: {this.state.word}</div>
          <input ref={this.inputRef} onChange={this.onChange} value={this.state.value}/>
          <button>입력</button>
        </form>
        <div>{this.state.result}</div>
      </>
    );
  }
}

module.exports = WordRelay;