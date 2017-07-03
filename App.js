import React, { Component } from 'react';
import Casing from './Components/Casing';
import './App.css';

class App extends Component {

constructor() {
  super();
  this.state = {
      buttons: {
                row1: {
                  AC: "AC",
                  C: "C",
                  "( )": "function to run",
                  "+": "+"
                },
                row2: {
                  "7": 7,
                  "8": 8,
                  "9": 9,
                  "-": "-"
                },
                row3: {
                  "4": 4,
                  "5": 5,
                  "6": 6,
                  "x": "x"
                },
                row4: {
                  "1": 1,
                  "2": 2,
                  "3": 3,
                  "÷": "/"
                },
                row5: {
                  "0": 0,
                  ".": ".",
                  "=": "="
                }
              }
    };
}

  render() {
    return (
      <div className="App">
        <div className="flex-wrapper">
            <Casing buttons={this.state.buttons}/>
        </div>
      </div>
    );
  }
}

export default App;
