import React, { Component } from 'react';
import {connect} from 'react-redux';

import {Button} from "react-bootstrap";

import {fetchTodos, setTodo, updateTodo, deleteTodo} from "../../actions/todoActions";
import './TodoList.css'
import TodoDetail from "../TodoDetail/TodoDetail";

class TodosList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showDetail: false
        }
    }

    componentDidMount() {
        const {dispatch} = this.props;

        dispatch(fetchTodos());
    };

    toggleDetail = () => {
        this.setState({
            showDetail: !this.state.showDetail
        });
    };

    setSelectedTodo = (todo) => {
        const {dispatch} = this.props;
        dispatch(setTodo(todo));
    };

    // createNewTodo = () => {
    //     let newTodo = {
    //         name: '',
    //         priority: null,
    //         dateDue: Date(),
    //         dateCreated: Date(),
    //         completed: false
    //     }
    //
    //     this.editSelectedTodo(newTodo);
    // };
    //

    editSelectedTodo = (todo) => {
        this.setSelectedTodo(todo);

        this.setState({
            todoDetails: todo
        });

        this.toggleDetail();
    };

    toggleCompleteStatus = (todo) => {
        let completed = todo.completed;
        let updateDetails = Object.assign({}, todo);

        updateDetails["completed"] = !completed;

        this.updateSelectedTodo(updateDetails);
    };

    updateSelectedTodo = (todo) => {
        const {dispatch} = this.props;
        dispatch(updateTodo(todo));
    };

    deleteSelectedTodo = (todo) => {

        console.log(todo)

        const {dispatch} = this.props;
        dispatch(deleteTodo(todo));
    };

    //Need to update - Do so using the vartiables they're returning. 
    render() {

        const Todo = props => (
            <tr align={"left"}>
                <td className={props.todo.completed ? 'completed' : null}>{props.todo.name}</td>
                <td className={props.todo.completed ? 'completed' : null}>{new Date(props.todo.dateCreated).toDateString()}</td>
                <td className={props.todo.completed ? 'completed' : null}>{new Date(props.todo.dateDue).toDateString()}</td>
                <td className={props.todo.completed ? 'completed' : null}>{props.todo.priority}</td>
                <td>
                    <Button onClick={()=>this.editSelectedTodo(props.todo)}> Edit </Button>
                    &nbsp;
                    <Button onClick={()=>this.toggleCompleteStatus(props.todo)}>Toggle Complete Status</Button>
                    &nbsp;
                    <Button onClick={()=>this.deleteSelectedTodo(props.todo)}>Delete</Button>
                </td>
            </tr>
        );

        return (
            <div>
                <br/>
                <h3>Todos List</h3>
                <table align="center" className="table table-striped" style={{ marginTop: 20, width:"80%" }} >
                    <thead>
                    <tr align={"left"}>
                        <th>Name</th>
                        <th>Date Created</th>
                        <th>Due Date</th>
                        <th>Priority</th>
                    </tr>
                    </thead>
                    <tbody id={"tbody"}>

                    { this.props.todos.map((currentTodo, i) =>
                        <Todo todo={currentTodo} key={i}/>
                    )}
                    
                    </tbody>
                </table>

                {this.state.showDetail ? <TodoDetail todo={this.props.selectedTodo} showDetails={this.state.showDetail} closeDetail={this.toggleDetail} /> : null }
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        loggedIn: state.auth.loggedIn,
        todos: state.todo.todos,
        selectedTodo: state.selectedTodo
    }
}

export default connect(mapStateToProps)(TodosList)