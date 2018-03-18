// App.js


import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import App from './containers/App'

const rootEle = document.getElementById('root');

function render(Component){
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        rootEle
    );
}

render(App);

if(module.hot){
    module.hot.accept('./containers/App', () => {
        render(require('./containers/App').default)
    })
}




