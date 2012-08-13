 var MazeProblem = {
    
        getActions: function(map,pos){
            var n = map.length;
            var m = map[0].length;
            var actions = [];
            if ((pos[0]-1)>=0 && map[pos[0]-1][pos[1]]==0) actions.push("up");
            if ((pos[0]+1)<n && map[pos[0]+1][pos[1]]==0) actions.push("down");
            if ((pos[1]+1)<m && map[pos[0]][pos[1]+1]==0) actions.push("right");
            if ((pos[1]-1)>=0 && map[pos[0]][pos[1]-1]==0) actions.push("left");
            return actions;
        },

        doAction:function(pos,action){
            var new_pos = [pos[0],pos[1]];
	        switch(action){
		        case "up":new_pos[0]--;break;
		        case "down": new_pos[0]++;break;
		        case "left": new_pos[1]--;break;
		        case "right": new_pos[1]++;break;
            }
            return new_pos;
        },

        getPathCoords:function(actionsSeq,startPos){
            if (actionsSeq == null) return [];
            var coordsSeq=[];
            var currentPos=[startPos[0],startPos[1]];
            coordsSeq.push(currentPos);
            for (var i=0; i<actionsSeq.length;i++){
                currentPos = MazeProblem.doAction(currentPos,actionsSeq[i]);
                coordsSeq.push(currentPos);
            }
            return coordsSeq;
        },
        
        makeProblem: function(n,m){
            
           return {
               map_data:MazeGenerator.createMaze(n,m),
               initial_state:[1,1],//start_pos
               endPos:[n*2-1,m*2-1],
               goal_test: function(pos){
                    return (pos[0]== this.endPos[0] && pos[1] == this.endPos[1]);
               },
               succesors: function(pos){
                   var succesors = []
                   var actions = MazeProblem.getActions(this.map_data,pos);
                   for (var i=0; i<actions.length;i++)
                       succesors.push({state:MazeProblem.doAction(pos,actions[i]),action:actions[i]});
                   return succesors;  
               },
               cost:function(state,action){return 1;},
               //heuristica para busquedas informadas
               h:function(pos){
                    return (this.endPos[0]-pos[0])*(this.endPos[0]-pos[0])+(this.endPos[1]-pos[1])*(this.endPos[1]-pos[1])
               }
           }
        }


    }
