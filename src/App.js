import './App.css';
import Create from './components/Create';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Read from './components/Read';
import Update from './components/Update';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Signup';
import Login from './components/Login';

import HideNavBar from './components/hideNavBar';

function App() {
  return (
    <div className="App">

      <BrowserRouter>

        <HideNavBar>
          <Navbar />
        </HideNavBar>

        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/all" element={<Read />} />
          <Route path="/:id" element={<Update />} />

          <Route exact path="/create" element={<Create />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
