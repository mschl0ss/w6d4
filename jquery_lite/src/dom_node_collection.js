class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes; 
  }

  addClass ( arg ) {
    this.nodes.forEach( node => {
      let classes = node.getAttribute('class');
      classes += " " + arg;
      node.setAttribute('class', classes); 
    });
  }

  removeClass ( arg ) {
    //if arg, we need to split on ' ' and find those in the existing classes
    this.nodes.forEach( node => {
      let resultClasses = '';
      //if arg length is 0 set node.setAttribute('class','')

      if ( typeof arg === 'undefined') {
        node.setAttribute('class', resultClasses );
      }
      else {        
        //we need to grab current classes and split
        let currentClasses = node.getAttribute('class').split(' '); 

        //we need to split args
        let classesToRemove = arg.split(' '); 

        //we need to compare and delete where appropriate
        currentClasses.forEach(css => {
          if (!classesToRemove.includes(css)) {
            resultClasses += css; 
          }
        }); 

        node.setAttribute('class', resultClasses);
      }

    });
    return this; 
  }

  html ( string ) {

    //this === the DOMNodeCollection object that is calling this method

    if ( string || string === "") {
      this.nodes.forEach ( node => {
        node.innerHTML = string;
      });
    }
    else {
      return this.nodes[0].innerHTML;
    }
  }

  empty() {
    this.html(""); 
  }

  append( arg ) {
  
    if ( typeof arg === 'string') {
      this.nodes.forEach( node => node.innerHTML += arg );
    }
    else if ( arg instanceof HTMLElement ) {
      node.innerHTML += arg.outerHTML;
    }
    else {  //it's a DOMNodeCollection
      arg.nodes.forEach ( a => {
        this.nodes.forEach ( node => {
          node.innerHTML += a.outerHTML;
        });
      });
    }
    

  }

  attr ( ...args ) {
    //arg can't be blank
    //if there is only one argument, pretty sure it's a getter call, return
    // attribute
    if (args.length === 1) {
      let retrievedAttribute;
      //return the attr value of this.nodes[0];
      this.nodes.forEach ( node => {
        const a = node.getAttribute(args[0]);
        if ( a && typeof retrievedAttribute === 'undefined')  { retrievedAttribute = a;} 
      });
      return retrievedAttribute;
    }

    //if there are two arguments, it's a setter.  
    // set attribute first arg to value second arg
    else { //we're setting every node's attribute to value
      this.nodes.forEach ( node => node.setAttribute(args[0], args[1]));
      return this;
    }
  }

  children() {
    //this is the DNC calling children
    //if DNC.length > 1 the user is bad and should feel bad (return undefined)
    if (this.nodes.length > 1 ) return undefined;
    //otherwise
    // queryselector(this.node[0]).children //returns an HTMLcollection childHTMLS
    // return new DNC(Array.from(childHTMLS))
    else {
      let childHTMLs = this.nodes[0].children;
      return new DOMNodeCollection(Array.from(childHTMLs));
    }
  }

  // TODOs: 
  parent() {

  }

  find() {

  }

  remove() {

  }

  // Event Handling
  on(type, callback) {
    // need event type AND callback 
    // addEventListener 
    this.nodes.forEach(node => {
      node.addEventListener(type, callback); 
      node.banana = callback; 
    }); 

  }
  //let cb = (event) => {console.log(event)};
  off(type) {
    this.nodes.forEach(node => {
     
      node.removeEventListener(type, node.banana); 
    }); 
    // only need event type (i.e. "click"), don't need callback 
  }

}

module.exports = DOMNodeCollection;