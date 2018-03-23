// App.js

import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader'
import RedBox from 'redbox-react'
import { Router, Route, hashHistory } from 'react-router'

import App from './components/App'
import Home from './pages/Home'

import UserList from './pages/UserList';
import UserAdd from './pages/UserAdd';
import UserEdit from './pages/UserEdit';

import BookList from './pages/BookList';
import BookAdd from './pages/BookAdd';
import BookEdit from './pages/BookEdit';

const rootEle = document.getElementById('root');

let router = (
    <Router history={hashHistory}>
        <Route path="/" component={Home}></Route>

        <Route path="/user/list" component={UserList}/>
        <Route path="/user/add" component={UserAdd}/>
        <Route path="/user/edit/:id" component={UserEdit}/>

        <Route path="/book/list" component={BookList}/>
        <Route path="/book/add" component={BookAdd}/>
        <Route path="/book/edit/:id" component={BookEdit}/>
    </Router>
);

function render(router){
    try{
        //throw new Error('boom');

        ReactDOM.render(
            <AppContainer>
                {router}
            </AppContainer>,
            rootEle
        );
    }catch(e){
        ReactDOM.render(
            <RedBox error={e}>
                <AppContainer>
                    {router}
                </AppContainer>
            </RedBox>,
            rootEle
        );
    }

}



// render(App);
//
// if(module.hot){
//     module.hot.accept('./components/App', () => {
//         render(require('./components/App').default)
//     })
// }

render(router);

if(module.hot){
    module.hot.accept('./components/App', () => {
        render(router)
    })
}




