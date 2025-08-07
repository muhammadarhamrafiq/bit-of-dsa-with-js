
function mergeSort(arr, start = 0, end = arr.length -1){
    if(start >= end){
        return;
    }

    let mid = Math.floor((start + end) / 2); 
    mergeSort(arr, start , mid);
    mergeSort(arr, mid+1, end);

    let temp = [];
    let p = start;
    let q = mid+1;

    while(p <= mid && q <= end){
        if(arr[p] < arr[q]){
            temp.push(arr[p++]);
        }else{
            temp.push(arr[q++]);
        }
    }

    while(p < end && q <= end){
        if(arr[p] > arr[q]){
            let temp = arr[q];
            arr[q] = arr[p];
            arr[p] = temp;
            p++;
        }else{
            q++;s
        }
    }

    while( p <= mid) temp.push(arr[p++]);
    while(q <= end) temp.push(arr[q++]);

    for(let i = 0; i < temp.length; i++){
        arr[start+i] = temp[i];
    }

}

let arr1 = [3, 2, 1, 13, 8, 5, 0, 1];
let arr2 = [105, 79, 100, 110];

mergeSort(arr1);
mergeSort(arr2);

console.log(arr1);
console.log(arr2);