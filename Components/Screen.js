import React from 'react'


class Screen extends React.Component {
    
    render() {
            return (
                <div className="screenWrapper">
                    <div className="screen">
                        {this.props.screenDigit}
                        <aside>{this.props.currentOperation}</aside>
                    </div>
                </div>
            )
    }
}
export default Screen;
