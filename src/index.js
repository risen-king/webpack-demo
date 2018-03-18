// App.js

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import RedBox from 'redbox-react'

import App from './containers/App'


const rootEle = document.getElementById('root');

function render(Component){
    try{
        //throw new Error('boom');

        ReactDOM.render(
            <AppContainer>
                <Component />
            </AppContainer>,
            rootEle
        );
    }catch(e){
        ReactDOM.render(
            <RedBox error={e}>
                <AppContainer>
                    <Component />
                </AppContainer>
            </RedBox>,
            rootEle
        );
    }

}

render(App);

if(module.hot){
    module.hot.accept('./containers/App', () => {
        render(require('./containers/App').default)
    })
}




