import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import RedBox from 'redbox-react'
import { hashHistory } from 'react-router'
import Root from './containers/Root'


const rootEle = document.getElementById('root');
function render(){
    try{
        ReactDOM.render(
            <AppContainer>
                <Root history={hashHistory} />
            </AppContainer>,
            rootEle
        );
    }catch(e){
        ReactDOM.render(
            <RedBox error={e}>
                <AppContainer>
                    <Root history={hashHistory} />
                </AppContainer>
            </RedBox>,
            rootEle
        );
    }
}

render();

if(module.hot){

    module.hot.accept('./containers/Root', () => {
        render()
    })
}




