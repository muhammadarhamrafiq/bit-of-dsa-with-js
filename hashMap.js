

class Node{
    constructor(key , value){
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

class HashMap{
    #capacity;
    #loadFactor;
    #buckets
    #size

    constructor(){
        this.#capacity = 16;
        this.#loadFactor = 0.8;
        this.#buckets = new Array(16).fill(null);
        this.#size = 0;
    }

    hash(key){
        let hashCode = 0;

        const primeNumber = 31;
        for(let i = 0; i < key.length; i++){
            hashCode = hashCode * primeNumber + key.charCodeAt(i);
            hashCode %= this.#capacity;
        }

        return hashCode;
    }

    set(key, value){
        let hashValue = this.hash(key);

        if(!this.#buckets[hashValue]){
            this.#buckets[hashValue] = new Node(key , value);

        }else{
            let current = this.#buckets[hashValue];

            while(current.next !== null && current.key !== key){
                current = current.next;
            }

            if(current.key === key){
                current.value = value;
                return;
            }

            current.next = new Node(key, value);
        }


        this.#size++;
        if(this.#size > this.#capacity*this.#loadFactor){
            this.#resize();
        }
        
    }

    get(key){
        let hashValue = this.hash(key);

        if(!this.#buckets[hashValue]) return null;

        let current = this.#buckets[hashValue];
        while(current !== null){
            if(current.key === key) return current.value;
            current = current.next;
        }

        return null;
    }


    has(key){
        let hashValue = this.hash(key);

        let current = this.#buckets[hashValue];
        while(current){
            if(current.key === key){
                return true;
            }

            current = current.next;
        }

        return false;
    }

    remove(key){
        let hashValue = this.hash(key);


        if(!this.#buckets[hashValue]) return false;

        let current = this.#buckets[hashValue];

        if(current.key === key){
            this.#buckets[hashValue] = current.next;
            this.#size--;
            return true;
        }

        while(current.next && current.next.key !== key){
            current = current.next;
        }

        if(!current.next){
            return false
        }

        current.next = current.next.next;
        this.#size--
        return true;
    }

    get length(){
        return this.#size
    }

    clear(){
        this.#buckets = new Array(this.#capacity).fill(null);
        this.#size = 0;
    }

    get keys(){
        const keys = [];

        for(let i = 0; i < this.#capacity; i++){
            let current = this.#buckets[i];
            while(current){
                keys.push(current.key);
                current = current.next;
            }
        }

        return keys;
    }

    get values(){
        const values = []

        for(let i = 0; i < this.#capacity; i++){
            let current = this.#buckets[i];
            while(current){
                values.push(current.value);
                current = current.next;
            }
        }

        return values;
    }

    get entries(){
        const entries = []
        
        for(let i = 0; i < this.#capacity; i++){
            let current = this.#buckets[i];

            while(current){
                let entry = [
                    current.key,
                    current.value
                ];

                entries.push(entry);
                current = current.next;
            }
        }

        return entries
    }

    #resize(){
        const oldEntries = this.entries;
        this.#capacity *= 2;
        this.clear();

        for(let i = 0; i < oldEntries.length; i++){
            this.set(oldEntries[i][0] , oldEntries[i][1]);
        }
    }
}

const map = new HashMap();
for (let i = 0; i < 20; i++) {
    map.set(`key${i}`, i);
}
console.log(map.entries);
console.log(map.length);
console.log(map.keys);
console.log(map.values);