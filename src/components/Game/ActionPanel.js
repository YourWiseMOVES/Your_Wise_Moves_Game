import React, { Component } from 'react';
import { connect } from 'react-redux';



class ActionPanel extends Component {
    state = {
        trigger: false,
    }

    triggerActionPanel = (event) => {
        if (this.state.trigger === false) {
            this.actionPanel.className = "actionPanel showActionPanel"
            event.target.className = "actionPanelButton moveActionPanelButton"
            this.setState({
                trigger: !this.state.trigger,
            })
        } else {
            event.target.className = "actionPanelButton moveActionPanelButtonBack"
            this.actionPanel.className = "actionPanel hideActionPanel"
            this.setState({
                trigger: !this.state.trigger,
            })
        }
    }

    render() {
        return (
            <div ref={ref => this.actionPanel = ref} className="actionPanel">
                <button className="actionPanelButton" onClick={this.triggerSidebar}>Action</button>                                  
            </div>
        );
    }
}

const mapStateToProps = state => ({
    state,
});

export default connect(mapStateToProps)(ActionPanel);