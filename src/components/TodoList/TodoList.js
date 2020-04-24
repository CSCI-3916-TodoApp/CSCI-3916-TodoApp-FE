import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {fetchTodos, setTodo, updateTodo, deleteTodo} from "../../actions/todoActions";
import './TodoList.css'

// Source Icons
import editIcon from "../../assets/images/editPencil.png"
import compIcon from "../../assets/images/checkCircle-checked.png"
//import incompleteIcon from "../../assets/images/checkCircle.png"
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

        this.props.history.push("/details/newTodo")
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
        var modifiedDate = new Date(date).getTime() + (offset*60*1000)
        return new Date(modifiedDate).toISOString().split('T')[0]
    };

    render() {


        const Todo = props => ( 
            <tr align={"left"}>
                <td className={props.todo.completed ? 'completed' : null}>{props.indexValue+1}</td>
                <td className={props.todo.completed ? 'completed' : null}>{props.todo.name}</td>
                <td className={props.todo.completed ? 'completed' : null}>{new Date(props.todo.dateCreated).toDateString()}</td>
                <td className={props.todo.completed ? 'completed' : null}>{props.todo.dateDue ? this.getDateWithTimeZoneOffset(props.todo.dateDue) : 'N/A'}</td>
                <td className={props.todo.completed ? 'completed' : null}>{props.todo.priority}</td>
                
                <td>
                    <Link to={"/details/" + props.todo._id} onClick={()=>this.setSelectedTodo(props.todo)}>
                        <img
                            alt="Edit Todo Icon"
                            src={editIcon}
                            className={"tableButtonImage"}
                        />
                    </Link>
                </td>
                <td>
                    <button className={"tableButton"}>
                        <img
                            alt="Complete Todo Icon"
                            src={compIcon}
                            className={"tableButtonImage"}
                            onClick={()=>this.toggleCompleteStatus(props.todo)}
                        />
                    </button>
                </td>
                <td>
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
                <h3>Todos List</h3>
                <table align="center" className="table table-striped" style={{ marginTop: 10, width:"60%" }} >
                    <thead>
                    <tr align={"left"}>
                        <th>Order</th>
                        <th>Name</th>
                        <th>Date Created</th>
                        <th>Due Date</th>
                        <th>Priority</th>
                        <th>Edit</th>
                        <th>Complete</th>
                        <th>Delete</th>
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