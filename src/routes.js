import React,{ Component } from 'react'
import { Router, Route, hashHistory,IndexRoute } from 'react-router'

import App from './containers/App';

import HomeLayout from './layouts/HomeLayout';
import Home from './pages/Home'
import UserList from './pages/UserList';
import UserAdd from './pages/UserAdd';
import UserEdit from './pages/UserEdit';
import BookList from './pages/BookList';
import BookAdd from './pages/BookAdd';
import BookEdit from './pages/BookEdit';
import Login from './pages/Login';

export default (
    <Route path="/" component={App}>
        <Route component={HomeLayout}>
            <IndexRoute component={Home}/>
            <Route path="/user/list" component={UserList}/>
            <Route path="/user/add" component={UserAdd}/>
            <Route path="/user/edit/:id" component={UserEdit}/>

            <Route path="/book/list" component={BookList}/>
            <Route path="/book/add" component={BookAdd}/>
            <Route path="/book/edit/:id" component={BookEdit}/>

        </Route>

        <Route path="/login" component={Login}/>
    </Route>
)

