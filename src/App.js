import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import CommentScreen from './Screens/CommentScreen';
import HomeScreen from './Screens/HomeScreen';
import './Styles/style.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/comments' element={<CommentScreen/>} />
        <Route path='/' exact element={<HomeScreen/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
