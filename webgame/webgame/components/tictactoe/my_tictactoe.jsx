const React = require('react');
const { Component } = React;

function drawTable(){
  for(let i=0; i<3; i++){
    const table = document.querySelector('table');
    const tr = document.createElement('tr');
    for(let i=0; i<3; i++){
      const td = document.createElement('td');
      tr.append(td);
    } 
  table.appendChild(tr);
  }
}

class Tictactoe extends Component {
  state = {
    player: 'O',
    result: '',
  }

  // O,X로직
  turnPlayer = () => {
    if (this.state.player === 'O'){
      this.setState({
        player: 'X',
      }) 
    } else {
      this.setState({
        player: 'O',
      })  
    }
  }
  
  data = [['','',''],['','',''],['','','']];
  cnt = 0;
  //클릭이벤트
  onclickTable = (event) => {  
    let cell = event.target.cellIndex; //td
    let row = event.target.parentNode.rowIndex; //tr
    const table = event.target.parentNode.parentNode; //table

    //순서변경
    this.turnPlayer();
    this.data[row][cell] = `${this.state.player}`;
    table.children[row].children[cell].textContent = this.data[row][cell];
    
    
    this.cnt++;
    //결과확인
    if(this.cnt > 3){
      this.decideWinner();
    } else if (this.cnt > 8){
      console.log(this.cnt)
      this.setState({
        result: '무승부입니다.',
      })
      this.data = [[],[],[]]
    }
    
  }

  //승부확인
  decideWinner = () => {
    //같은 열
    console.log(this.data)
    for(let i=0; i<3; i++){
      console.log(this.data[i][0] , this.data[i][1] , this.data[i][2])
      if (this.data[i][0] === this.data[i][1] === this.data[i][2]){
        console.log('열이 동일')
        this.setState({
          result: `${this.data[i][0]}의 승리입니다`
        })
        break;
      }
    }
    
    //같은 행
    for(let i=0; i<3; i++){
      if (this.data[0][i] === this.data[1][i] === this.data[2][i]){
        console.log('행이 동일')
        this.setState({
          result: `${this.data[0][i]}의 승리입니다`
        })
        break;
      }
    }
    //대각선 왼쪽 오른쪽
    if (this.data[0][0] === this.data[1][1] === this.data[2][2]){
      //게임 끝 
      //this.data[0][0].textContent의 승리
      console.log('대각선')
      this.setState({
        result: `${this.data[0][0]}의 승리입니다`
      })
    } 
    if (this.data[0][2] === this.data[1][1] === this.data[2][0]){
      //게임 끝 
      //this.data[0][2]의 승리
      console.log('대각선')
      this.setState({
        result: `${this.data[0][2]}의 승리입니다`
      })
    }   
  }

  componentDidMount(){
    drawTable();
  }

  render() {
    const {result} = this.state;
    return (
      <div>
        <table onClick={this.onclickTable}></table>
        <div>결과: {result}</div>
      </div>
    );
  }
}

module.exports = Tictactoe;