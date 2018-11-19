import React, { Component } from 'react';
import { connect } from 'react-redux';

class Chat extends Component {

    state = {
        newMessage: '',
    }

    handleChange = event => {
        this.setState({
            newMessage: event.target.value,
        })
    }

    render() {
        return (
            <div>
                <ul>
                    {
                        this.props.state.chat.map(message => {
                            return (
                                <li key={message.id}>{message.from}: {message.text}</li>
                            );
                        })
                    }
                </ul>
                <form onSubmit={this.props.sendMessage(this.state.newMessage)}>
                    <input
                        type="text"
                        placeholder="your message here"
                        onChange={this.handleChange}
                        value={this.state.newMessage}
                    />
                    <input
                        type="submit"
                    />
                </form>


            </div>
        );
    }
}

const mapStateToProps = state => ({
    state,
});

export default connect(mapStateToProps)(Chat);