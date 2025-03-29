EventTarget.prototype.on = EventTarget.prototype.addEventListener;
EventTarget.prototype.rm = EventTarget.prototype.removeEventListener;

Object.defineProperties(HTMLDivElement.prototype, {
    'layers' : {
        get(){
            return this.children
        }
    }
    ,
    add: {
        value: function(children) {
            this.append(...children)
        }
    }
    ,
});

Object.defineProperties(Array.prototype, {
    'on' : {
        value: Array.prototype.forEach
    }
    ,
});

Object.defineProperties(Function.prototype, {
    'value' : {
        get() {
            return this.name;
        }
    }
    ,
});
