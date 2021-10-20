const React = require('react');
const Tr = require('./tr');

const Table = ({ tableData, dispatch }) => {
  return (
    <table>
      <tbody>
      {Array(tableData.length).fill().map((tr, i) => (<Tr key={i} dispatch={dispatch} rowIndex={i} rowData={tableData[i]} />))}  
      {/* rowData는 ['','','']을 의미함 */}
      {/* tableData의 길이만큼 배열을 생성해서 Tr을 넣어준다 */}
      </tbody>
    </table>
    )
}
module.exports = Table;