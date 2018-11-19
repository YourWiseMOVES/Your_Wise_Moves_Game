import React, { Component } from 'react';
import { connect } from 'react-redux';

class Journal extends Component {

    render() {
        return (
            <div>
                <pre>{JSON.stringify(this.props.state.game.player, null, 2)}</pre>
                <h2>Journal</h2>
                <h3>{this.props.journal.intention}</h3>
                <h4>Question One</h4>
                <p>{this.props.journal.question_one}</p>
                <p>{this.props.journal.response_one}</p>
                <h4>Question Two</h4>
                <p>{this.props.journal.question_two}</p>
                <p>{this.props.journal.response_two}</p>
                <h4>Question Three</h4>
                <p>{this.props.journal.question_three}</p>
                <p>{this.props.journal.response_three}</p>
                <h4>Question Four</h4>
                <p>{this.props.journal.question_four}</p>
                <p>{this.props.journal.response_four}</p>
                <h4>Question Five</h4>
                <p>{this.props.journal.question_five}</p>
                <p>{this.props.journal.response_five}</p>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    state,
    journal: state.game.journal,
});

export default connect(mapStateToProps)(Journal);