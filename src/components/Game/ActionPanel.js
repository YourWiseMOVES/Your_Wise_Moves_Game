import React, { Component } from 'react';
import { connect } from 'react-redux';
import Journal from './Journal';
import FacilitatorSidebar from './FacilitatorSidebar';


class Sidebar extends Component {
    state = {
        trigger: false,
    }

    triggerSidebar = (event) => {
        if (this.state.trigger === false) {
            console.log('Hello');
            this.actionPanel.className = "actionPanel showActionPanel"
            event.target.className = "actionPanelButton moveActionPanelButton"
            this.setState({
                trigger: !this.state.trigger,
            })
        } else {
            console.log('goodbye');
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

export default connect(mapStateToProps)(Sidebar);