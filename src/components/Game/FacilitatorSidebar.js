import React, { Component } from 'react';
import { connect } from 'react-redux';



class FacilitatorSidebar extends Component {

    state = {
        gameConfig: {
            name: '',
            deckId: '',
            maxPlayers: '',
            canKick: '',
            showDirections: '',
        },
    }

    handleChange = (event) => {
        this.setState({
            gameConfig: {
                ...this.state.gameConfig,
                [event.target.name]: event.target.value,
            }
        })
    }

    render() {
        return (
            <div>
                {this.props.state.game.game && this.props.state.game.game.id ?
                    <React.Fragment>
                        <h1>{this.props.state.game.game.name}</h1>
                        <ul>
                            <li>Deck ID:{this.props.state.game.game.deck_id}</li>
                            <li>Max Players:{this.props.state.game.game.max_players}</li>
                            {this.props.state.game.game.can_kick &&
                                <li>Can Kick</li>
                            }
                            {this.props.state.game.game.show_directions &&
                                <li>Show Directions</li>
                            }
                        </ul>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <h1>Facilitator Sees this stuff</h1>
                        <label>
                            Name your game!
                <input onChange={this.handleChange} placeholder="Name" name="name" value={this.state.name}></input>
                        </label>
                        <br></br>
                        <label>
                            Choose your deck.
                   {/* Will map through saved decks for this select */}
                            <select
                                onChange={this.handleChange}
                                name="deckId"
                                value={this.state.gameConfig.deckId}
                            >
                                <option>choose an option</option>
                                <option value={1}>Default</option>
                                <option value={2}>Fake Option One</option>
                                <option value={3}>Fake Option Two</option>
                            </select>
                        </label>
                        <br></br>
                        <label>
                            Set max player count
                    <select
                                onChange={this.handleChange}
                                value={this.state.gameConfig.maxPlayers}
                                name="maxPlayers"
                            >
                                <option>choose an option</option>
                                <option value={4}>Four</option>
                                <option value={5}>Five</option>
                                <option value={6}>Six</option>
                                <option value={7}>Seven</option>
                                <option value={8}>Eight</option>
                            </select>
                        </label>
                        <br></br>

                        <label>
                            Can a facilitator kick players?
                    <select
                                onChange={this.handleChange}
                                value={this.state.gameConfig.canKick}
                                name="canKick"
                            >
                                <option>choose an option</option>
                                <option value={true}>yes</option>
                                <option value={false}>no</option>
                            </select>
                        </label>
                        <br></br>

                        <label>
                            Show directions in chat?
                    <select
                                onChange={this.handleChange}
                                value={this.state.gameConfig.showDirections}
                                name="showDirections"
                            >
                                <option>choose an option</option>
                                <option value={true}>yes</option>
                                <option value={false}>no</option>
                            </select>
                        </label>
                        <br></br>
                        <button onClick={() => this.props.createGame(this.state.gameConfig)}>Create A New Game</button>
                    </React.Fragment>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    state,
});

export default connect(mapStateToProps)(FacilitatorSidebar);