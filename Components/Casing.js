import React from 'react';
import Screen from './Screen';
import ButtonRow from './ButtonRow';


const Casing = (props) => {

    const rows = Object.keys(props.buttons);
    return (
        <div className="case">
            <Screen screenOutput="Some numbers 232445"/>
            <section className="keypad">
                {rows.map( (row) => <ButtonRow key={row} buttons={props.buttons[row]} /> )}
            </section>
            
        </div>
    )
}
export default Casing;
