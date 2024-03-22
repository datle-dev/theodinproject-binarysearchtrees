function merge(left, right) {
    let merged = [];
    while (left.length !== 0 || right.length !== 0) {
        if (left.length == 0) {
            merged.push(right[0]);
            right.splice(0, 1);
        } else if (right.length == 0) {
            merged.push(left[0]);
            left.splice(0, 1);
        } else if (left[0] < right[0]) {
            merged.push(left[0]);
            left.splice(0, 1);
        } else {
            merged.push(right[0]);
            right.splice(0, 1);
        }
    }
    return merged;
}

function mergeSort(arr) {
    if (arr.length === 1) {
        return arr;
    } else {
        const halfIndex = Math.floor(arr.length / 2);
        let left = arr.slice(0, halfIndex);
        let right = arr.slice(halfIndex, arr.length);
        return merge(mergeSort(left), mergeSort(right));
    }
}

export default mergeSort;