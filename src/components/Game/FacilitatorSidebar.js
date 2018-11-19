import React, { Component } from 'react';
import { connect } from 'react-redux';



class FacilitatorSidebar extends Component {

    render() {
        return (
            <div>
                <h1>Facilitator Sees this stuff</h1>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    state,
});

export default connect(mapStateToProps)(FacilitatorSidebar);