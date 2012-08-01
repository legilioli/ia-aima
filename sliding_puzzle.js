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

function printMatrix(m){
    for (var i=0;i<m.length;i++){
        b = "";
        for ( var j=0;j<m[i].length;j++)
            b = b + " " + m[i][j];
        console.log(b);
    }
}

function Problem(initial_state,succesors,goal_test,cost_function){
    this.initial_state = initial_state;
    this.succesors = succesors;
    this.goal_test = goal_test;
    this.cost = cost_function;
}

var SlidingPuzzle =  {

    getActions: function(i,j,n){
        var moves = [];
        if (i>0) moves.push("up");
        if (i<(n-1)) moves.push("down");
        if (j>0) moves.push("left");
        if (j<(n-1)) moves.push("right");
        return moves;
    },

    getBlankPosition: function(board){
        var blank = 0;
        var n = board.length
        for (var i=0;i<n;i++)
            for(var j=0; j<n;j++)
                if (board[i][j] == blank) return [i,j];
        return null;
    },

    swapElements: function(board,pos1,pos2){
	    var temp = board[pos1[0]][pos1[1]];
	    board[pos1[0]][pos1[1]] = board[pos2[0]][pos2[1]];
	    board[pos2[0]][pos2[1]] = temp;
    },

    doAction:function(board,action){
	    var pos = SlidingPuzzle.getBlankPosition(board);
        var new_board = board.clone();
	    switch(action){
		    case "up": SlidingPuzzle.swapElements(new_board,pos,[pos[0]-1,pos[1]]);break;
		    case "down": SlidingPuzzle.swapElements(new_board,pos,[pos[0]+1,pos[1]]);break;
		    case "left": SlidingPuzzle.swapElements(new_board,pos,[pos[0],pos[1]-1]);break;
		    case "right": SlidingPuzzle.swapElements(new_board,pos,[pos[0],pos[1]+1]);break;
        }
        return new_board;
    },

    getTestArray: function(){
        return [[1,2],[3,4]];
    },

    getTestPuzzle: function(){
        var p = getTestArray();
        var n = p.length;
        p[n-1][n,1]=0;
        return p;
    },

    succesors: function(board){
        var pos = SlidingPuzzle.getBlankPosition(board);
        if (pos!=null) {
            var actions = SlidingPuzzle.getActions(pos[0],pos[1],board.length);
            var succesors = [];
            for (var i = 0; i<actions.length;i++)
                succesors.push({state:SlidingPuzzle.doAction(board,actions[i]),action:actions[i]});
            return succesors;
        }
        return null;
    },

    isSolved: function(state){
	    if(arrayIsEqual(state,[[1,2,3],[4,5,6],[7,8,0]])) return true;
	        return false;
    },

    cost: function(state,action){
        return 1
    },

    makeProblem: function(board){
        return new Problem(board,this.succesors,this.isSolved,this.cost);
    }

}


//unit tests
assertTrue(arrayIsEqual(SlidingPuzzle.getActions(0,0,2),["down","right"]));
assertTrue(arrayIsEqual(SlidingPuzzle.getActions(0,1,2),["down","left"]));
assertTrue(arrayIsEqual(SlidingPuzzle.getActions(1,0,2),["up","right"]));
assertTrue(arrayIsEqual(SlidingPuzzle.getActions(1,1,2),["up","left"]));
assertTrue(arrayIsEqual(SlidingPuzzle.getActions(1,1,3),["up","down","left","right"]));

//unit tests
assertTrue(SlidingPuzzle.getBlankPosition([[1,2],[3,4]])==null);
assertTrue(arrayIsEqual(SlidingPuzzle.getBlankPosition([[0,2],[3,4]]),[0,0]));
assertTrue(arrayIsEqual(SlidingPuzzle.getBlankPosition([[1,0],[3,4]]),[0,1]));
assertTrue(arrayIsEqual(SlidingPuzzle.getBlankPosition([[1,2],[0,4]]),[1,0]));
assertTrue(arrayIsEqual(SlidingPuzzle.getBlankPosition([[1,2],[3,0]]),[1,1]));
assertTrue(arrayIsEqual(SlidingPuzzle.getBlankPosition([[1,0],[0,1]]),[0,1]));

