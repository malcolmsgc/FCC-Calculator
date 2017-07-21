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
  this.deleteFromOperation = this.deleteFromOperation.bind(this);
  this.allClear = this.allClear.bind(this);
  this.brackets = this.brackets.bind(this);
  this.hitIt = this.hitIt.bind(this);
  //helpers
  this.replaceOperator = this.replaceOperator.bind(this);
  this.playKeySound = this.playKeySound.bind(this);
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

//TO DO prevent or strip 0 before integer i.e. no 5x02, only 5x2.
addToOperation(btnValue) {
  btnValue = btnValue.toLowerCase();
  //setState with callback
  this.setState((prevState) => {
    return { currentOperation: (prevState.currentOperation === "0")  ? 
                                  prevState.currentOperation = btnValue :
                                  prevState.currentOperation += btnValue,
             screenDigit: btnValue.charAt(btnValue.length-1) }
    });
}


//helper function to replace an operator with a new operator
replaceOperator(oldOperator, newOperator) {
  console.log(oldOperator, newOperator);
  if (oldOperator === newOperator) {console.log('same'); return}
  //allow addition of negative after bracket
  if (oldOperator === "("  && newOperator === "-") {
    this.addToOperation(newOperator);
    return} 
  //prevent replacement of opening bracket for remaining operators
  if (oldOperator === "(") return; 
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
brackets(mathString) {
  //replace string operators with mathematical operators
  mathString = mathString.replace(/x/ig, "*");
  let bracket; //use to set screenDigit state and to append to mathString to create new currentOperation
  let openParen = mathString.match(/\(/g) || []; //match returns array and then use length to count occurance in string
  let closeParen = mathString.match(/\)/g) || []; //match returns array and then use length to count occurance in string
  openParen = openParen.length;
  closeParen = closeParen.length;
  const endOfStr = mathString.length-1; // index of last character
  console.log(mathString.charAt(endOfStr), openParen, closeParen);
  if (openParen !== closeParen && openParen > 0) {
    if ( !/[+\-*\/\(]/.test(mathString.charAt(endOfStr)) ) {
      bracket = ")";
    }
    else if ( /\(/.test(mathString.charAt(endOfStr)) ) {
      bracket = "(";
    }
    else {
      console.error(new Error("bracket disallowed"));
      return;
    }
    mathString = `${mathString}${bracket}`;
  }
  else { 
    // if nothing in current operation insert opening bracket
    if (mathString === "0") {
      mathString = "(";
      bracket = "(";
    }
    else {
        //check if operator at end of string
      if (/\./.test(mathString.charAt(endOfStr))) console.error(new Error("Not allowed bracket directly after period"));
      if ( /[+\-*\/]/.test(mathString.charAt(endOfStr)) ) {
        bracket = "(";
      }
      else {
        console.error(new Error("bracket disallowed"));
        return;
      }
      mathString = `${mathString}${bracket}`;
    }
  }
  //replace math operators with string operators
  mathString = mathString.replace(/\*/ig, "x");
  this.setState({ 
    currentOperation: mathString ,
    screenDigit: bracket                
  });
}

playKeySound() {
  this.refs.keysound.volume = 0.3;
  this.refs.keysound.currentTime = 0;
  this.refs.keysound.play();
}

//TO DO disallow numeral after closing bracket
handleKeyPress(e) {
  // boolean flag for which keys to listen to
  const valid = /[\d+=\-*/\.)(]|Backspace|Esc(ape)*|Enter/i.test(e.key) || e.keyCode === 13;
  console.log({valid});
  if (!valid) return;
  const operator = new RegExp(/[+=\-*x/\(]/i); //opening bracket included to prevent operator directly after (
  const started = !/^0$/.test(this.state.currentOperation); //boolean to show if operation begun
  console.log({started});
  // boolean flag to check first entry is operand - used for brackets keys
  const first = /^\-?\(?\d+\.?\d*$/.test(this.state.currentOperation);
  switch (e.key) {
    //TO DO only allow closing bracket if open bracket exists and is unclosed - check for number of open
    case "(":           if (!/\)/.test(this.state.screenDigit)) this.addToOperation(e.key);
                        break;                        
    case ")":           if (  !first && 
                              !operator.test(this.state.screenDigit) &&
                              !/\(/.test(this.state.screenDigit) ) 
                        { 
                                this.addToOperation(e.key);
                        }
                        break;
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
                        if (started) {
                          if (!operator.test(this.state.screenDigit)) this.addToOperation("x");
                          else this.replaceOperator(this.state.screenDigit, e.key);
                        }
                        break;        
    case "-":
    case "+":           
    case "/":           if (!operator.test(this.state.screenDigit)) {
                          if (started || (!started && e.key === "-") ) this.addToOperation(e.key);
                        }
                        else {
                          this.replaceOperator(this.state.screenDigit, e.key);
                        }
                        break;
    case ".":           if (  !/\./.test(this.state.screenDigit) && //dissallow period after a period
                              !/\d+\.\d+$/g.test(this.state.currentOperation) //dissallow period after a decimal
                        ) {
                          if (started) {/\d$/g.test(this.state.screenDigit) ? 
                            this.addToOperation(e.key) :
                            this.addToOperation(`0${e.key}`);
                          }
                          else {
                            this.addToOperation(`0${e.key}`);
                          }
                        }
                          break;  
    default:            // if statement prevents digits directly after closing bracket
                        // allows digits in all other cases
                        if (this.state.screenDigit !== ")") this.addToOperation(e.key);
                        console.log({first});
  }
  this.playKeySound();
}

handleBtnClick(buttonText) {
  const special = /[+=\-x÷)(\.]|( )|AC|C/i.test(buttonText);
  const started = !/^0$/.test(this.state.currentOperation); //boolean to show if operation begun
  console.log({started});
  if (!special) {
    // if statement prevents digits directly after closing bracket
    // allows digits in all other cases
    if (this.state.screenDigit !== ")") this.addToOperation(buttonText);
  }
  else {
    const operator = new RegExp(/[+=\-x/\(]/i); //opening bracket included to prevent operator directly after (
    switch (buttonText) {
      case "C":           console.log('delete');
                          this.deleteFromOperation();
                          break;
      case "AC":          this.allClear();
                          break;
      case "=":           this.hitIt(this.state.currentOperation);
                          break;
      case "( )":         this.brackets(this.state.currentOperation);
                          break;
      case "÷":           if (!operator.test(this.state.screenDigit)) this.addToOperation("/");
                          else this.replaceOperator(this.state.screenDigit, "÷");
                          break;
      case "+":            
      case "-":           
      case "x":           if (!operator.test(this.state.screenDigit)) {
                            this.addToOperation(buttonText);
                          }
                          else {
                            this.replaceOperator(this.state.screenDigit, buttonText);
                          }
                          break;
      case ".":           if (  !/\.$/g.test(this.state.screenDigit) && //dissallow period after a period
                              !/\d+\.\d+$/g.test(this.state.currentOperation) //dissallow period after a decimal
                        ) {
                          if (started) {/\d$/g.test(this.state.screenDigit) ? 
                            this.addToOperation(buttonText) :
                            this.addToOperation(`0${buttonText}`);
                          }
                          else {
                            this.addToOperation(`0${buttonText}`);
                          }
                        }
                          break;
      default:            this.addToOperation(buttonText);
    }
  }
  this.playKeySound();
}

//let's do the maths, people!
hitIt(mathString) {
  // do some sanitisation - mostly as a just in case as the function SHOULD only be called on limited inputs
  mathString = mathString.replace(/<\/*script>|[<>]/gi, "")
  //replace string operators with mathematical operators
                        .replace(/x/ig, "*");
  // make sure the last char isn't an operator. Allow closing bracket
  let endOfStr = mathString.length-1; // index of last character
  while ( /[+\-*\/(\.]/i.test(mathString.charAt(endOfStr)) ) {
    mathString = mathString.substring(0, endOfStr); 
    //prevent solo operator from stripping out state i.e. a single + being stripped and collapsing screen
    if (endOfStr === 0) {mathString = "0"}; 
    console.log(endOfStr);
    endOfStr--;
  }
  // Handle parenthesis matching
  let openParen = mathString.match(/\(/g) || []; //match returns array and then use length to count occurance in string
  let closeParen = mathString.match(/\)/g) || []; //match returns array and then use length to count occurance in string
  openParen = openParen.length;
  closeParen = closeParen.length;
  console.log(openParen, closeParen);
  if (openParen !== closeParen) {
    const err = (openParen > closeParen) ? new Error("an unclosed parenthesis"): new Error("a missing opening bracket") ;
    console.error(err);
    alert(`Your operation has mismatched parenthseses
    You have ${err.message}`);
    return err;
  }
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
        <audio ref="keysound" src="/sounds/keypress.wav"></audio>
      </div>
    );
  }
}

export default App;

//TO DO fix bug that runs replaceoperator func when neg number as screendigit 
// - prob need to replace references to screendigit with a lookup of last character in operation