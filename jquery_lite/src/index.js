// our entry point
const DOMNodeCollection = require('./dom_node_collection.js'); 

let docReady = false;
let funkArray = [];

// window.$1 = function ( arg ) {
window.$l = function ( arg ) {

  if (arg instanceof HTMLElement) {
    return new DOMNodeCollection([arg]); 
  } 
  else if (typeof arg === 'string') {
    const cssSelect = Array.prototype.slice.call( document.querySelectorAll( arg ) );
    return new DOMNodeCollection( cssSelect );
  } 
  else if (typeof arg === 'function') {
    return waitForPageLoad(arg);
  }

};

$l(() => console.log('it\'s loaded bruh'));
$l(() => console.log('it\'s loaded twice'));
$l(() => console.log('it\'s three'));

function waitForPageLoad ( arg ) {

  if (!docReady) funkArray.push(arg); 
  else arg();
}

document.addEventListener('DOMContentLoaded', () => {
  docReady = true;
  funkArray.forEach(funk => funk()); 
});





