

import LoginForm from './Components/LoginForm';
import ProductList from './Components/ProductList';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import './App.css'


const App = () => {

  
  return (
    <div className='container'>
      <Router>
        <div>
          <Routes>
              <Route path="/home" element={<ProductList/>}/>
              <Route path="/" element={<LoginForm  />}/>
                
              
          </Routes>
        </div>
      </Router>
      
    </div>
  );
};

export default App;


