import React from 'react'
import Button from './Button';

class ButtonRow extends React.Component {
    
    render() {
        return (
             <section className={`button-row ${this.props.row}`}>
                { this.props.buttons.map((btn) => <Button 
                                        key={btn} 
                                        buttonText={btn}
                                        handleBtnClick={this.props.handleBtnClick}
                                        />)
                }
            </section>
        )
               

    }
}

export default ButtonRow;