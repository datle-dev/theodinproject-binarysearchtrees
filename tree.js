import Node from './node.js';
import mergeSort from './merge-sort.js';

export default function Tree (arr) {
    let rootNode = null;

    const root = () => {
        return rootNode;
    };

    const buildTree = (arr) => {
        let noDuplicatesArr = [...new Set(arr)];
        let sortedArr = mergeSort(noDuplicatesArr);
        rootNode = createBST(sortedArr, 0, sortedArr.length - 1);
    };

    const createBST = (arr, start, end) => {
        if (start > end) {
            return null;
        }

        let mid = Math.floor((start + end) / 2);
        let root = Node(arr[mid]);
        root.left = createBST(arr, start, mid-1);
        root.right = createBST(arr, mid + 1, end);

        return root;
    };

    const prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };

    buildTree(arr);

    return {
        root,
        prettyPrint,
    };
}
