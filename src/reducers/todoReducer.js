import {todoActionTypes as todoConstants} from '../constants'

const initialState = {
    todos: [],
    selectedTodo: null
};

export default (state = initialState, action) => {
    const updated = Object.assign({}, state);

    switch(action.type) {
        case todoConstants.FETCH_TODOS:
            updated['todos'] = action.todos;
            updated['selectedTodo'] = action.todos[0];
            return updated;
        case todoConstants.FETCH_TODO:
        case todoConstants.SET_TODO:
            updated['selectedTodo'] = action.selectedTodo;
            return updated;
        case todoConstants.UPDATE_TODO:
            let todoIndex = state.todos.map(function(x) {return x._id; }).indexOf(action.selectedTodo._id);

            updated['selectedTodo'] = action.selectedTodo

            updated['todos'] = state.todos.map((todo, index) => {
                if (index !== todoIndex) {
                    return todo
                }
                return {
                    ...action.selectedTodo
                }
            });
            return updated;


        case todoConstants.CREATE_TODO:
            updated['selectedTodo'] = action.selectedTodo;
            updated['todos'] = action.todos.splice();
            return updated;
        case todoConstants.DELETE_TODO:
            let index = state.todos.map(function(x) {return x._id; }).indexOf(action.selectedTodo._id);
            let deletedTodo = state.todos[index];
            updated['todos'] = state.todos.filter(todo  => todo !== deletedTodo)
            //updated['todos'] = state.todos.splice(deletedTodo, 1)

            updated['selectedTodo'] = state.todos[0];

            return updated;
        default:
            return state;
    }
}