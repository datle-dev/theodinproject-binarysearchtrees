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
        root.left = createBST(arr, start, mid - 1);
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
                if (value == currentNode.data) {
                    return;
                } else if (value < currentNode.data) {
                    currentNode = currentNode.left;
                } else {
                    currentNode = currentNode.right;
                }
            }
        }

        if (value == currentNode.data) {
            return;
        } else if (value < currentNode.data) {
            currentNode.left = Node(value);
        } else {
            currentNode.right = Node(value);
        }
    };

    const deleteItem = (value) => {
        let parentNode = null;
        let currentNode = rootNode;

        // find node to delete while keeping track of its parent
        while (value != currentNode.data) {
            if (isLeaf(currentNode)) {
                return;
            }

            if (value < currentNode.data) {
                parentNode = currentNode;
                currentNode = currentNode.left;
            } else {
                parentNode = currentNode;
                currentNode = currentNode.right;
            }
        }

        // leaf case
        if (isLeaf(currentNode)) {
            if (currentNode == parentNode.left) {
                parentNode.left = null;
            } else {
                parentNode.right = null;
            }
            return;
        }

        // single child case
        if (isParentOfSingleChild(currentNode)) {
            if (parentNode.left == currentNode) {
                parentNode.left = getSingleChild(currentNode);
            } else {
                parentNode.right = getSingleChild(currentNode);
            }
            return;
        }

        // two children case (including root)
        let successorParent = currentNode;
        let successor = currentNode.right;

        while (successor.left != null) {
            successorParent = successor;
            successor = successor.left;
        }

        if (successorParent != currentNode) {
            successorParent.left = successor.right;
        } else {
            successorParent.right = successor.right;
        }

        currentNode.data = successor.data;
        return;
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

    const levelOrder = (callback = null) => {
        let queue = [];
        let currentNode = rootNode;

        queue.push(currentNode);

        while (queue.length > 0) {
            currentNode = queue.shift();
            callback(currentNode);
            if (currentNode.left != null) {
                queue.push(currentNode.left);
            }
            if (currentNode.right != null) {
                queue.push(currentNode.right);
            }
        }
    };

    const levelOrderRecursive = (queue, callback) => {
        if (queue.length == 0) {
            return;
        }
        let childQueue = [];
        for (let currentNode of queue) {
            callback(currentNode);
            if (currentNode.left != null) {
                childQueue.push(currentNode.left);
            }
            if (currentNode.right != null) {
                childQueue.push(currentNode.right);
            }
        }
        levelOrderRecursive(childQueue, callback);
    }

    const inOrder = (node) => {
        if (node == null) {
            return;
        }
        inOrder(node.left);
        console.log(node.data);
        inOrder(node.right);
    };

    const preOrder = (node) => {
        if (node == null) {
            return;
        }
        console.log(node.data)
        preOrder(node.left);
        preOrder(node.right);
    }

    const postOrder = (node) => {
        if (node == null) {
            return;
        }
        postOrder(node.left);
        postOrder(node.right);
        console.log(node.data)
    }

    const isLeaf = (node) => {
        if (node.left == null && node.right == null) {
            return true;
        } else {
            return false;
        }
    };

    const isParentOfSingleChild = (node) => {
        if (node.left == null && node.right != null) {
            return true;
        } else if (node.left != null && node.right == null) {
            return true;
        } else {
            return false;
        }
    };

    const getSingleChild = (node) => {
        if (node.left == null) {
            return node.right;
        } else {
            return node.left;
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
        deleteItem,
        find,
        levelOrder,
        levelOrderRecursive,
        inOrder,
        preOrder,
        postOrder,
    };
}
