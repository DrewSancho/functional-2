/**
 * using our own forEach(), map(), reduce(), and filter() functions written in
 * the map-reduce assignment
 */



function forEach(array, callback) {
    for (var i = 0; i < array.length; i++){
        callback(array[i]);
    }
}

function reduce(array, callback) {
    var accumulator = array[0];
    var sliced = array.slice(1);

    forEach(sliced, function(x) {
        accumulator = callback(accumulator, x)
    })

    return accumulator
}

function map(array, transform) {
    var newArray = [];

    forEach(array, function(x){
        var transformed = transform(x);
        newArray.push(transformed);
    });
    return newArray
}

function filter(array, callback) {
    var newArray = [];

    forEach(array, function(x){
        if (callback(x)) {
            newArray.push(x)
        };
    });
    return newArray
}

/**
 * Implement the function `pluck` to extract a list of values associated with
 * property names.
 */

function pluck(list, propertyName) {
    return map(list, function(x){
        return x[propertyName]
    })
}

var stooges = [
    { name: 'moe', age: 40 },
    { name: 'larry', age: 50 },
    { name: 'curly', age: 60 }
];

console.assert(pluck(stooges, 'name')[0] === 'moe');
console.assert(pluck(stooges, 'age')[2] === 60);

/**
 * Implement the function `reject` to do the opposite of filter, that is,
 * if the callback function returns a truthy value, that item is **not** 
 * inserted into the new collection. Otherwise it is.
 */

function reject(list, predicate) {
    return filter(list, function(x){
        return !predicate(x);
    })  
}

var lt10 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var odds = reject(lt10, function (n) { return n % 2 === 0; });
console.assert(odds[0] === 1);
console.assert(odds[1] === 3);
console.assert(odds[4] === 9);

/**
 * Implement a function `find` that returns the very first item in a collection
 * when the callback function returns true. Otherwise, return undefined.
 */

function find(list, predicate) {

    return filter(list, predicate)[0];
}

var people = [
    { name: "Matt", teaches: "JS" },
    { name: "Jwo", teaches: "Ruby" },
    { name: "Dorton", teaches: "life" }
];
var jsInstructor = find(people, function (n) { return n.teaches === "JS"; });
console.assert(jsInstructor.name === "Matt");

/**
 * Implement a function `where` that filters for all the values in the
 * properties object.
 */

function where (list, properties) {
    var results = filter(list, function (x) {
        var pass = true;
        for (var prop in properties) {
            if (properties[prop] !== x[prop]) {
                pass = false;
            }
        }
        return pass;
    });
    return results;
}
var plays = [
    { title: "Cymbeline", author: "Shakespeare", year: 1623 },
    { title: "The Tempest", author: "Shakespeare", year: 1623 },
    { title: "Hamlet", author: "Shakespeare", year: 1603 },
    { title: "A Midsummer Night's Dream", author: "Shakespeare", year: 1600 },
    { title: "Macbeth", author: "Shakespeare", year: 1620 },
    { title: "Death of a Salesman", author: "Arthur Miller", year: 1949 },
    { title: "Two Blind Mice", author: "Samuel and Bella Spewack", year: 1949 }
];

var result = where(plays, { author: "Shakespeare" });
console.assert(result instanceof Array);
console.assert(result.length === 5);
console.assert(result[0].title === "Cymbeline");

result = where(plays, { author: "Shakespeare", year: 1611 });
console.assert(result.length === 0);

result = where(plays, { author: "Shakespeare", year: 1623 });
console.assert(result.length === 2);

var midcentury = where(plays, { year: 1949 });
console.assert(midcentury.length === 2);
