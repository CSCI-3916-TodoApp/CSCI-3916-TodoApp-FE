import React, {Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import Authentication from "../Authentication/Authentication";
import {logoutUser} from "../../actions/authActions";
import {clearTodos} from "../../actions/todoActions";

import logo from "../../assets/images/checkCircle-logo.png";

class TodoHeader extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.dispatch(clearTodos());
        this.props.dispatch(logoutUser());
    }

    render() {
        return (
            <div>
                <Navbar bg={"dark"} variant={"dark"} expand={"lg"}>
                    <Navbar.Brand href={"/"}>
                        <img
                            alt="To-Do App Logo"
                            src={logo}
                            width="45"
                            height="45"
                            className={"d-inline-block align-top"}
                        />{'  '}
                        Todo App
                    </Navbar.Brand>

                    <Nav className={"ml-auto"}>
                        <Nav.Item>
                            <Nav.Link onSelect={this.logout}  eventKey="logout" hidden={!this.props.loggedIn}>Logout</Nav.Link>
                        </Nav.Item>
                    </Nav>

                </Navbar>

                <Authentication/>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        username: state.auth.username,
        selectedTodo: state.todo.selectedTodo
    }
};

export default withRouter(connect(mapStateToProps)(TodoHeader));