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
            this.sidebar.className = "sidebar showSidebar"
            event.target.className = "sidebarButton moveSidebarButton"
            this.setState({
                trigger: !this.state.trigger,
            })
        } else {
            console.log('goodbye');
            event.target.className = "sidebarButton moveSidebarButtonBack"
            this.sidebar.className = "sidebar hideSidebar"
            this.setState({
                trigger: !this.state.trigger,
            })

        }
    }

    render() {
        return (
            <div ref={ref => this.sidebar = ref} className="sidebar">
                <button className="sidebarButton" onClick={this.triggerSidebar}>Side Bar</button>
                {this.props.state.user.userReducer && this.props.state.user.userReducer.is_facilitator ?
                    <FacilitatorSidebar 
                        createGame={this.props.createGame}
                    />
                    :
                    <Journal />
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    state,
});

export default connect(mapStateToProps)(Sidebar);