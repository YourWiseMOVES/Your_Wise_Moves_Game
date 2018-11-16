import React, { Component } from 'react';
import { connect } from 'react-redux';

class Journal extends Component {
    state = {
        trigger: false,
    }

    triggerSidebar = (event) => {
        if (this.state.trigger === false) {
            console.log('Hello');
            this.sidebar.className  = "sidebar showSidebar"
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
          <h3>Answer 1</h3>
          <p>Your answer to answer 1</p>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(Journal);