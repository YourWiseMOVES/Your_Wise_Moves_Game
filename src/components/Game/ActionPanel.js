import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';

class ActionPanel extends Component {
    state = {
        trigger: false,
        username: '',
        password: '',
        intention: '',
        response: '',
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

    login = (event) => {
        event.preventDefault();

        if (this.state.username && this.state.password) {
            this.props.dispatch({
                type: 'LOGIN',
                payload: {
                    username: this.state.username,
                    password: this.state.password,
                },
            });
        } else {
            this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
        }
    } // end login

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    render() {
        return (
            <div ref={ref => this.actionPanel = ref} className="actionPanel">

                <button className="actionPanelButton" onClick={this.triggerSidebar}>Action</button>
                <p>{this.props.state.game.game.code}</p>
                {this.props.state.game.gameState[0] === '0' &&
                    this.props.state.gameCode !== '' ?
                    <div>
                        {this.props.state.game.gameState[1] == '0' &&
                            <div>
                                <h1>Game Lobby</h1>
                                <ol>
                                    {
                                        this.props.state.game.allPlayers.map(player => {
                                            if (player.in_game) {
                                                return (
                                                    <li key={player.id}>{player.name}</li>
                                                )
                                            }
                                        })
                                    }
                                </ol>
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
                                {this.props.state.user.userReducer && this.props.state.user.userReducer.is_facilitator ?
                                    <div className="facilitator">
                                        <ol>
                                            {
                                                this.props.state.game.allPlayers.map(player => {
                                                    return (
                                                        <li key={player.id}>{player.name} Intention:{player.intention ? <p>Yes</p> : <p>No</p>}</li>
                                                    )
                                                })
                                            }
                                        </ol>

                                    </div>
                                    :
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Set your Intention or Question"
                                            onChange={this.handleInputChangeFor('intention')}
                                        />
                                        <button
                                            onClick={() => this.props.editIntention(this.state.intention)}
                                        >
                                            Save Intention
                                        </button>
                                    </div>
                                }
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
                                    <h1>Home Screen : not authed</h1>
                                    <h2>Player Login</h2>
                                    <button onClick={() => this.props.dispatch({ type: 'SET_USER_TYPE', payload: 'facilitator' })}>Log in as facilitator</button>
                                </div>
                            }
                            {
                                this.props.state.user.userType === 'facilitator' &&
                                <div>
                                    {this.props.state.user.userReducer && this.props.state.user.userReducer.is_facilitator ?
                                        <div>
                                            <h1>Facilitator Game Management</h1>
                                            <h2>Your Games</h2>
                                            <ol>
                                                {this.props.state.games.map(game => {
                                                    return (
                                                        <li key={game.id} onClick={() => {
                                                            this.props.dispatch({ type: 'CLEAR_SELECT_GAME' });
                                                            this.props.dispatch({ type: 'SELECT_GAME', payload: game });
                                                        }}
                                                        >{game.name}, {game.code}, {game.players} players, {game.active} active </li>
                                                    );
                                                })}
                                            </ol>
                                        </div>
                                        :
                                        <div>
                                            <h1>Facilitator Login</h1>
                                            <form onSubmit={this.login}>
                                                <h1>Login</h1>
                                                <div>
                                                    <label htmlFor="username">
                                                        Username:
                                                        <input
                                                            type="text"
                                                            name="username"
                                                            value={this.state.username}
                                                            onChange={this.handleInputChangeFor('username')}
                                                        />
                                                    </label>
                                                </div>
                                                <div>
                                                    <label htmlFor="password">
                                                        Password:
                                                        <input
                                                            type="password"
                                                            name="password"
                                                            value={this.state.password}
                                                            onChange={this.handleInputChangeFor('password')}
                                                        />
                                                    </label>
                                                </div>
                                                <div>
                                                    <input
                                                        className="log-in"
                                                        type="submit"
                                                        name="submit"
                                                        value="Log In"
                                                    />
                                                </div>
                                            </form>
                                            <button onClick={() => this.props.dispatch({ type: 'SET_USER_TYPE', payload: 'player' })}>Back To Player Home</button>
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
                                <h2>Round: {this.props.state.game.roundNumber}</h2>
                            </div>
                        }
                        {this.props.state.game.gameState[1] == '1' &&
                            <div>
                                <h1>Answer Card</h1>
                                <h2>Round: {this.props.state.game.roundNumber}</h2>
                                {this.props.state.user.userReducer && this.props.state.user.userReducer.is_facilitator ?
                                    <div>
                                        <ol>
                                            {this.props.state.game.allPlayers.map(player => {
                                                return (
                                                    <li key={player.id}>{player.name} ready: {player.in_discussion ? <p>yes</p> : <p>no</p>}</li>
                                                )
                                            })}
                                        </ol>
                                    </div>
                                    :
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Answer the question please"
                                            onChange={this.handleInputChangeFor('response')}
                                        />
                                        <button
                                            onClick={() => this.props.editJournal(this.state.response)}
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => {
                                                this.props.editJournal(this.state.response)
                                                this.props.advanceToDiscussion(this.props.state.game.player.id);
                                            }}
                                        >
                                            Save and continue
                                        </button>
                                    </div>
                                }
                            </div>
                        }
                        {this.props.state.game.gameState[1] == '2' &&
                            <div>
                                <h1>Discussion Phase</h1>
                                <h2>Round: {this.props.state.game.roundNumber}</h2>
                                {this.props.state.user.userReducer && this.props.state.user.userReducer.is_facilitator &&
                                    <ol>
                                        <h5>Select a Player to speak</h5>
                                        {this.props.state.game.allPlayers.map(player => {
                                            if (player.in_discussion && !player.discussed) {
                                                return (
                                                    <li key={player.id}>Name: {player.name} {!this.props.state.game.selectedPlayer.id && //only show the select button when there is no selected player
                                                        <button
                                                            onClick={() => this.props.selectPlayer(player)}
                                                        >Select</button>}</li>
                                                );
                                            }
                                        })
                                        }
                                    </ol>
                                }
                                <h2>Spoken</h2>
                                <ol>
                                    {this.props.state.game.allPlayers.map(player => {
                                        if (player.discussed === true) {
                                            return (
                                                <li key={player.id}>Name: {player.name}</li>
                                            );
                                        }
                                    })}
                                </ol>
                            </div>
                        }
                    </div>
                }
                {this.props.state.game.gameState[0] == '6' &&
                    <div>
                        <h1>Final Reflection</h1>
                        {this.props.state.user.userReducer && this.props.state.user.userReducer.is_facilitator &&
                            <LogOutButton />
                        }
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