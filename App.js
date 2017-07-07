import React, { Component } from 'react';
import Casing from './Components/Casing';
import './App.css';

class App extends Component {

constructor() {
  super();
  // methods
  this.addToOperation = this.addToOperation.bind(this);
  this.handleKeyPress = this.handleKeyPress.bind(this);
  //state and content
  this.buttons = {
                row1: {
                  AC: "AC",
                  C: "C",
                  "( )": "function to run",
                  "+": "+"
                },
                row2: {
                  "7": "7",
                  "8": "8",
                  "9": "9",
                  "-": "-"
                },
                row3: {
                  "4": "4",
                  "5": "5",
                  "6": "6",
                  "x": "x"
                },
                row4: {
                  "1": "1",
                  "2": "2",
                  "3": "3",
                  "÷": "/"
                },
                row5: {
                  "0": "0",
                  ".": ".",
                  "=": "="
                }
              }
  this.state = {
    screenDigit: "0",
    currentOperation: "0"
  };
}

// LIFECYCLE METHODS

componentDidMount() {
  document.addEventListener('keyup', this.handleKeyPress);
}

// COMPONENT METHODS

handleKeyPress(e) {
  const valid = e.key.match(/[\d+=\-*\.)(]|Backspace|Esc(ape)*|Enter/i) || e.keyCode === 13;
  if (!valid) return;
  
  switch (e.key) {
    case "Backspace":   console.log('delete');
                        break;
    case "Esc":
    case "Escape":      console.log('Esc');
                        break;
    case "Enter":
    case "=":           console.log('=');
                        break;
    default:            this.addToOperation(e.key);
  }
}


addToOperation(btnValue) {
  //take a copy of state
  //let operation = this.state.currentOperation;
  //test run of using setState with callback
  this.setState((prevState) => {
    return { currentOperation: prevState.currentOperation === "0" ? 
                                  prevState.currentOperation = btnValue :
                                  prevState.currentOperation += btnValue,
             screenDigit: btnValue }
    });
}

  render() {
    return (
      <div className="App">
        <div className="flex-wrapper">
            <Casing buttons={this.buttons} 
            screenDigit={this.state.screenDigit} 
            currentOperation={this.state.currentOperation} 
            addToOperation={this.addToOperation} />
        </div>
      </div>
    );
  }
}

export default App;
