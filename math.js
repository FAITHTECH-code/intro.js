//math.js (exports a function)
export function add(a,b) {
    if (typeof a != 'number' || typeof b != 'number'){
    throw now Error ('Inputs must be numbers!'); // Error handling addition    
    }
    return a + b ;
}
export function subtract(a,b){
    return a - b;
}
module.express = ( add, subtract); // export object

