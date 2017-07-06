import React from 'react'


class Button extends React.Component {
    
    render() {
         return (
                <button className="button" data-value={this.props.buttonValue} onClick={(e) => this.props.addToOperation(this.props.buttonValue) } >
                    {this.props.buttonText}
                </button>
            )
    }
}

export default Button;
