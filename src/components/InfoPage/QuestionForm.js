import React, { Component } from "react";
import axios from "axios";

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

        if (props.action === 'edit') {
            this.state.newQuestion = props.question  // pre-populates the newQuestion in the state with the data that I pass in through the question prop
        }       // the question prop is on the InfoPage

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDeleteQuestion = this.handleDeleteQuestion.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
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

    handleFormSubmit(e) {
        e.preventDefault();
        console.log(this.state.newQuestion);
        axios.post('/api/card', this.state.newQuestion) 
            .then((response) => {
                console.log('this is the response for add question', response.status);
                if (response.status === 200) {
                    this.handleClearForm(e)
                    swal("Success!", "Your question was added to the database.");
                }
            }).catch((error) => {
                console.log('error making get', error);
            });
    }

    handleClearForm(e) {
        e.preventDefault();
        this.setState({
            newQuestion: {
                text: '',
                stage_id: ''
            }
        });
    }

    handleDeleteQuestion(e) {

        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this file.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete('/api/card/' + this.state.newQuestion.id)
                        .then((response) => {
                            if (response.status === 200) {
                                swal("Your file has been deleted.", {
                                    icon: "success",
                                });
                            }
                            console.log('this is the response for the question info', response);
                        }).catch((error) => {
                            console.log('error deleting question', error);
                        });

                } else {
                    swal("Your file is safe!");
                }
            });
        e.preventDefault();
    }

    handleUpdate(e) {
        e.preventDefault();
        console.log(this.state.newQuestion);
        axios.put('/api/card', this.state.newQuestion) // newQuestion includes all the db fields
            .then((response) => {
                console.log('this is the response for update member', response.status);
                if (response.status === 200) {
                    swal("Your question was updated in the database.");
                }
            }).catch((error) => {
                console.log('error making update', error);
            });
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
                        action={this.props.action === 'add' ? this.handleFormSubmit : this.handleUpdate} //if the action is add, the function called will be handleFormSubmit
                        type={"primary"}
                        title={this.props.action === 'add' ? "Submit" : "Update"} //if this.props.action = add, then show the submit button
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

export default QuestionForm;