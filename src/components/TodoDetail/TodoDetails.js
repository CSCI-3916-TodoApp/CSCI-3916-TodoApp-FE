import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Button, Form} from "react-bootstrap";

import {fetchTodo, updateTodo, createTodo} from "../../actions/todoActions";

class TodoDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            todoDetails: {
                _id: '',
                name: '',
                dateDue: null,
                priority: "Low",
                completed: false,
                user: '',
                order: 0
            }
        };

        this.handleSubmitButtonClick = this.handleSubmitButtonClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const {dispatch} = this.props;
        if (!this.props.selectedTodo)
            dispatch(fetchTodo(this.props.id));

        this.setState({
            todoDetails: this.props.selectedTodo
        });
    }

    handleChange(event) {
        let updateDetails = Object.assign({}, this.state.todoDetails);

        updateDetails[event.target.id] = event.target.value;

        this.setState({
            todoDetails: updateDetails
        });
    }

    handleSubmitButtonClick() {
        const {dispatch} = this.props;

        if (this.state.todoDetails === null || this.state.todoDetails.name === '') {
            alert("Please enter a Todo name before submitting.");
            return;
        }

        if (this.state.todoDetails._id === undefined) {
            dispatch(createTodo(this.state.todoDetails))
        } else {
            dispatch(updateTodo(this.state.todoDetails))
        }

        this.props.history.push('/');
    }

    getDateWithTimeZoneOffset = (date) => {
        const offset = new Date(date).getTimezoneOffset();
        let modifiedDate = new Date(date).getTime() + (offset * 60 * 1000);
        return new Date(modifiedDate).toISOString().split('T')[0];
    };

    render() {
        let todo = this.state.todoDetails;

        return (
            <div>
                <div>
                    <h1>Todo Details</h1>
                    <div align="center">
                        <p>Todo Created: {todo !== null && todo.dateCreated ? this.getDateWithTimeZoneOffset(todo.dateCreated) : this.getDateWithTimeZoneOffset(new Date())}</p>

                        <br/>
                        <br/>

                        <Form style={{ marginTop: 10, width:"60%"}}>

                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    onChange={this.handleChange}
                                    value={todo !== null && todo.name ? todo.name : ''}
                                    name="name"
                                    type="text"
                                    placeholder="TodoDetail Name"
                                />
                            </Form.Group>

                            <Form.Group controlId="priority" name="priority">
                                <Form.Label>Priority</Form.Label>
                                <Form.Control as="select" onChange={this.handleChange} value={todo !== null && todo.priority ? todo.priority : "Low"}>
                                    <option>Low</option>
                                    <option>Med</option>
                                    <option>High</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="dateDue" name="dateDue">
                                <Form.Label>Due Date</Form.Label>
                                <Form.Control onChange={this.handleChange} value={todo !== null && todo.dateDue ? this.getDateWithTimeZoneOffset(todo.dateDue) : ''}
                                              type="date" placeholder="Due Date"/>
                            </Form.Group>

                            <br/>
                        </Form>
                    </div>

                    <>
                        <Button
                            variant="danger"
                            onClick={() => this.props.history.push('/')}
                        >
                            Return to Todo List
                        </Button>
                        {' '}
                        <Button
                            variant="success"
                            type="submit"
                            onClick={this.handleSubmitButtonClick}
                        >
                            Update Todo Detail
                        </Button>
                    </>
                </div>


                {this.props.loggedIn
                    ? null
                    : <Redirect to={{
                        pathname: '/',
                        state: {from: this.props.location}
                    }}/>
                }

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
        loggedIn: state.auth.loggedIn,
        selectedTodo: state.todo.selectedTodo,
        id: ownProps.match.params.id
    }
};

export default connect(mapStateToProps)(TodoDetail);