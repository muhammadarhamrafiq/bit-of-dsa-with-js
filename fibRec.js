
// returns the fib with the reccursion
function fib(n){
    let arr = [];

    for(let i=0; i < n; i++){
        if (i === 0) {
            arr.push(0);
        }
        else if (i === 1) {
            arr.push(1);
        }
        else {
            let last = arr[arr.length - 1];
            let secondLast = arr[arr.length -2];
            arr.push(secondLast + last);
        }
    }

    return arr;
}

// Show the same output Recursively
function fibRec(n){
    if(n === 1){
        return [0];
    }
    else if(n === 2){
        return [0, 1];
    }

    let arr = fibRec(n-1);
    let next = arr[arr.length - 1] + arr[arr.length - 2];
    arr.push(next);

    return arr
}

console.log(fibRec(8));