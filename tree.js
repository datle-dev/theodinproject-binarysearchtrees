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

    const insert = (value) => {
        let currentNode = rootNode;

        while (!isLeaf(currentNode)) {
            if (currentNode.left == null && currentNode.right != null) {
                currentNode = currentNode.right;
            } else if (currentNode.left != null && currentNode.right == null) {
                currentNode = currentNode.left;
            } else {
                if (value < currentNode.data) {
                    currentNode = currentNode.left;
                } else {
                    currentNode = currentNode.right;
                }
            }
        }
        
        if (value < currentNode.data) {
            currentNode.left = Node(value);
        } else {
            currentNode.right = Node(value);
        }
    };

    const find = (value) => {
        let currentNode = rootNode;

        while (value != currentNode.data) {
            if (isLeaf(currentNode)) {
                return null;
            }
            if (value < currentNode.data) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
        }

        return currentNode;
    };

    const isLeaf = (node) => {
        if (node.left == null && node.right == null) {
            return true;
        } else {
            return false;
        }
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
        insert,
        find,
    };
}
