import React, { Component } from 'react';
import Casing from './Components/Casing';
import logo from './logo.svg';
import './App.css';

class App extends Component {

constructor() {
  super();
  this.state = {
      buttons: {
        AC: "AC",
        C: "C",
        "( )": "function to run",
        "+": "+"
      }
    };
}

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Malcolm's calculator app</h2>
        </div>
        <div className="flex-wrapper">
            <Casing buttons={this.state.buttons}/>
        </div>
      </div>
    );
  }
}

export default App;
