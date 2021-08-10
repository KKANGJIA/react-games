import './App.css';
import MultiplicationTableClass from './component/MultiplicationTable_class';
// import MultiplicationTable from './component/MultiplicationTable_hooks';

function App() {
  return (
    <div className="App">
      <MultiplicationTableClass/>
      {/* 같은 컴포넌트를 여러번 등록해서 사용해도 따로 동작하기 때문에 중복의 위험이 제거됨 */}
    </div>
  );
}

export default App;
