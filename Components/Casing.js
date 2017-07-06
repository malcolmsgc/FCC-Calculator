import React from 'react';
import Screen from './Screen';
import ButtonRow from './ButtonRow';


const Casing = (props) => {
    
    const rows = Object.keys(props.buttons);
    return (
        <div className="case">
            <Screen screenDigit={props.screenDigit} currentOperation={props.currentOperation} />
            <section className="keypad">
                {rows.map( (row) => <ButtonRow 
                                    key={row} 
                                    row={row} 
                                    buttons={props.buttons[row]} 
                                    addToOperation={props.addToOperation}/> 
                )}
            </section>
            
        </div>
    )
}
export default Casing;
