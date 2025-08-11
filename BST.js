class Node{
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BST{
    #root
    constructor(arr){
        arr.sort((a,b) => a - b);
        arr = [...new Set(arr)];

        this.#root = this.buildTree(arr, 0 , arr.length - 1);
    }

    buildTree(arr, start , end){
        if(start > end) return null;

        const mid = Math.floor(start + (end - start)/2);
        let root = new Node(arr[mid]);

        root.left = this.buildTree(arr, start, mid-1);
        root.right = this.buildTree(arr, mid + 1, end);

        return root;
    }

    insert(value){
        this.#root = this.#insert(value , this.#root);
    }

    #insert(value , node){
        if(node == null) return new Node(value);

        if(value < node.value){
            node.left = this.#insert(value , node.left);
        }else if(value > node.value){
            node.right = this.#insert(value, node.right);
        }

        return node;
    }

    remove(value){
        this.#root = this.#remove(value, this.#root);
    }

    #remove(value, node){
        if(node == null){
            return null;
        };

        if(value < node.value){
            node.left = this.#remove(value, node.left);
        }else if(value > node.value){
            node.right = this.#remove(value, node.right);
        }else{

            if(!node.left){
                return node.right;
            }

            if(!node.right){
                return node.left;
            }

            let inOrderSuccessor = this.#min(node.right);
            node.value = inOrderSuccessor.value;
            node.right = this.#remove(inOrderSuccessor.value, node.right);
        }

        return node;
    }

    #min(node){
        if(!node.left) return node;
        return this.#min(node.left);
    }

    find(value){
        return this.#find(value, this.#root);
    }

    #find(value, node){
        if(!node) return null;

        if(value < node.value){
            return this.#find(value, node.left);
        }
        else if(value > node.value){
            return this.#find(value, node.right);
        }else{
            return node;
        }
    }

    levelOrderForEach(callback){
        if(!callback){
            throw new Error("No callback provided");
        }

        const frontier = [this.#root];

        while(frontier.length !== 0){
            const current = frontier.shift();

            callback(current);

            if(current.left) frontier.push(current.left);
            if(current.right) frontier.push(current.right);
        }
    }

    inOrderForEach(callback){
        if(!callback) throw new Error("No Callback Provided");

        this.#inOrderForEach(this.#root, callback);
    }

    #inOrderForEach(node, callback){
        if(!node) return;

        this.#inOrderForEach(node.left, callback);
        callback(node);
        this.#inOrderForEach(node.right, callback);
    }


    preOrderForEach(callback){
        if(!callback) throw new Error("No Callback Provided");

        this.#preOrderForEach(this.#root, callback);
    }

    #preOrderForEach(node, callback){
        if(!node) return;

        callback(node);
        this.#preOrderForEach(node.left, callback);
        this.#preOrderForEach(node.right, callback);
    }

    postOrderForEach(callback){
        if(!callback) throw new Error("No Callback Provided");

        this.#postOrderForEach(this.#root, callback);
    }

    #postOrderForEach(node, callback){
        if(!node) return;

        this.#postOrderForEach(node.left, callback);
        this.#postOrderForEach(node.right, callback);
        callback(node);
    }

    height(value){
        const node = this.find(value);

        return this.#height(node);
    }

    #height(node){
        if(!node) return -1;
        return Math.max(this.#height(node.left), this.#height(node.right)) + 1;
    }

    depth(value){
        return this.#depth(this.#root, value, 0);
    }

    #depth(node, value, current){
        if(!node) return -1;

        if(node.value === value) return current;

        if(value < node.value){
            return this.#depth(node.left, value, current + 1);
        }
        else {
            return this.#depth(node.right, value, current + 1);
        }
    }

    isBalance(node = this.#root){
        if(!node) return true;

        const leftHeight = this.#height(node.left);
        const rightHeight = this.#height(node.right);

        if(Math.abs(leftHeight - rightHeight) > 1) return false;

        return this.isBalance(node.left) && this.isBalance(node.right);
    }

    rebalance(){
        const values = [];
        this.inOrderForEach((node) => {
            values.push(node.value);
        })

        this.#root = this.buildTree(values, 0, values.length - 1);
    }

    get root(){
        return this.#root;
    }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};


const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
let bst = new BST(array);

prettyPrint(bst.root);
console.log(bst.height(8));