assertTrue(arrayIsEqual(SlidingPuzzle.succesors([[0,1,2],[3,4,5],[6,7,8]]),
                        [{state:[[3,1,2],[0,4,5],[6,7,8]],action:"down"},
                         {state:[[1,0,2],[3,4,5],[6,7,8]],action:"right"}]
                        ));


function makeNode(state, parent, action, cost, depth){
	return {state:state,parent:parent,action:action,cost:cost,depth:depth}
}



function searchBFS(problem){
    var action_seq = [];
    var queue = [];
    var max_nodes = 10000;
    var depth = 0;
    var nodes_expanded = 0;
    var end = false;
    queue.push(makeNode(problem.initial_state,null,null,0,0));
    console.log("starting search");
	while(!end && queue.length>0 && nodes_expanded<max_nodes){
            nodes_expanded++;
		node = queue.shift();
		if (problem.goal_test(node.state)){
            current_node = node;
            while (current_node.parent != null){
                action_seq.push(current_node.action);
                current_node = current_node.parent;
            }
            action_seq.reverse();
            console.log(action_seq);
            end = true;
        } else {
    		var succesors = problem.succesors(node.state);
		    for (var i=0;i<succesors.length;i++)
			    queue.push(makeNode(succesors[i].state,node,succesors[i].action,node.cost+problem.cost(node.state,node.action),node.depth+1));
        }
        if (node.depth > depth) depth = node.depth;
	}
    console.log("Expanded: " + nodes_expanded + " nodes");
    console.log("Depth: " + depth );
    return action_seq;
}

function searchDFS(problem, depth_limit){
	var stack = [];
	var depth = 0;
	var end = false;
	var action_seq = [];
	var nodes_expanded = 0;
	stack.push(makeNode(problem.initial_state,null,null,0,0));
	console.log("starting search");
	while(!end && stack.length>0){
		nodes_expanded++;
		node = stack.pop();
		if( problem.goal_test(node.state)){
      	      current_node = node;
      	      while (current_node.parent != null){
      	          action_seq.push(current_node.action);
      	          current_node = current_node.parent;
      	      }
      	      action_seq.reverse();
      	      console.log(action_seq);
      	      end = true;
		}else{
			var succesors = problem.succesors(node.state);
			if(node.depth<=depth_limit)
				for (var i=0;i<succesors.length;i++){
					stack.push(makeNode(succesors[i].state,node,succesors[i].action,node.cost+problem.cost(node.state,node.action),node.depth+1));
					depth = node.depth+1;
				}
		}
	}
    console.log("Expanded: " + nodes_expanded + " nodes");
    console.log("Depth: " + depth );
    if (depth > depth_limit && stack.length==0) console.log("Depth limit reached");
    return action_seq;
}

function searchDFSID(problem){
	var action_seq = [];
	var depth_limit = 0;
	var iteration_limit = 50;
	var expanded_nodes = 0;
	var end = false;
	while (!end && action_seq.length == 0){
		action_seq = searchDFS(problem,depth_limit);
		depth_limit++;
		if (depth_limit>iteration_limit)
			end = true;
	}
	return action_seq;
}


sliding_problem = SlidingPuzzle.makeProblem([[1,5,2],[7,4,3],[8,6,0]]);
assertTrue(arrayIsEqual(searchBFS(sliding_problem),["left","left","up","right","up","right","down","down"]))

sliding_problem = SlidingPuzzle.makeProblem([[1,2,0],[4,5,3],[7,8,6]]);
assertTrue(arrayIsEqual(searchDFS(sliding_problem,4),["left","right","down","down"]));

sliding_problem = SlidingPuzzle.makeProblem([[1,5,2],[7,4,3],[8,6,0]]);
assertTrue(arrayIsEqual(searchDFS(sliding_problem,9),["left","right","left","left","up","right","up","right","down","down"]));

sliding_problem = SlidingPuzzle.makeProblem([[1,5,2],[7,4,3],[8,6,0]]);
assertTrue(arrayIsEqual(searchDFS(sliding_problem,7),["left","left","up","right","up","right","down","down"]));

sliding_problem = SlidingPuzzle.makeProblem([[1,5,2],[7,4,3],[8,6,0]]);
assertTrue(arrayIsEqual(searchDFSID(sliding_problem),["left","left","up","right","up","right","down","down"]));

sliding_problem = SlidingPuzzle.makeProblem([[1,2,0],[4,5,3],[7,8,6]]);
assertTrue(arrayIsEqual(searchDFSID(sliding_problem),["down","down"]));
