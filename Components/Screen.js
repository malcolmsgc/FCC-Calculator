import React from 'react'


class Screen extends React.Component {
    
    render() {
            return (
                <div className="screenWrapper">
                    <div className="screen">{this.props.screenOutput}</div>
                </div>
            )
    }
}
export default Screen;
