import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import Home from './components/Home';
import Topline from './components/Topline';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
function App() {
  return (
    <>
      <NoteState>

        <Router>

          <Topline />
          <Alert message= "This is amazing react course"/>
          <div className='container'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
