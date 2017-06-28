import React, { Component } from 'react';
import Casing from './Components/Casing';
import logo from './logo.svg';
import './App.css';

class App extends Component {

constructor() {
  super();
    this.state = {
      buttons: {
                  name1: value1,
                  name2: value2,
                  name3: value3,
                  name4: value4,

      } 
    }
}

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Malcolm's calculator app</h2>
        </div>
        <div className="flex-wrapper">
            <Casing />
        </div>
      </div>
    );
  }
}

export default App;
