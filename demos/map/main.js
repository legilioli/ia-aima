
var run = function(){


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
               cost:function(state,action){return 1;}
           }
        }

    }

    var canvas = document.getElementById("c");
    dc = canvas.getContext("2d");
    var n = 4;
    var m = 4;

    var problem = MazeProblem.makeProblem(n,m);
    var map = new Map(400/(n*2+1),problem.map_data);
    map.draw(dc,0,0);

    var oldtime = new Date();
    var actions = searchStrategy.searchDFSID(problem);
    var newtime = new Date();
    console.log("Tiempo de busqueda: " + (newtime.getTime()-oldtime.getTime())/1000 + " seg.");

//    console.log(actions);
}


window.onload = run;

