import React, { Component } from "react";
import {connect} from 'react-redux'
/* Import Components */

import Input from "./Input";
import Select from "./Select";
import Button from "./Button";
import swal from 'sweetalert';


class QuestionForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newQuestion: {
                text: '',
                stage_id: '',

            },

            stageOptions: [
                { value: 1, label: '1: Map' },
                { value: 2, label: '2: Open' },
                { value: 3, label: '3: Visualize' },
                { value: 4, label: '4: Engage' },
                { value: 5, label: '5: Sustain' }
            ]

        };
        // this.handleUpdate = this.handleUpdate.bind(this);
        // this.handleDeleteQuestion = this.handleDeleteQuestion.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        // this.handleClearForm = this.handleClearForm.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    /* This lifecycle hook gets executed when the component mounts */

    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState(
            prevState => ({
                newQuestion: {
                    ...prevState.newQuestion,
                    [name]: value
                }
            }),
            () => console.log(this.state.newQuestion)
        );
    }

    handleFormSubmit(event) {
        event.preventDefault();
        this.props.dispatch({type:'ADD_CARD', payload:this.state.newQuestion})
        this.setState({
            newQuestion: {
                text: '',
                stage_id: ''
            }
        });
        swal('card added!')
    }
    render() {
        return (
            <div>
                <form className="container-fluid" style={{ height: "100%" }} onSubmit={this.handleFormSubmit}>
                    {/* Row 1 */}
                    <div className="row">
                        <div className="col-sm-10">
                            <Input
                                inputType={"text"}
                                title={"Question:"}
                                name={"text"}
                                value={this.state.newQuestion.text}
                                placeholder={"New Question to Add"}
                                handleChange={this.handleInput}
                            />{" "}
                        </div>

                    
                        <div className="col-sm-2">
                            <Select
                                title={"Stage"}
                                name={"stage_id"}
                                options={this.state.stageOptions}
                                value={this.state.newQuestion.stage_id}
                                placeholder={"Select Stage"}
                                handleChange={this.handleInput}
                            />
                        </div>
                    </div>


                    <Button
                        action={this.handleFormSubmit} //if the action is add, the function called will be handleFormSubmit
                        type={"primary"}
                        title={'add'} //if this.props.action = add, then show the submit button
                        style={buttonStyle}         //add is on the InfoPage -- if not add, it will be edit
                    />{" "}
                    {/*Submit */}
                    <Button
                        action={this.handleClearForm}
                        type={"secondary"}
                        title={"Clear"}
                        style={buttonStyle}
                    />{" "}
                    {/* Clear the form */}
                    {this.props.action === 'edit' ? //if this.props.action == 'edit', then the delete button will also show
                        <Button
                            action={this.handleDeleteQuestion}
                            type={"secondary"}
                            title={"Delete"}
                            style={buttonStyle}
                        />      // if this.props.action is anything else, (add), then show null/nothing
                        : null}
                </form>
            </div>
        );
    }
}

const buttonStyle = {
    margin: "10px 10px 10px 10px"
};

export default connect () (QuestionForm);