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
                            <div>
                                <h1>Game Lobby</h1>
                            </div>
                        }
                        {this.props.state.game.gameState[1] == '1' &&
                            <div>
                                <h1>Intention Intro</h1>
                            </div>
                        }
                        {this.props.state.game.gameState[1] == '2' &&
                            <div>
                                <h1>Intention Input</h1>
                            </div>
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
                                    <h1>Player Login</h1>
                                </div>
                            }
                            {
                                this.props.state.user.userType === 'facilitator' &&
                                <div>
                                    {this.props.state.user.userReducer && this.props.state.user.userReducer.is_facilitator ?
                                        <div>
                                            <h1>Facilitator Game Management</h1>
                                        </div>
                                        :
                                        <div>
                                            <h1>Facilitator Login</h1>
                                        </div>
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
                       <div>
                           <h1>Round Intro</h1>
                       </div>
                    }
                    {this.props.state.game.gameState[1] == '1' &&
                        <div>
                            <h1>Answer Card</h1>
                        </div>
                    }
                    {this.props.state.game.gameState[1] == '2' &&
                        <div>
                            <h1>Discussion Phase</h1>
                        </div>
                    }
                </div>
                }
                {this.props.state.game.gameState[0] == '6' &&
                    <div>
                        <h1>Post Game</h1>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    state,
});

export default connect(mapStateToProps)(ActionPanel);