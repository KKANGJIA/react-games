const React = require('react');
const Td = require('./td');

const Tr = ({ rowData, rowIndex, dispatch }) => {
  return(
    <tr>
      {Array(rowData.length).fill().map((td, i) => (<Td key={i} dispatch={dispatch} rowIndex={i} cellData={rowData[i]} cellIndex={i}>{''}</Td>))}
    </tr>
    )
}

module.exports = Tr;