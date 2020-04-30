import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {fetchTodos, setTodo, updateTodo, deleteTodo} from "../../actions/todoActions";
import './TodoList.css'

import editIcon from "../../assets/images/editPencil.png"
import compIcon from "../../assets/images/checkCircle-checked.png"
import incoIcon from "../../assets/images/checkCircle.png"
import delIcon from "../../assets/images/delete.png"
import plusIcon from "../../assets/images/plusIcon.png";

class TodosList extends Component {

    constructor(props) {
        super(props);

        this.toggleDetail = this.toggleDetail.bind(this);
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

    createNewTodo = () => {
        let newTodo = {
            name: '',
            priority: "Low",
            dateDue: null,
            dateCreated: new Date().toISOString(),
            completed: false,
            order: 0
        };

        this.setSelectedTodo(newTodo);

        this.props.history.push("/details/NewTodo")
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
        const {dispatch} = this.props;
        dispatch(deleteTodo(todo));
    };

    getDateWithTimeZoneOffset = (date) => {
        const offset = new Date(date).getTimezoneOffset();
        let modifiedDate = new Date(date).getTime() + (offset * 60 * 1000);
        return new Date(modifiedDate).toISOString().split('T')[0];
    };

    render() {


        const Todo = props => ( 
            <tr align={"left"}>
                <td className={props.todo.completed ? 'completed' : null}>{props.todo.name}</td>
                <td className={props.todo.completed ? 'completed' : null}>{this.getDateWithTimeZoneOffset(new Date(props.todo.dateCreated))}</td>
                <td className={props.todo.completed ? 'completed' : null}>{props.todo.dateDue ? this.getDateWithTimeZoneOffset(props.todo.dateDue) : 'N/A'}</td>
                <td className={props.todo.completed ? 'completed' : null}>{props.todo.priority}</td>
                
                <td align={"center"}>
                    <Link to={"/details/" + props.todo._id} onClick={()=>this.setSelectedTodo(props.todo)}>
                        <img
                            alt="Edit Todo Icon"
                            src={editIcon}
                            className={"tableButtonImage"}
                        />
                    </Link>
                </td>
                <td align={"center"}>
                    <button className={"tableButton"}>
                        <img
                            alt="Complete Todo Icon"
                            src={props.todo.completed ? (compIcon) :(incoIcon)}
                            className={"tableButtonImage"}
                            onClick={()=>this.toggleCompleteStatus(props.todo)}
                        />
                    </button>
                </td>
                <td align={"center"}>
                    <button className={"tableButton"}>
                        <img
                            alt="Delete Todo Icon"
                            src={delIcon}
                            className={"tableButtonImage"}
                            onClick={()=>this.deleteSelectedTodo(props.todo)}
                        />
                    </button>
                </td>
            </tr>
        );
        
        return (
            <div>
                <br/>
                <h3>Todo List</h3>
                <table align="center" className="table table-striped" style={{ marginTop: 10, width:"80%" }} >
                    <thead>
                    <tr align={"left"}>
                        <th>Name</th>
                        <th>Date Created</th>
                        <th>Due Date</th>
                        <th>Priority</th>
                        <th className={"center"}>Edit</th>
                        <th className={"center"}>Complete</th>
                        <th className={"center"}>Delete</th>
                    </tr>
                    </thead>
                    <tbody id={"tbody"}>
                    
                    {
                        this.props.todos.map(
                            (currentTodo, i) =>
                                <Todo todo={currentTodo} indexValue={i} key={i}/>
                        )
                    }
                    
                    </tbody>
                </table>

                <button className={"addButton"}>
                    <img
                        className={"addButtonImage"}
                        alt="createNewTodo"
                        src={plusIcon}
                        onClick={this.createNewTodo}
                    />
                </button>
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