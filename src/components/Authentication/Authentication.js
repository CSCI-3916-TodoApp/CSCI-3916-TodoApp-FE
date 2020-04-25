import React, { Component} from 'react';
import { connect } from 'react-redux'
import {Button, ButtonGroup, Form, Modal, Row} from "react-bootstrap";

import {submitLogin, submitRegister} from '../../actions/authActions';

import logo from "../../assets/images/checkCircle-logo.png";

class Authentication extends Component {

    constructor(props){
        super(props);

        this.state = {
            toggleReg: false,
            userDetails:{
                name: '',
                username: '',
                password: ''
            },
            signInButton: 'success',
            signUpButton: 'secondary'
        };

        this.resetUserDetails = this.resetUserDetails.bind(this);
        this.handleSignUpButtonClick = this.handleSignUpButtonClick.bind(this);
        this.handleSignInButtonClick = this.handleSignInButtonClick.bind(this);
        this.handleSubmitButtonClick = this.handleSubmitButtonClick.bind(this);
    }

    handleSignUpButtonClick() {
        this.setState({
            toggleReg: true,
            signInButton: 'secondary',
            signUpButton: 'success'
        });
    }

    handleSignInButtonClick() {
        this.setState({
            toggleReg: false,
            signInButton: 'success',
            signUpButton: 'secondary'
        });
    }

    handleSubmitButtonClick() {
        this.state.toggleReg ?
            this.register() :
            this.login();

        this.resetUserDetails()
    }

    register(){
        this.props.dispatch(submitRegister(this.state.userDetails))
    }

    login(){
        this.props.dispatch(submitLogin(this.state.userDetails));
    }

    updateUserDetails = (event) => {
        let updateDetails = Object.assign({}, this.state.userDetails);

        updateDetails[event.target.id] = event.target.value;

        this.setState({
            userDetails: updateDetails
        });
    };

    resetUserDetails() {
        this.setState({
            userDetails: {
                username: '',
                name: '',
                password: ''
            }
        })
    }

    render(){

        return (
            <div>
                <Modal size="md"
                       show={!this.props.loggedIn}
                       centered={true}
                       enforceFocus={true}>
                    <Modal.Header>
                        <Modal.Title className="mx-auto" id="ModalTitle">
                            <h3>Let's Do a Login!</h3>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>


                        <img className="mx-auto d-block" src={logo} width="200" height="200" alt="To-Do App Logo"/>

                        <Row>
                            <ButtonGroup className="mx-auto">
                                <Button variant={this.state.signUpButton}
                                        onClick={this.handleSignUpButtonClick}>Signup</Button>
                                <Button variant={this.state.signInButton}
                                        onClick={this.handleSignInButtonClick}>Signin</Button>
                            </ButtonGroup>
                        </Row>

                        <br/>

                        <Form>
                            <Form.Control plaintext readOnly defaultValue=" " hidden={this.state.toggleReg}/>

                            <Form.Group controlId="name">
                                <Form.Control onChange={this.updateUserDetails} value={this.state.userDetails.name} type="name" placeholder="name" hidden={!this.state.toggleReg}/>
                            </Form.Group>

                            <Form.Group controlId="username">
                                <Form.Control onChange={this.updateUserDetails} value={this.state.userDetails.username} type="username" placeholder="username"/>
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Control onChange={this.updateUserDetails} value={this.state.userDetails.password} type="password" placeholder="password"/>
                            </Form.Group>
                        </Form>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant="success"
                            type="submit"
                            block
                            onClick={this.handleSubmitButtonClick}
                        >
                            {this.state.toggleReg ? 'Register' : 'Go To Tasks'}
                        </Button>
                        {/*TODO: if login/register fails, the button should wiggle.*/}
                        {/*TODO: If it succeeds, it should dismiss and return to parent task.*/}
                    </Modal.Footer>
                </Modal>
            </div>
        )

    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn
    }
};

export default connect(mapStateToProps)(Authentication)