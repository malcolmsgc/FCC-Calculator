import React, { Component } from 'react';
import math from 'mathjs';
import Casing from './Components/Casing';
import './App.css';
import { btnLabels } from './Components/content/btnLabels';

class App extends Component {

constructor() {
  super();
  // methods
  this.addToOperation = this.addToOperation.bind(this);
  this.handleBtnClick = this.handleBtnClick.bind(this);
  this.handleKeyPress = this.handleKeyPress.bind(this);
  this.replaceOperator = this.replaceOperator.bind(this);
  this.deleteFromOperation = this.deleteFromOperation.bind(this);
  this.allClear = this.allClear.bind(this);
  this.brackets = this.brackets.bind(this);
  this.hitIt = this.hitIt.bind(this);
  //state and content
  this.buttons = btnLabels;
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

allClear() {
  this.setState((prevState) => {
    return { currentOperation: "0",
             screenDigit: "0" }
    });
}


addToOperation(btnValue) {
  //setState with callback
  this.setState((prevState) => {
    return { currentOperation: (prevState.currentOperation === "0" && btnValue != ".")  ? 
                                  prevState.currentOperation = btnValue :
                                  prevState.currentOperation += btnValue,
             screenDigit: btnValue }
    });
}


//helper function to replace an operator with a new operator
replaceOperator(oldOperator, newOperator) {
  console.log(oldOperator, newOperator);
  if (oldOperator === newOperator) {console.log('same'); return}
  else if (oldOperator === "/" && newOperator === "÷") {console.log('same ÷'); return}
  else if (newOperator === "÷") {
    this.deleteFromOperation();
    this.addToOperation("/")
  }
  else {
      this.deleteFromOperation();
      this.addToOperation(newOperator)
  }
return;
}

//function for the "( )" button to figure out if opening or closing bracket needed
brackets() {}


handleKeyPress(e) {
  const valid = e.key.match(/[\d+=\-*/\.)(]|Backspace|Esc(ape)*|Enter/i) || e.keyCode === 13;
  if (!valid) return;
  const operator = new RegExp(/[+=\-*/\.]/i);
  //const first = (this.state.currentOperation.charAt(0) !== "0" &&
  //              this.state.currentOperation.charAt(1) !== ".") ? true : false; 
  //console.log({first}, this.state.currentOperation.length);
  switch (e.key) {
    // TO DO Add case for brackets to prevent sets of brackets without operator in between
    // e.g. 8+5*6-(7)()
    // case "(":           if (!first);
    //                     break;
    // case ")":           console.log('parenth');
    //                     if (!first) {this.addToOperation(e.key);}
    //                     console.log({first}, this.state.currentOperation.length);
    //                     break;
    case "Backspace":   console.log('delete');
                        this.deleteFromOperation();
                        break;
    case "Esc":
    case "Escape":      this.allClear();
                        break;
    case "Enter":
    case "=":           console.log('=');
                        this.hitIt(this.state.currentOperation);
                        break;
    case "*":           //key is * so needs translation
                        if (!this.state.screenDigit.match(operator)) this.addToOperation("x");
                        else this.replaceOperator(this.state.screenDigit, e.key);
                        break;
    case ".":           
    case "+":            
    case "-":           
    case "/":           if (!this.state.screenDigit.match(operator)) {
                          this.addToOperation(e.key);
                        }
                        else {
                          this.replaceOperator(this.state.screenDigit, e.key);
                        }
                        break;
    default:            this.addToOperation(e.key);
  }
}

handleBtnClick(buttonText) {
  const special = buttonText.match(/[+=\-x÷)(]|( )|AC|C/i);
  if (!special) {
    this.addToOperation(buttonText);
  }
  else {
    const operator = new RegExp(/[+=\-x/]/i);
    switch (buttonText) {
      case "C":           console.log('delete');
                          this.deleteFromOperation();
                          break;
      case "AC":          this.allClear();
                          break;
      case "=":           this.hitIt(this.state.currentOperation);
                          break;
      case "( )":         console.log('() TO DO function');
                          break;
      case "÷":           if (!this.state.screenDigit.match(operator)) this.addToOperation("/");
                          else this.replaceOperator(this.state.screenDigit, "÷");
                          break;
      case "+":            
      case "-":           
      case "x":           if (!this.state.screenDigit.match(operator)) {
                            this.addToOperation(buttonText);
                          }
                          else {
                            this.replaceOperator(this.state.screenDigit, buttonText);
                          }
                          break;
      default:            this.addToOperation(buttonText);
    }
  }
}

//let's do the maths, people!
hitIt(mathString) {
  // do some sanitisation - mostly as a just in case as the function SHOULD only be called on limited inputs
  mathString = mathString.replace(/<\/*script>|[<>]/gi, "")
  //replace string operators with mathematical operators
                        .replace(/x/ig, "*");
  // make sure the last char isn't an operator
  const endOfStr = mathString.length-1; // index of last character
  if (mathString.charAt(endOfStr).match(/[+\-*\/(]/i)) mathString = mathString.substring(0, endOfStr);
  // TO DO need to handle final parenthesis - approach => check if num of open brackets === closed.
  console.log(mathString)
  const result = typeof math.eval(mathString) === 'number' ? math.eval(mathString).toString() : '';
  console.log(`Eval: ${eval(mathString)}`); //check against library result to see if library is wasteful dependancy
  // replace mathematical operators with string operators before it goes back into state
  mathString = mathString.replace(/\*/ig, "x");
  this.setState({ screenDigit: result,
                  currentOperation: mathString });
  return result;
}



  render() {
    return (
      <div className="App">
        <div className="flex-wrapper">
            <Casing buttons={this.buttons} 
            screenDigit={this.state.screenDigit} 
            currentOperation={this.state.currentOperation}
            handleBtnClick={this.handleBtnClick} />
        </div>
      </div>
    );
  }
}

export default App;
