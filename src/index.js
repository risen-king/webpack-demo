//import _ from 'lodash';

 import './style.css';
// import Icon from './icon.jpg';
// import Data from './data.json';

//import printMe from './print.js';


function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    btn.innerHTML = 'Click me and check the console!';
    element.appendChild(btn);
    
    btn.onclick = function () {
        import(/* webpackChunkName: "print" */ './print.js')
            .then(function (module) {
                const printMe = module.default;
                printMe();
            })
    }

    return element;

}
document.body.appendChild(component());

