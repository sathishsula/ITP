
import Header from './components/Header';
import AddItems from './components/AddItems';
import AllItems from './components/Stock';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Stock from './components/Stock';


function App() {
  return (
    <Router>
      <div>   
        <Header/>
        
        
        
        <Routes>
          <Route path="/additems" element={<AddItems />} />
          <Route path="/stock" element={<Stock/>} />
        </Routes>
      </div>
      </Router>
  );
}

export default App; 
