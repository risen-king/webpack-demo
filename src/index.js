import _ from 'lodash';
import printMe from './print.js';
//import './style.scss';
// import Icon from './icon.jpg';
// import Data from './data.json';

function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');


    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);

    return element;
}

var element = component();
document.body.appendChild(element);

if(module.hot) { // 习惯上我们会检查是否可以访问 `module.hot` 属性
    module.hot.accept('./print.js', function() { // 接受给定依赖模块的更新，并触发一个回调函数来对这些更新做出响应
        console.log('*************************************************');
        console.log('Accepting the updated printMe module!');
        printMe();

        document.body.removeChild(element);
        element = component();
        document.body.appendChild(element);
        console.log('*************************************************');
    });
}