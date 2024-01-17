import axios from 'axios';
import './App.css';

function App() {
  return (
    <div className="App">
      <button className='btn btn-primary' onClick={()=>{
        axios.get('https://codingapple1.github.io/shop/data2.json');
        }}>더보기</button>
    </div>
  );
}

export default App;