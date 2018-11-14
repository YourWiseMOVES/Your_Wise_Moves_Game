import React, { Component } from "react";
import axios from "axios";

/* Import Components */

// import Input from "./Input";
// import Select from "./Select";
// import Button from "./Button";
import swal from 'sweetalert';


class FacilitatorForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newFacilitator: {
                username: '',
                password: '',
                first_name: '',
                last_name: '',
                email: '',
                organization: '',
                phone_number: '',
                is_facilitator: '',
                is_admin: '',
            },

            is_facilitator: [
                { value: true, label: 'True' },
                { value: false, label: 'False' }
            ],

            is_admin: [
                { value: true, label: 'True' },
                { value: false, label: 'False' }
            ],

        };

        if (props.action === 'edit') {
            this.state.newFacilitator = props.facilitator  // this will pre-populate the newMember in the state with the data that we pass in through the member prop
        }       // the member prop is on the AdminPage

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDeleteFacilitator = this.handleDeleteFacilitator.bind(this);
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
                newFacilitator: {
                    ...prevState.newFacilitator,
                    [name]: value
                }
            }),
            () => console.log(this.state.newFacilitator)
        );
    }

    handleTextArea(e) {
        console.log("Inside handleTextArea");
        let value = e.target.value;
        this.setState(
            prevState => ({
                newFacilitator: {
                    ...prevState.newFacilitator,
                    about: value
                }
            }),
            () => console.log(this.state.newFacilitator)
        );
    }

    handleFormSubmit(e) {
        e.preventDefault();
        console.log(this.state.newFacilitator);
        axios.post('/api/register', { "facilitators": this.state.newFacilitator }) // newFacilitator includes all the db fields
            .then((response) => {
                console.log('this is the response for add facilitator', response.status);
                if (response.status === 200) {

                    this.handleClearForm(e)
                    swal("Good job!", "Your facilitator was added to the database!", "success");
                }
            }).catch((error) => {
                console.log('error making get', error);
            });
    }

    handleClearForm(e) {
        e.preventDefault();
        this.setState({
            newFacilitator: {
                username: '',
                password: '',
                first_name: '',
                last_name: '',
                email: '',
                organization: '',
                phone_number: '',
                is_facilitator: '',
                is_admin: '',
            }
        });
    }

    // DON'T WANT TO ACTUALLY DELETE FACILITATOR -- JUST WOULD CHANGE is_facilitator TO FALSE
    handleDeleteFacilitator(e) {
        let fName = this.state.newFacilitator.first_name
        let lName = this.state.newFacilitator.last_name
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete('/api/register', { data: { first_name: fName, last_name: lName } })//in axios delete, in order to send a body, need to include body as the value of the data key
                        .then((response) => {
                            if (response.status === 200) {

                                swal("Your file has been deleted!", {
                                    icon: "success",
                                });
                            }
                            console.log('this is the response for the facilitator info', response);
                        }).catch((error) => {
                            console.log('error deleting facilitator', error);
                        });

                } else {
                    swal("Your file is safe!");
                }
            });
        e.preventDefault();
    }

    handleUpdate(e) {
        e.preventDefault();
        console.log(this.state.newFacilitator);
        axios.put('/api/register', this.state.newFacilitator) // newFacilitator includes all the db fields
            .then((response) => {
                console.log('this is the response for update facilitator', response.status);
                if (response.status === 200) {
                    // this.props.updateParent()
                    swal("Your facilitator was updated in the database!", "success");
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
                        <div>
                            <label>
                                Username:
                            <input type="text" name="username" placeholder="Username"
                                // inputType={"text"}
                                // name={"username"}
                                // title={"User Name"}
                                // value={this.state.newFacilitator.username}
                                // placeholder={"User Name"}
                                // handleChange={this.handleInput}
                            />
                            </label>
                        </div>
                        <div>
                            <input type="text" name="password" placeholder="Password"
                                // inputType={"text"}
                                // name={"password"}
                                // title={"Password"}
                                // value={this.state.newFacilitator.password}
                                // placeholder={"Email"}
                                // handleChange={this.handleInput}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div>
                            <input type="text" name="first_name" placeholder="First Name"
                                // inputType={"text"}
                                // title={"First Name"}
                                // name={"first_name"}
                                // value={this.state.newFacilitator.first_name}
                                // placeholder={"First name"}
                                // handleChange={this.handleInput}
                            />{" "}
                        </div>
                        {/* Name of the user */}
                        <div>
                            <input type="text" name="last_name" placeholder="Last Name"
                                // inputType={"text"}
                                // name={"last_name"}
                                // title={"Last Name"}
                                // value={this.state.newFacilitator.last_name}
                                // placeholder={"Last name"}
                                // handleChange={this.handleInput}
                            />{" "}
                        </div>
                    </div>


                    {/* Row 2 */}
                    <div className="row">
                        <div>
                            <input type="text" name="email" placeholder="Email"
                                // inputType={"text"}
                                // name={"email"}
                                // title={"Email"}
                                // value={this.state.newFacilitator.email}
                                // placeholder={"Email"}
                                // handleChange={this.handleInput}
                            />
                        </div>
                        <div>
                            <input type="text" name="organization" placeholder="Organization"
                                // inputType={"text"}
                                // name={"organization"}
                                // title={"Organization"}
                                // value={this.state.newFacilitator.organization}
                                // placeholder={"Organization"}
                                // handleChange={this.handleInput}
                            />
                        </div>
                        <div>
                            <input type="number" name="phone_number" placeholder="Phone Number"
                                // inputType={"number"}
                                // name={"phone_number"}
                                // title={"Phone Number"}
                                // value={this.state.newFacilitator.phone_number}
                                // placeholder={"Phone Number"}
                                // handleChange={this.handleInput}
                            />
                        </div>
                    </div>

                    {/* Row 4 */}
                    <div className="row">
                        <div>Are you a Facilitator?
                            <select
                                title={"Is Facilitator?"}
                                name={"is_facilitator"}
                                // options={this.state.is_facilitator}
                                // value={this.state.newFacilitator.is_facilitator}
                                // placeholder={"Facilitator?"}
                                // handleChange={this.handleInput}
                            >Are you a Facilitator?
                                <option id="true">True</option>
                                <option id="false">False</option>
                            </select>
                        </div>
                    </div>

                    {/* Row 5 */}
                    <div className="row">
                        <div>Are you and Aministrator?
                            <select 
                                title={"Is Admin?"}
                                name={"is_admin"}>
                                <option id="true">True</option>
                                <option id="false">False</option>
                            </select>
                        </div>
                    </div>


                    <button
                        type={"submit"}
                        value="Submit"
                        action={this.props.action === 'add' ? this.handleFormSubmit : this.handleUpdate}
                        title={this.props.action === 'add' ? "Submit" : "Update"} //if this.props.action = add, then show the submit button
                    // style={buttonStyle}         //add is on the AdminPage
                    />{" "}

                    {/*Submit */}
                    <button onClick="handleFormSubmit()"
                        // type={"clear"}
                        // value="Clear"
                        // action={this.handleClearForm}
                        // title={"Clear"}
                    // style={buttonStyle}
                    >Submit</button>{" "}

                    <button onClick="handleClearForm(e)">Clear</button>
                    {/* Clear the form */}


                    <button onClick="handleUpdate(e)">Update</button>



                    {this.props.action === 'edit' ? //if this.props.action == 'edit', then the delete button will also show
                        <button
                            type={"delete"}
                            value="Delete"
                            action={this.handleDeleteMember}
                            title={"Delete"}
                        // style={buttonStyle}
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

export default FacilitatorForm;