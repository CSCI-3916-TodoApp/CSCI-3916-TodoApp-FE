import React, { Component } from 'react';
import {withRouter, Route, Switch} from 'react-router-dom';
import TodosList from "../components/TodoList/TodoList";
import TodoDetails from "../components/TodoDetail/TodoDetails";

class BaseRouter extends Component {

    render() {
        return (
            <Switch>
                <Route exact path="/" component={withRouter(TodosList)}/>
                <Route path = "/details/:id" component = {withRouter(TodoDetails)}/>
            </Switch>
        )
    }
}

export default BaseRouter;