function assertTrue(expr){
    if (expr!=true) throw "Assertion error";
}

Array.prototype.clone = function(){ return JSON.parse(JSON.stringify(this)) }

function arrayIsEqual(a1,a2){
    return JSON.stringify(a1) == JSON.stringify(a2);
}

assertTrue(!arrayIsEqual([1,3],[1]));
assertTrue(!arrayIsEqual([1,3],[1,2]));
assertTrue(arrayIsEqual([1,3],[1,3]));

function getActions(i,j,n){
    var moves = [];
    if (i>0) moves.push("up");
    if (i<(n-1)) moves.push("down");
    if (j>0) moves.push("left");
    if (j<(n-1)) moves.push("right");
    return moves;
}

//unit tests
assertTrue(arrayIsEqual(getActions(0,0,2),["down","right"]));
assertTrue(arrayIsEqual(getActions(0,1,2),["down","left"]));
assertTrue(arrayIsEqual(getActions(1,0,2),["up","right"]));
assertTrue(arrayIsEqual(getActions(1,1,2),["up","left"]));
assertTrue(arrayIsEqual(getActions(1,1,3),["up","down","left","right"]));

function getBlankPosition(board){
    var blank = 0;
    var i = 0;
    var j = 0;
    var found = 0;
    var n = board.length
    while(!found && i<n){ //cambiar por un for con break
        while(!found && j<n){
            if (board[i][j] == blank) return [i,j];
            j++;
        }
    j=0;
    i++;
    }
    return null;
}

//unit tests
assertTrue(getBlankPosition([[1,2],[3,4]])==null);
assertTrue(arrayIsEqual(getBlankPosition([[0,2],[3,4]]),[0,0]));
assertTrue(arrayIsEqual(getBlankPosition([[1,0],[3,4]]),[0,1]));
assertTrue(arrayIsEqual(getBlankPosition([[1,2],[0,4]]),[1,0]));
assertTrue(arrayIsEqual(getBlankPosition([[1,2],[3,0]]),[1,1]));
assertTrue(arrayIsEqual(getBlankPosition([[1,0],[0,1]]),[0,1]));

function getSuccesors(board){
    var pos = getBlankPosition(board);
    if (pos!=null) {
        return getActions(pos[0],pos[1],board.length);
        
    }
    return null;
}

assertTrue(arrayIsEqual(getSuccesors([[0,1,2],[3,4,5],[6,7,8]]),["down","right"]));


function isGoalState(state){
	if(arrayIsEqual(state,[[1,2,3],[4,5,6],[7,8,0]])) return true;
	return false;	
}

function makeNode(state, parent, action, cost){
	return {state:state,parent:parent,action:action,cost:cost}
}

function swapElements(board,pos1,pos2){
	var temp = board[pos1[0]][pos1[1]];
	board[pos1[0]][pos1[1]] = board[pos2[0]][pos2[1]];
	board[pos2[0]][pos2[1]] = temp;
}

function doAction(board,action){
	var pos = getBlankPosition(board);
    var new_board = board.clone();
	switch(action){
		case "up": swapElements(new_board,pos,[pos[0]-1,pos[1]]);break;
		case "down": swapElements(new_board,pos,[pos[0]+1,pos[1]]);break;
		case "left": swapElements(new_board,pos,[pos[0],pos[1]-1]);break;
		case "right": swapElements(new_board,pos,[pos[0],pos[1]+1]);break;
    }
    return new_board;
}

function getTestArray(){
    return [[1,2],[3,4]];
}

function getTestPuzzle(){
    var n = 2;
    var p = getTestArray();
    p[n-1][n,1]=0;
    return p;
}

function printMatrix(m){
    for (var i=0;i<m.length;i++){
        b = "";
        for ( var j=0;j<m[i].length;j++)
            b = b + " " + m[i][j];
        console.log(b);
    }
}


function searchBFS(state){
    var action_seq = [];
    var queue = [];
	queue.push(makeNode(state,null,null,0));
    var max_nodes = 10000;
    var depth = 0;
    var nodes_expanded = 0;
    var end = false;
    console.log("starting search");
	while(!end && queue.length>0 && nodes_expanded<max_nodes){
        nodes_expanded++;
		node = queue.shift();
		if (isGoalState(node.state)){
            current_node = node;
            while (current_node.parent != null){
                action_seq.push(current_node.action);
                current_node = current_node.parent;
            }
            action_seq.reverse();
            console.log(action_seq);
            end = true;
        } else {
    		actions = getSuccesors(node.state);
		    for (var i=0;i<actions.length;i++)
			    queue.push(makeNode(doAction(node.state,actions[i]),node,actions[i],node.cost+1));
        }
        if (node.cost > depth) depth = node.cost;
	}
    console.log("Expanded: " + nodes_expanded + " nodes");
    console.log("Depth: " + depth );
    return action_seq;
}

assertTrue(arrayIsEqual(searchBFS([[1,2,0],[4,5,3],[7,8,6]]),["down","down"]))
searchBFS([[1,0,2],[4,5,3],[7,8,6]]);
searchBFS([[1,2,3],[4,0,5],[7,8,6]]);
searchBFS([[1,5,2],[4,0,3],[7,8,6]]);
searchBFS([[1,5,2],[7,4,3],[8,6,0]]);

//assertTrue(arrayIsEqual(searchBFS([[1,5,2],[7,4,3],[8,6,0]]),["left","left","up","right","up","right","down","down"]))

//TODO: reformular funcion getsuccesors para que devuelva pares (accion, estado)
//TODO: ver como se devuelve el resultado para mas genericidad
