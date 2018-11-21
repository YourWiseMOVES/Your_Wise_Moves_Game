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
                {this.props.state.game.gameState[0] === '0' &&
                    this.props.state.gameCode !== '' ?
                    <div>
                        {this.props.state.game.gameState[1] == '0' &&
                            <div></div>
                        }
                        {this.props.state.game.gameState[1] == '1' &&
                            <div></div>
                        }
                        {this.props.state.game.gameState[1] == '2' &&
                            <div></div>
                        }
                    </div>
                    :
                    this.props.state.game.gameState[0] === '0' ?
                        <div>
                            {
                                this.state.userType === '' &&
                                null
                            }
                            {
                                this.props.state.user.userType === 'player' &&
                                <div>

                                </div>
                            }
                            {
                                this.props.state.user.userType === 'facilitator' &&
                                <div>
                                    {this.props.state.user.userReducer && this.props.state.user.userReducer.is_facilitator ?
                                        <div></div>
                                        :
                                        <div></div>
                                    }
                                </div>
                            }
                        </div>
                        :
                        null
                }
                {this.props.state.game.gameState[0] > 0 && this.props.state.game.gameState[0] < 6 &&
                    <div>
                    {this.props.state.game.gameState[1] == '0' &&
                       <div></div>
                    }
                    {this.props.state.game.gameState[1] == '1' &&
                        <div></div>
                    }
                    {this.props.state.game.gameState[1] == '2' &&
                        <div></div>
                    }
                </div>
                }
                {this.props.state.game.gameState[0] == '6' &&
                    <div></div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    state,
});

export default connect(mapStateToProps)(ActionPanel);