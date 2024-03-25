import Tree from './tree.js';

function createRandomArray (n) {
    let arr = [];
    while (arr.length < n - 1) {
        arr.push(Math.floor(Math.random() * 100))
    }
    return arr;
};

let arr = createRandomArray(12)
let tree = Tree(arr);

console.log('Random array:')
console.log(arr)
tree.prettyPrint(tree.root())
console.log(`Is tree balanced? ${tree.isBalanced()}`)

console.log('InOrder Traversal:')
tree.inOrder(tree.root());
console.log('PreOrder Traversal:')
tree.preOrder(tree.root());
console.log('PostOrder Traversal:')
tree.postOrder(tree.root());

console.log('Inserting 110, 120, 130 into tree...');
tree.insert(110);
tree.insert(120);
tree.insert(130);
tree.prettyPrint(tree.root())

console.log(`Is tree balanced? ${tree.isBalanced()}`)
console.log('Rebalancing tree...')
tree.rebalance()
tree.prettyPrint(tree.root())
console.log(`Is tree balanced? ${tree.isBalanced()}`)

console.log('InOrder Traversal:')
tree.inOrder(tree.root());
console.log('PreOrder Traversal:')
tree.preOrder(tree.root());
console.log('PostOrder Traversal:')
tree.postOrder(tree.root());



