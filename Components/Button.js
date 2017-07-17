import React from 'react'


class Button extends React.Component {


    
    render() {
        let { buttonText, buttonValue, handleBtnClick } = this.props;
         return (
                <button className="button" 
                data-btn={buttonText} 
                onClick={() => {
                    console.log(buttonText);
                    handleBtnClick(buttonText); 
                }}>
                    {buttonText}
                </button>
            )
    }
}

export default Button;