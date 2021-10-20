const { useCallback } = require('react');
const { CLICK_CELL } = require('./tictactoe');
const React = require('react');

const Td = ({ rowIndex, cellIndex, dispatch, cellData }) => {
  const onClickTd= useCallback(() => {
    // console.log(rowIndex, cellIndex)
    if (cellData) {
      return; //기존 셀데이터가 있으면 더이상 클릭이 불가능하도록
    }
    dispatch({ type: CLICK_CELL, row:rowIndex, cell:cellIndex }) //action은 마음대로 만들고 reducer에서 잘 처리해주면 됨
  }, [cellData]); //cellData가 변하면 함수가 실행되도록 

  return(
    <td onClick={onClickTd}>{cellData}</td>
  )
}

module.exports = Td;
