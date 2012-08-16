function Set(){
    this.data = [];
}

Set.prototype.put =function(element){
    var el_string = JSON.stringify(element);
    if(this.data.indexOf(el_string)==-1)
        this.data.push(el_string);
};

Set.prototype.remove =function(element){
    var idx = this.data.indexOf(JSON.stringify(element));
    if (idx!=-1)
        this.data.splice(idx,1);
};

Set.prototype.contains =function(element){
    return this.data.indexOf(JSON.stringify(element))!=-1;
};

Set.prototype.size = function(){
    return this.data.length;
};

var searchStrategy = {

    makeNode: function(state, parent, action, cost, depth){
	    return {state:state,parent:parent,action:action,cost:cost,depth:depth}
    },
    
    log:function(msg){
        if(typeof logger != "undefined")
            logger.log(msg);
        else console.log(msg);
    },

    logPerformance: function(nodes_expanded,depth){
        searchStrategy.log("Expanded: " + nodes_expanded + " nodes");
        searchStrategy.log("Depth: " + depth );
    },


    searchBFS: function(problem){
        var queue = [];
        var max_nodes = 10000;
        var depth = 0;
        var nodes_expanded = 0;
        queue.push(searchStrategy.makeNode(problem.initial_state,null,null,0,0));
        searchStrategy.log("starting BFS search");
	    while(queue.length>0 && nodes_expanded<max_nodes){
            nodes_expanded++;
		    node = queue.shift();
		    if (problem.goal_test(node.state)){
                current_node = node;
                var action_seq = [];
                while (current_node.parent != null){
                    action_seq.push(current_node.action);
                    current_node = current_node.parent;
                }
                action_seq.reverse();
                searchStrategy.logPerformance(nodes_expanded,depth);
                searchStrategy.log(action_seq);
                return action_seq;
            } 
       		var succesors = problem.succesors(node.state);
	        for (var i=0;i<succesors.length;i++)
	            queue.push(searchStrategy.makeNode(succesors[i].state,node,succesors[i].action,node.cost+problem.cost(node.state,node.action),node.depth+1));
            if (node.depth > depth) depth = node.depth;
	    }
        searchStrategy.logPerformance(nodes_expanded,depth);
        searchStrategy.log("Node limit reached. Aborting");
        return null;
    },

    searchAStar: function(problem){
        var queue = [];
        var max_nodes = 10000;
        var depth = 0;
        var nodes_expanded = 0;
        var root = {node:searchStrategy.makeNode(problem.initial_state,null,null,0,0),priority:0};
        queue.push(root);
        searchStrategy.log("starting A* tree search");
	    while(queue.length>0 && nodes_expanded<max_nodes){
            nodes_expanded++;
            var min_node = queue[0];
            var min_node_idx = 0;
            for (var i=0; i<queue.length;i++)
                if (queue[i].priority<min_node.priority) min_node_idx = i;
		    var node = queue.splice(min_node_idx,1)[0];
            node = node.node;

		    if (problem.goal_test(node.state)){
                current_node = node;
                var action_seq = [];
                while (current_node.parent != null){
                    action_seq.push(current_node.action);
                    current_node = current_node.parent;
                }

                action_seq.reverse();
                searchStrategy.logPerformance(nodes_expanded,depth);
                searchStrategy.log(action_seq);
                return action_seq;
            }
       		var succesors = problem.succesors(node.state);
	        for (var i=0;i<succesors.length;i++){
                var step_cost = problem.cost(node.state,node.action);
	            queue.push({node:searchStrategy.makeNode(succesors[i].state,node,succesors[i].action,node.cost+step_cost,node.depth+1),priority:problem.h(succesors[i].state)+node.cost+step_cost});
            }
            if (node.depth > depth) depth = node.depth;
	    }
        searchStrategy.logPerformance(nodes_expanded,depth);
        searchStrategy.log("Node limit reached. Aborting");
        return null;
    },


    searchAStarGraph: function(problem,h){
        var frontier = [];
        var closed = new Set();
        var max_nodes = 100000;
        var depth = 0;
        var nodes_expanded = 0;
        var root = {node:searchStrategy.makeNode(problem.initial_state,null,null,0,0),priority:0};
        frontier.push(root);
        searchStrategy.log("starting A* graph search");
	    while(frontier.length>0 && nodes_expanded<max_nodes){
            nodes_expanded++;
            var min_node = frontier[0];
            var min_node_idx = 0;
            for (var i=0; i<frontier.length;i++)
                if (frontier[i].priority<min_node.priority){ 
                    min_node_idx = i;
                    min_node = frontier[i];
                }
		    var node = frontier.splice(min_node_idx,1)[0];
            node = node.node;

		    if (problem.goal_test(node.state)){
                current_node = node;
                var action_seq = [];
                while (current_node.parent != null){
                    action_seq.push(current_node.action);
                    current_node = current_node.parent;
                }

                action_seq.reverse();
                searchStrategy.logPerformance(nodes_expanded,depth);
                searchStrategy.log("States visited: " + closed.size());
                searchStrategy.log("Solution found. Length: "+ action_seq.length);
                searchStrategy.log("Action sequence: "+ action_seq);
                return action_seq;
            }
            if(!closed.contains(node.state)){
                closed.put(node.state);
           		var succesors = problem.succesors(node.state);
	            for (var i=0;i<succesors.length;i++){
                    var step_cost = problem.cost(node.state,node.action);
	                frontier.push({node:searchStrategy.makeNode(succesors[i].state,node,succesors[i].action,node.cost+step_cost,node.depth+1),priority:problem.h(succesors[i].state)+node.cost+step_cost});
                }
            }
            if (node.depth > depth) depth = node.depth;
	    }
        searchStrategy.logPerformance(nodes_expanded,depth);
        searchStrategy.log("Node limit reached. Aborting");
        return null;
    },


    searchBFSGraph: function(problem){
        var queue = [];
        var closed = new Set();
        var max_nodes = 100000;
        var depth = 0;
        var nodes_expanded = 0;
        queue.push(searchStrategy.makeNode(problem.initial_state,null,null,0,0));
        searchStrategy.log("starting BFS Graph search");
	    while(queue.length>0 && nodes_expanded<max_nodes){
            nodes_expanded++;
		    node = queue.shift();
		    if (problem.goal_test(node.state)){
                current_node = node;
                var action_seq = [];
                while (current_node.parent != null){
                    action_seq.push(current_node.action);
                    current_node = current_node.parent;
                }
                action_seq.reverse();
                searchStrategy.logPerformance(nodes_expanded,depth);
                searchStrategy.log("States visited: " + closed.size());
                searchStrategy.log("Solution found. Length: "+ action_seq.length);
                //searchStrategy.log(action_seq);
                return action_seq;
            } 

            if(!closed.contains(node.state)){
                closed.put(node.state);
           		var succesors = problem.succesors(node.state);
	            for (var i=0;i<succesors.length;i++)
	                queue.push(searchStrategy.makeNode(succesors[i].state,node,succesors[i].action,node.cost+problem.cost(node.state,node.action),node.depth+1));
            }
            if (node.depth > depth) depth = node.depth;
            
	    }
        searchStrategy.logPerformance(nodes_expanded,depth);
        return null;
    },

    searchDFS: function(problem, depth_limit){
	    var stack = [];
	    var depth = 0;
	    var end = false;
	    var nodes_expanded = 0;
	    stack.push(searchStrategy.makeNode(problem.initial_state,null,null,0,0));
	    searchStrategy.log("starting DFS search");
	    while(stack.length>0){
		    nodes_expanded++;
		    node = stack.pop();
		    if( problem.goal_test(node.state)){
          	      current_node = node;
                  var action_seq = [];
          	      while (current_node.parent != null){
          	          action_seq.push(current_node.action);
          	          current_node = current_node.parent;
          	      }
          	      action_seq.reverse();
          	      searchStrategy.log(action_seq);
                  return action_seq;
		    }
			var succesors = problem.succesors(node.state);
			if(node.depth<=depth_limit)
			    for (var i=0;i<succesors.length;i++){
			        stack.push(searchStrategy.makeNode(succesors[i].state,node,succesors[i].action,node.cost+problem.cost(node.state,node.action),node.depth+1));
			        depth = node.depth+1;
			    }
	    }
        searchStrategy.log("Expanded: " + nodes_expanded + " nodes");
        searchStrategy.log("Depth: " + depth );
        if (depth > depth_limit && stack.length==0) searchStrategy.log("Depth limit reached");
        return null;
    },

    searchDFSID: function(problem){
	    var action_seq = null;
	    var depth_limit = 0;
	    var iteration_limit = 50;
	    var expanded_nodes = 0;
	    var end = false;
	    searchStrategy.log("starting DFSID search");
	    while (!end && action_seq == null){
		    action_seq = searchStrategy.searchDFS(problem,depth_limit);
		    depth_limit++;
		    if (depth_limit>iteration_limit)
			    end = true;
	    }
	    return action_seq;
    }
}
