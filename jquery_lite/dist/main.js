/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n  constructor(nodes) {\n    this.nodes = nodes; \n  }\n\n  addClass ( arg ) {\n    this.nodes.forEach( node => {\n      let classes = node.getAttribute('class');\n      classes += \" \" + arg;\n      node.setAttribute('class', classes); \n    });\n  }\n\n  removeClass ( arg ) {\n    //if arg, we need to split on ' ' and find those in the existing classes\n    this.nodes.forEach( node => {\n      let resultClasses = '';\n      //if arg length is 0 set node.setAttribute('class','')\n\n      if ( typeof arg === 'undefined') {\n        node.setAttribute('class', resultClasses );\n      }\n      else {        \n        //we need to grab current classes and split\n        let currentClasses = node.getAttribute('class').split(' '); \n\n        //we need to split args\n        let classesToRemove = arg.split(' '); \n\n        //we need to compare and delete where appropriate\n        currentClasses.forEach(css => {\n          if (!classesToRemove.includes(css)) {\n            resultClasses += css; \n          }\n        }); \n\n        node.setAttribute('class', resultClasses);\n      }\n\n    });\n    return this; \n  }\n\n  html ( string ) {\n\n    //this === the DOMNodeCollection object that is calling this method\n\n    if ( string || string === \"\") {\n      this.nodes.forEach ( node => {\n        node.innerHTML = string;\n      });\n    }\n    else {\n      return this.nodes[0].innerHTML;\n    }\n  }\n\n  empty() {\n    this.html(\"\"); \n  }\n\n  append( arg ) {\n  \n    if ( typeof arg === 'string') {\n      this.nodes.forEach( node => node.innerHTML += arg );\n    }\n    else if ( arg instanceof HTMLElement ) {\n      node.innerHTML += arg.outerHTML;\n    }\n    else {  //it's a DOMNodeCollection\n      arg.nodes.forEach ( a => {\n        this.nodes.forEach ( node => {\n          node.innerHTML += a.outerHTML;\n        });\n      });\n    }\n    \n\n  }\n\n  attr ( ...args ) {\n    //arg can't be blank\n    //if there is only one argument, pretty sure it's a getter call, return\n    // attribute\n    if (args.length === 1) {\n      let retrievedAttribute;\n      //return the attr value of this.nodes[0];\n      this.nodes.forEach ( node => {\n        const a = node.getAttribute(args[0]);\n        if ( a && typeof retrievedAttribute === 'undefined')  { retrievedAttribute = a;} \n      });\n      return retrievedAttribute;\n    }\n\n    //if there are two arguments, it's a setter.  \n    // set attribute first arg to value second arg\n    else { //we're setting every node's attribute to value\n      this.nodes.forEach ( node => node.setAttribute(args[0], args[1]));\n      return this;\n    }\n  }\n\n  children() {\n    //this is the DNC calling children\n    //if DNC.length > 1 the user is bad and should feel bad (return undefined)\n    if (this.nodes.length > 1 ) return undefined;\n    //otherwise\n    // queryselector(this.node[0]).children //returns an HTMLcollection childHTMLS\n    // return new DNC(Array.from(childHTMLS))\n    else {\n      let childHTMLs = this.nodes[0].children;\n      return new DOMNodeCollection(Array.from(childHTMLs));\n    }\n  }\n\n  // TODOs: \n  parent() {\n\n  }\n\n  find() {\n\n  }\n\n  remove() {\n\n  }\n\n  // Event Handling\n  on(type, callback) {\n    // need event type AND callback \n    // addEventListener \n    this.nodes.forEach(node => {\n      node.addEventListener(type, callback); \n      node.banana = callback; \n    }); \n\n  }\n  //let cb = (event) => {console.log(event)};\n  off(type) {\n    this.nodes.forEach(node => {\n     \n      node.removeEventListener(type, node.banana); \n    }); \n    // only need event type (i.e. \"click\"), don't need callback \n  }\n\n}\n\nmodule.exports = DOMNodeCollection;\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// our entry point\nconst DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ \"./src/dom_node_collection.js\"); \n\nlet docReady = false;\nlet funkArray = [];\n\n// window.$1 = function ( arg ) {\nwindow.$l = function ( arg ) {\n\n  if (arg instanceof HTMLElement) {\n    return new DOMNodeCollection([arg]); \n  } \n  else if (typeof arg === 'string') {\n    const cssSelect = Array.prototype.slice.call( document.querySelectorAll( arg ) );\n    return new DOMNodeCollection( cssSelect );\n  } \n  else if (typeof arg === 'function') {\n    return waitForPageLoad(arg);\n  }\n\n};\n\n$l(() => console.log('it\\'s loaded bruh'));\n$l(() => console.log('it\\'s loaded twice'));\n$l(() => console.log('it\\'s three'));\n\nfunction waitForPageLoad ( arg ) {\n\n  if (!docReady) funkArray.push(arg); \n  else arg();\n}\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  docReady = true;\n  funkArray.forEach(funk => funk()); \n});\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });