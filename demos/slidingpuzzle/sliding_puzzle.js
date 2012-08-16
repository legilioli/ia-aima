
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

    h:function(state){
        var board_size = state.length;
        var accum = 0;
        
        getTileGoalPos = function(i,n){
            var xdest = Math.floor((i-1)/n);
            var ydest = i - xdest*n - 1;
            return [xdest,ydest];
        };

        getTileDistFromGoal = function(i,pos,n){
            var goalPos = getTileGoalPos(i,n);
            var xdist = Math.abs(pos[0]-goalPos[0]);
            var ydist = Math.abs(pos[1]-goalPos[2]);
            return xdist + ydist;
        };

        for(var i=0; i<board_size;i++)
            for ( var j=0; j<board_size; j++)
            if (state[i,j]!=0)
                accum += getTileDistFromGoal(state[i,j],[i,j],board_size);
    },

    makeProblem: function(board){
        return new Problem(board,this.succesors,this.isSolved,this.cost);
    },

    test: function(){
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
    }

}




