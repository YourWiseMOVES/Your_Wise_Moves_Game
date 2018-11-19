import React, { Component } from 'react';
import { connect } from 'react-redux';

class Journal extends Component {
    openQuestionNumber = questionKey => {
        this.question_one.style.display = 'none';
        this.question_two.style.display = 'none';
        this.question_three.style.display = 'none';
        this.question_four.style.display = 'none';
        this.question_five.style.display = 'none';

        this[questionKey].style.display = 'block';
    }

    componentDidMount(){
        this.openQuestionNumber('question_one');
    }

    render() {
        return (
            <div>
                <h2>Journal</h2>

                <div className="tab">
                    <button className="tablinks" onClick={() => this.openQuestionNumber('question_one')}>Question One</button>
                    <button className="tablinks" onClick={() => this.openQuestionNumber('question_two')}>Question Two</button>
                    <button className="tablinks" onClick={() => this.openQuestionNumber('question_three')}>Question Three</button>
                    <button className="tablinks" onClick={() => this.openQuestionNumber('question_four')}>Question Four</button>
                    <button className="tablinks" onClick={() => this.openQuestionNumber('question_five')}>Question Five</button>
                </div>

                <div id="QuestionOne" ref={ref => this.question_one = ref} className="tabcontent">
                    <h3>Question One</h3>
                    <p>{this.props.journal.question_one}</p>
                    <p>{this.props.journal.response_one}</p>
                </div>

                <div id="QuestionTwo" ref={ref => this.question_two = ref} className="tabcontent">
                    <h3>Question Two</h3>
                    <p>{this.props.journal.question_two}</p>
                    <p>{this.props.journal.response_two}</p>
                </div>

                <div id="QuestionThree" ref={ref => this.question_three = ref} className="tabcontent">
                    <h3>Question Three</h3>
                    <p>{this.props.journal.question_three}</p>
                    <p>{this.props.journal.response_three}</p>
                </div>

                <div id="QuestionFour" ref={ref => this.question_four = ref} className="tabcontent">
                    <h3>Question Four</h3>
                    <p>{this.props.journal.question_four}</p>
                    <p>{this.props.journal.response_four}</p>
                </div>

                <div id="QuestionFive" ref={ref => this.question_five = ref} className="tabcontent">
                    <h3>Question Five</h3>
                    <p>{this.props.journal.question_five}</p>
                    <p>{this.props.journal.response_five}</p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    state,
    journal: state.game.journal,
});

export default connect(mapStateToProps)(Journal);