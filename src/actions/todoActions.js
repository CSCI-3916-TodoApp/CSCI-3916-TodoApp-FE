import {todoActionTypes as actionTypes} from '../constants';
import runtimeEnv from '@mars/heroku-js-runtime-env';

function todosFetched(todos) {
    return {
        type: actionTypes.FETCH_TODOS,
        todos: todos,
        todo: todos[0]
    }
}

function todoFetched(todo) {
    return {
        type: actionTypes.FETCH_TODO,
        selectedTodo: todo
    }
}

function todoSet(todo) {
    return {
        type: actionTypes.SET_TODO,
        selectedTodo: todo
    }
}

function todoCreated(todo) {
    return {
        type: actionTypes.CREATE_TODO,
        selectedTodo: todo
    }
}

function todoUpdated(todo) {
    return {
        type: actionTypes.UPDATE_TODO,
        selectedTodo: todo
    }
}

function todoDeleted(todo) {
    return {
        type: actionTypes.DELETE_TODO,
        selectedTodo: todo
    }
}

export function fetchTodos() {
    const env = runtimeEnv();

    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/todos/`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        })
            .then((response) => {

                if (!response.ok) {
                    throw Error(response.statusText);
                }

                return response.json();
            })
            .then((res) => {
                res.sort(function(a,b){return a.order-b.order}); //Sort the array before it's passed to dispatch
                dispatch(todosFetched(res)); //Sets the Todo array
            })
            .catch((e) => {
                console.log(e)
            });
    }
}

export function fetchTodo(id) {
    const env = runtimeEnv();

    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/todos/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then((res) => {
                dispatch(todoFetched(res));
            })
            .catch((e) => console.log(e));
    }
}

export function setTodo(todo) {
    return dispatch => {
        dispatch(todoSet(todo));
    }
}

export function createTodo(todo) {
    const env = runtimeEnv();

    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/todos`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo),
            mode: 'cors'
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then((res) => {
                dispatch(todoCreated(res));
            })
            .catch((e) => console.log(e));
    }

}

export function updateTodo(todo) {
    const env = runtimeEnv();

    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/todos`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo),
            mode: 'cors'
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then((res) => {
                dispatch(todoUpdated(todo));
            })
            .catch((e) => console.log(e));
    }

}

export function deleteTodo(todo) {
    const env = runtimeEnv();

    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/todos`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo),
            mode: 'cors'
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then((res) => {
                dispatch(todoDeleted(todo));
            })
            .catch((e) => console.log(e));
    }

}
