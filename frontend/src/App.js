
import Header from './components/Header';
import AddItems from './components/AddItems';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Stock from './components/Stock';
import Item from './components/Item';
import Update from './components/Update';


function App() {
  return (
    <Router>
      <div>   
        <Header/>
        <Routes>
          <Route path="/additems" element={<AddItems />} />
          <Route path="/stock" element={<Stock/>} />
          <Route path="/item/:referenceNo"  element={<Item/>} />
          <Route path="/update/:referenceNo" element={<Update/>} />
        </Routes>
      </div>
      </Router>
  );
}

export default App; 
