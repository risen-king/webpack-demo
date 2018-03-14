console.log('The print.js module has loaded! See the network tab in dev tools...');
console.log($('title').text()); // 使用 jQuery

export default function printMe() {
    // console.log('Updating print.js...');
    console.log('Button Clicked: Here\'s "some text"!');
}