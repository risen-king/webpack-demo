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
    /**
     * Warning from React Router, caused by react-hot-loader.
     * The warning can be safely ignored, so filter it from the console.
     * Otherwise you'll see it every time something changes.
     * See https://github.com/gaearon/react-hot-loader/issues/298
     */
    const orgError = console.error; // eslint-disable-line no-console
    console.error = (message) => { // eslint-disable-line no-console
        if (message && message.indexOf('You cannot change <Router routes>;') === -1) {
            // Log the error as normally
            orgError.apply(console, [message]);
        }
    };

    module.hot.accept('./containers/Root', () => {
        render()
    })
}




