import React, { Component } from 'react';
import Casing from './Components/Casing';
import './App.css';

class App extends Component {

constructor() {
  super();
  // methods
  this.addToOperation = this.addToOperation.bind(this);
  this.handleKeyPress = this.handleKeyPress.bind(this);
  this.deleteFromOperation = this.deleteFromOperation.bind(this);
  this.deleteOperation = this.deleteOperation.bind(this);
  this.brackets = this.brackets.bind(this);
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

deleteFromOperation() {
    this.setState((prevState) => {
    return { currentOperation: prevState.currentOperation.slice(0, prevState.currentOperation.length-1) || "0",
             screenDigit: prevState.currentOperation.charAt(prevState.currentOperation.length-2) || "0" }
    });
}

deleteOperation() {return}


addToOperation(btnValue) {
  //setState with callback
  this.setState((prevState) => {
    return { currentOperation: prevState.currentOperation === "0" ? 
                                  prevState.currentOperation = btnValue :
                                  prevState.currentOperation += btnValue,
             screenDigit: btnValue }
    });
}

//helper function to replace an operator with a new operator
replaceOperator() {}

//function for the "( )" button to figure out if opening or closing bracket needed
brackets() {}

handleKeyPress(e) {
  const valid = e.key.match(/[\d+=\-*/\.)(]|Backspace|Esc(ape)*|Enter/i) || e.keyCode === 13;
  if (!valid) return;
  const operator = new RegExp(/[+=\-*/\.)(]/i);
  switch (e.key) {
    case "Backspace":   console.log('delete');
                        this.deleteFromOperation();
                        break;
    case "Esc":
    case "Escape":      console.log('Esc');
                        break;
    case "Enter":
    case "=":           console.log('=');
                        break;
    case "*":           if (!this.state.screenDigit.match(/x/i)) this.addToOperation("x");
                        //key is * so needs translation
                        break;
    case "+":           //if (this.state.screenDigit === e.key) break; 
    case "-":           //if (this.state.screenDigit === e.key) break; 
    case "/":           if (this.state.screenDigit.match(operator)) break;
    default:            console.log(e.key)
                        this.addToOperation(e.key);
  }
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
