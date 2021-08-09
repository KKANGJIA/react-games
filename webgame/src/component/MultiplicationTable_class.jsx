import React, { Component } from 'react';

class MultiplicationTable extends Component {
  state = {
    first: Math.floor(Math.random() * 9),
    second: Math.floor(Math.random() * 9),
    value: '', // 사용자 입력 값
    result: '', // 정답인지 오답인지 알려줄 결과
  }

  onChange = e => {
    this.setState({ value: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();
    if(parseInt(this.state.value) === this.state.first * this.state.second) {
      this.setState({
        result: `${this.state.value}, 정답입니다!`,
        value: '',
        first: Math.floor(Math.random() * 9),
        second: Math.floor(Math.random() * 9),
      })
      this.input.focus();
      //e.target.children[1].focus();
    } else {
      //console.log(typeof(parseInt(this.state.value))) // number
      this.setState({
        result: '오답입니다! 다시 풀어보세요.',
        value: '',
      })
      this.input.focus();
      //e.target.children[1].focus();
    }
  }
  
  input;
  ref = (c) => 
    this.input = c;
  
    render() {
    return (
      <>
       <div>MultiplicationTable</div> 
       <form onSubmit={this.onSubmit}>
         <h1>{this.state.first} X {this.state.second} = ? </h1>
         <input ref={this.ref} type="number" onChange={this.onChange} value={this.state.value}/>
         <button>입력</button>
       </form>
       <div>결과: {this.state.result}</div>
      </>
    );
  }
}

export default MultiplicationTable