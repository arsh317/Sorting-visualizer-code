import React from 'react';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'
import './App.css';

function App() {
  return (
    <div className="App">
      <SortingVisualizer> </SortingVisualizer>
    </div>
  );
}

export default App;
