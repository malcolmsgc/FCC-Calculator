import React from 'react';
import Screen from './Screen';
import Button from './Button';


const Casing = (props) => {

console.log(Object.keys(buttons));

    return (
        <div className="case">
            <Screen screenOutput="Some numbers 232445"/>
            <Button buttonText="Btn"/>
            <Button buttonText="Btn"/>
            <Button buttonText="Btn"/>
            <Button buttonText="Btn"/>
        </div>
    )
}
export default Casing;
