var App = App || {};
App.define = function (namespace) {
    var parts = namescpace.split('.'),
        parent = App,
        i;

    if ( parts[0] == 'App' ) {
        parts = parts.slice(1);
    }

    for ( i = 0; i < parts.length; i++ ) {
        if ( typeof parent[parts[i]] == 'undefined' ) {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
}

var module1 = App.define('App.utils.ajax');
console.log( module1 == App.utils.ajax ); // true

var module2 = App.define('utils.dom');
console.log( module2 == App.utils.dom ); // true

console.log(App);
//---
//create xmlHttp
var xmlHttp = false;
/*@cc_on @*/
/*@if (@_jscript_version >= 5)
 try {
 xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
 } catch (e) {
 try {
 xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
 } catch (e2) {
 xmlHttp = false;
 }
 }
 @end @*/

if (!xmlHttp && typeof XMLHttpRequest != 'undefined') {
    xmlHttp = new XMLHttpRequest();
}
function updatePage() {
    if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
        document.getElementById("zipCode").value = response;
    }
}
//---
$('document').ready(function () {

    var obj1 = {
        name: 'John Doe',
        getName: function(){
            return this.name;
        }
    }
    console.log(obj1.name);    // 'John Doe' - open
    console.log(obj1.getName); // 'function' - open
    //-
    function obj2() {
        var name = 'Ivan Ivanov'; //close

        // открытый
        this.getName = function(){ // close
            return name;             //  this.getName();
        }
    }

})
//---

App.define('utils.calc');
App.utils.calc = (function(){
    // закрытые члены
    var x, x;

    return {
        // открытые члены
        add: function(){
            return x + y;
        },
        setX: function(val){
            x = val;
        },
        setY: function(val){
            y = val;
        },
    }
})();
// wrap to function Оборачиваем все в немедленно вызываемую ф-ию,
// чтобы не создавать лишних глобальных переменных
(function(){
    var calc = App.utils.calc;
    calc.setX(2);
    calc.setY(3);
    console.log(calc.add());

    constructor = function () {
        this.map.set('getAll', function()  {this.depController.getAll()} );
    }

    listen  = function() {
        $('body').on('click', '.listener', function(event) {
            var valueFromEvent = event.target.value;
        this.map.get(valueFromEvent)(event);
    });
    }
})();

