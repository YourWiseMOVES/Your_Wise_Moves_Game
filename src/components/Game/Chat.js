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

    scrollToBottom() {
        const scrollHeight = this.chatBox.scrollHeight;
        const height = this.chatBox.clientHeight;
        const maxScrollTop = scrollHeight - height;
        this.chatBox.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    componentDidMount() {
        if (this.props.state.game.game && this.props.state.game.game.id) {
            this.scrollToBottom();
        }
    }

    componentDidUpdate() {
        if (this.props.state.game.game && this.props.state.game.game.id) {
            this.scrollToBottom();
        }
    }

    render() {
        return (
            this.props.state.game.game && this.props.state.game.game.id ?
                <div className="chatPanel">
                    <h4 className="chatHeader">Game Chat</h4>
                    <ul className="messageHistory" ref={ref => this.chatBox = ref}>
                        {
                            this.props.state.chat.map(message => {
                                return (
                                    <li className="message" key={message.id}>{message.from}: {message.text}</li>
                                );
                            })
                        }
                    </ul>
                    <div style={{ float: "left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                    <form className="messageInput" onSubmit={this.props.sendMessage(this.state.newMessage)}>
                        <input
                            type="text"
                            placeholder="your message here"
                            onChange={this.handleChange}
                            value={this.state.newMessage}
                            className="messageText"
                        />
                        <button
                            type="submit"
                            className="messageSubmit"
                        >
                            Submit
                    </button>
                    </form>
                </div>
                :
                null
        );
    }
}

const mapStateToProps = state => ({
    state,
});

export default connect(mapStateToProps)(Chat);