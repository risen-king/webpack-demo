// App.js

import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader'
import RedBox from 'redbox-react'
import { Router, Route, hashHistory } from 'react-router'

import App from './components/App'
import Home from './components/Home'
import UserAdd from './components/UserAdd'
import UserList from './components/UserList'


const rootEle = document.getElementById('root');

let router = (
    <Router history={hashHistory}>
        <Route path="/" component={Home}></Route>
        <Route path="/user/add" component={UserAdd}/>
        <Route path="/user/list" component={UserList}/>
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




