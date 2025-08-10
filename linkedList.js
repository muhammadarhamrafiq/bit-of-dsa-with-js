
class Node{
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class LinkedList{
    #head;
    #tail;
    #size;
    constructor(){
        this.#head = null;
        this.#tail = null;
        this.#size = 0;
    }

    append(value){
        if(this.#head === null){
            this.#head = new Node(value);
            this.#tail = this.#head;
            this.#size++;
            return;
        }

        this.#tail.next = new Node(value);
        this.#tail = this.#tail.next;
        this.#size++
    }

    prepend(value){
        if(this.#head === null){
            this.#head = new Node(value);
            this.#tail = this.#head;
            this.#size++
            return;
        }

        const newNode = new Node(value);
        newNode.next = this.#head;
        this.#head = newNode;
        this.#size++;
    }

    get size(){
        return this.#size;
    }

    get head(){
        return this.#head;
    }

    get tail(){
        return this.#tail;
    }

    at(index){
        if(index < 0 || index >= this.#size){
            throw new Error("Index Out of Bounds");
        }

        let current = this.#head;
        for(let i = 0; i < index; i++){
            current = current.next;
        }

        return current;
    }

    pop(){
        if(this.#size === 0) return;

        if(this.#size === 1){
            this.#head = null;
            this.#tail = null;
            this.#size = 0;
            return
        }

        let current = this.#head;
        while(current.next !== this.#tail){
            current = current.next;
        }
        
        this.#tail = current;
        current.next = null;
        this.#size--;
    }

    contains(value){
        if(this.#size === 0) return false;

        let current = this.#head;
        while(current !== null){
            if(current.value === value) return true;
            current = current.next;
        }

        return false;
    }

    find(value){
        if(this.#size === 0) return -1;

        let current = this.#head;
        for(let i = 0; i < this.#size; i++){
            if(current.value === value) return i;
            current = current.next;
        }

        return -1;
    }

    toString(){
        if(this.#size === 0) return "null";

        let current = this.#head;
        let string = ""
        while(current !== null){
            string += `(${current.value}) -> `
            current = current.next;
        }

        string += "null";

        return string;
    }

    insertAt(value, index){
        if(index < 0 || index > this.#size) return;

        if(index === this.#size){
            this.append(value);
            return;
        }

        if(index === 0){
            this.prepend(value);
            return;
        }

        let current = this.#head;
        for(let i = 0; i < index - 1; i++){
            current = current.next;
        }

        const newNode = new Node(value);
        newNode.next = current.next;
        current.next = newNode;
        this.#size++;
    }

    removeAt(index){
        if(index < 0 || index >= this.#size) return;

        if(index === 0){
            this.#head = this.#head.next;
            this.#size--;

            if(this.#size === 0){
                this.#tail = null;
            }

            return;
        }

        if(index === this.#size-1){
            this.pop();
            return;
        }

        let current = this.#head;
        for(let i = 0; i < index - 1; i++){
            current = current.next;
        }

        current.next = current.next.next;
        this.#size--
    }
}

const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

console.log(list.toString());

