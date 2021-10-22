const React = require('react');
const { useEffect, useReducer, useCallback } = require('react');
const { ModuleFilenameHelpers } = require('webpack');
const Table = require('./table');

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [['','',''],['','',''],['','','']],
  recentCell: [-1, -1], //최근에 클릭한 셀을 기억하는 state
}

//action의 이름은 상수로 정의(대문자)하는게 규칙
exports.SET_WINNER = 'SET_WINNER';
exports.CLICK_CELL = 'CLICK_CELL';
exports.CHANGE_TURN = 'CHANGE_TURN'; //턴을 바꿔주는 action
// module.exports = SET_WINNER;
// module.exports = CLICK_CELL;
// module.exports = CHANGE_TURN;


const reducer = (state, action) => { //action이 dispatch될때마다 reducer가 실행됨
  switch(action.type){
    case 'SET_WINNER':
      //state.winner = action.winner //이렇게 직접 변경하면 안됨, react의 불변성 특징때문에
      return { //여기서 기존 state를 action.winner로 변경하는 곳
        ...state, // 기존 state 복사해서
        winner:action.winner //새로운 winner 업데이트 해주고
      };
      //새로운 winner를 반환한다
    case CLICK_CELL:
      //기존 테이블 데이터를 얕은 복사하고(spread 연산자를 이용해서)
      //객체가 있으면 복사를 해서 불변성을 지켜줘야한다고 생각하기
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]]; 
      //immer라는 라이브러리를 사용해서 가독성을 해결함
      // 칸에다가 현재 턴인 O나 X가 들어갈 수 있도록
      tableData[action.row][action.cell] = state.turn;
      return{
        ...state,
    };
    case CHANGE_TURN:
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      }
  }
}

const Tictactoe = () => {
  const [state, dispatch] = useReducer(reducer, initialState); //세번째 인자는 지연초기화인데 잘 쓰이지 않음
  const { tableData, turn, winner, recentCell } = state;
  // 너무 많아지는 state와 set을 한번에 만들어 대체하기 위해서 useReducer로 만들어준다
  // state가 변경될 때마다 action이 발생하고 dispatch가 action을 실행하고 실행할 것을 정의해주느 것이 reducer의 역할이다.
  // const [wiiner, setWiiner] = useState('');
  // const [turn, setTurn] = useState('O');
  // const [tableData, setTableData] = useState('');

  const onClickTable = useCallback(() => { 
    // 컴포넌트에 넣는 함수들, 이벤트들은 useCallback을 사용
    dispatch({ type: SET_WINNER, winner: 'O' }); 
    //dispatch안에 들어가는 action객체를 만들어줘야 함 (redux에서 따온 개념)
  }, []);

  // 비동기적인 dispatch의 state를 변경하기 위한 useEffect
  useEffect(() => {
    const [row, cell] = recentCell;
    if (row < 0) {
      return;
    }
    let win = false; //처음에는 승자가 없음
    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true;
    }
    if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
      win = true;
    }
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = true;
    }
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = true;
    }
    console.log(win, row, cell, tableData, turn);
    if (win) { // 승리시
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type: RESET_GAME });
    } else {
      let all = true; // all이 true면 무승부라는 뜻
      tableData.forEach((row) => { // 무승부 검사
        row.forEach((cell) => {
          if (!cell) {
            all = false;
          }
        });
      });
      if (all) {
        dispatch({ type: SET_WINNER, winner: null });
        dispatch({ type: RESET_GAME });
      } else {
        dispatch({ type: CHANGE_TURN });
      }
    }
    //recentCell이 변경되면 useEffect가 실행된다
  }, [recentCell]);

    return (
      <>
        <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch}/>
        {winner && <div>{winner}님의 승리</div>}
      </>
     
    );
}

module.exports = Tictactoe;


  
