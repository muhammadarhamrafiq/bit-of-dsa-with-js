
function getAllActions([x , y] , boardSize = 8){
    let actions = [
        [x+2 , y+1],
        [x+2 , y-1],
        [x-2 , y+1],
        [x-2 , y-1],
        [x+1 , y+2],
        [x+1 , y-2],
        [x-1 , y+2],
        [x-1 , y-2]
    ]

    return actions.filter(([newX, newY])=>(newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize));
}

class Node{
    constructor(value , parent= null){
        this.value = value;
        this.parent = parent;
    }
}

function knigtsTravail(start , end){
    const frontier = [];
    const explored = [];

    const firstNode = new Node(start);
    frontier.push(firstNode);

    while(frontier.length !== 0){
        const current = frontier.shift();

        if(current.value[0] === end[0] && current.value[1] === end[1]){
            let moves = []
            let node = current;
            while(node){
                moves.push(node.value);
                node = node.parent;
            }
            moves.reverse()
            return moves;
        }

        explored.push(current);
        const actions = getAllActions(current.value);

        actions.forEach((action) => {
            let isExplored = explored.find((node) => node.value[0] === action[0] && node.value[1] === action[1]);
            let isInFrontier = frontier.find((node) => node.value[0] === action[0] && node.value[1] === action[1]);

            if(!isExplored && !isInFrontier){
                let newNode = new Node(action, current);
                frontier.push(newNode);
            }
        })

    }
}

const start = [0, 0];
const end = [7, 7];

const path = knigtsTravail(start, end);
console.log("Path:", path);