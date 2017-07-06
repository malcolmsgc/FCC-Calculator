import React from 'react'
import Button from './Button';

class ButtonRow extends React.Component {
    
    render() {
        return (
             <section className={`button-row ${this.props.row}`}>
                { Object.keys(this.props.buttons)
                        .map((btn) => <Button 
                                        key={btn} 
                                        buttonText={btn} 
                                        buttonValue={this.props.buttons[btn]} 
                                        addToOperation={this.props.addToOperation}
                                        />)
                }
            </section>
        )
               

    }
}

export default ButtonRow;