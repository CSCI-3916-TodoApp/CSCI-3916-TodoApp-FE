import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Form, Modal} from "react-bootstrap";

// import {fetchTodo, updateTodo} from "../../actions/todoActions";

class TodoDetail_NonWorkingModal extends Component {

    constructor(props) {
        super(props);

        this.handleSubmitButtonClick = this.handleSubmitButtonClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let updateDetails = Object.assign({}, this.props.todoDetails);

        updateDetails[event.target.id] = event.target.value;

        this.props.updateDetails(updateDetails);
    }

    handleSubmitButtonClick() {
        // TODO: CALL updateTodo from here
        // const {dispatch} = this.props;
        // dispatch(updateTodo(this.props.selectedTodo))}

        this.props.closeDetail()
    };

    render() {
        // const TodoDetails = ({todo}) => {
        //
        //     if (todo === undefined) {
        //         return (
        //             <div>Select a todo from the todo list to see details.</div>
        //         )
        //     }
        //     return (
        //         <div>
        //             <p align={"center"}>Todo Created: {new Date(todo.dateCreated).toDateString()}</p>
        //
        //             <Form>
        //                 <Form.Group controlId="name">
        //                     <Form.Label>Name</Form.Label>
        //                     <Form.Control
        //                         onChange={this.handleChange}
        //                         value={todo.name}
        //                         name="name"
        //                         type="text"
        //                         placeholder="TodoDetail Name"
        //                     />
        //                 </Form.Group>
        //
        //                 <Form.Group controlId="priority" name="priority">
        //                     <Form.Label>Priority</Form.Label>
        //                     <Form.Control as="select" onChange={this.handleChange} value={todo.priority}>
        //                         <option>Low</option>
        //                         <option>Med</option>
        //                         <option>High</option>
        //                     </Form.Control>
        //                 </Form.Group>
        //
        //                 <Form.Group controlId="dateDue" name="dateDue">
        //                     <Form.Label>Due Date</Form.Label>
        //                     <Form.Control onChange={this.handleChange} value={todo.dateDue}
        //                                   type="date" placeholder="Due Date"/>
        //                 </Form.Group>
        //
        //                 <Form.Group controlId="order" name="order">
        //                     <Form.Label>Order</Form.Label>
        //                     <Form.Control onChange={this.handleChange} value={todo.order}
        //                                   type="number" placeholder="0"/>
        //                 </Form.Group>
        //                 <br/>
        //             </Form>
        //         </div>
        //     )
        // };

        return (
            <div>
                <Modal size="md"
                       show={this.props.showDetails && this.props.loggedIn}
                       centered={true}
                       enforceFocus={true}
                       onHide={this.props.closeDetail}
                >
                    <Modal.Header>
                        <Modal.Title className="mx-auto" id="TodoModalTitle">
                            <h1>Todo Details</h1>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div>
                            <p align={"center"}>Todo Created: {new Date(this.props.todoDetails.dateCreated).toDateString()}</p>

                            <Form>
                                <Form.Group controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        onChange={this.handleChange}
                                        value={todo.name}
                                        name="name"
                                        type="text"
                                        placeholder="TodoDetail Name"
                                    />
                                </Form.Group>

                                <Form.Group controlId="priority" name="priority">
                                    <Form.Label>Priority</Form.Label>
                                    <Form.Control as="select" onChange={this.handleChange} value={this.props.todoDetails.priority}>
                                        <option>Low</option>
                                        <option>Med</option>
                                        <option>High</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="dateDue" name="dateDue">
                                    <Form.Label>Due Date</Form.Label>
                                    <Form.Control onChange={this.handleChange} value={this.props.todoDetails.dateDue}
                                                  type="date" placeholder="Due Date"/>
                                </Form.Group>

                                <Form.Group controlId="order" name="order">
                                    <Form.Label>Order</Form.Label>
                                    <Form.Control onChange={this.handleChange} value={this.props.todoDetails.order}
                                                  type="number" placeholder="0"/>
                                </Form.Group>
                                <br/>
                            </Form>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant="success"
                            type="submit"
                            block
                            onClick={this.handleSubmitButtonClick}
                        >
                            Update TodoDetail
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
        loggedIn: state.auth.loggedIn,
        selectedTodo: state.todo.selectedTodo,
        todo: ownProps.todo
    }
};

export default connect(mapStateToProps)(TodoDetail_NonWorkingModal);