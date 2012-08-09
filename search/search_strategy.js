
var searchStrategy = {

    makeNode: function(state, parent, action, cost, depth){
	    return {state:state,parent:parent,action:action,cost:cost,depth:depth}
    },

    searchBFS: function(problem){
        var queue = [];
        var max_nodes = 10000;
        var depth = 0;
        var nodes_expanded = 0;
        queue.push(searchStrategy.makeNode(problem.initial_state,null,null,0,0));
        console.log("starting BFS search");
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
                console.log(action_seq);
                return action_seq;
            } 
       		var succesors = problem.succesors(node.state);
	        for (var i=0;i<succesors.length;i++)
	            queue.push(searchStrategy.makeNode(succesors[i].state,node,succesors[i].action,node.cost+problem.cost(node.state,node.action),node.depth+1));
            if (node.depth > depth) depth = node.depth;
	    }
        console.log("Expanded: " + nodes_expanded + " nodes");
        console.log("Depth: " + depth );
        return null;
    },

    searchDFS: function(problem, depth_limit){
	    var stack = [];
	    var depth = 0;
	    var end = false;
	    var nodes_expanded = 0;
	    stack.push(searchStrategy.makeNode(problem.initial_state,null,null,0,0));
	    console.log("starting DFS search");
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
          	      console.log(action_seq);
                  return action_seq;
		    }
			var succesors = problem.succesors(node.state);
			if(node.depth<=depth_limit)
			    for (var i=0;i<succesors.length;i++){
			        stack.push(searchStrategy.makeNode(succesors[i].state,node,succesors[i].action,node.cost+problem.cost(node.state,node.action),node.depth+1));
			        depth = node.depth+1;
			    }
	    }
        console.log("Expanded: " + nodes_expanded + " nodes");
        console.log("Depth: " + depth );
        if (depth > depth_limit && stack.length==0) console.log("Depth limit reached");
        return null;
    },

    searchDFSID: function(problem){
	    var action_seq = null;
	    var depth_limit = 0;
	    var iteration_limit = 50;
	    var expanded_nodes = 0;
	    var end = false;
	    console.log("starting DFSID search");
	    while (!end && action_seq == null){
		    action_seq = searchDFS(problem,depth_limit);
		    depth_limit++;
		    if (depth_limit>iteration_limit)
			    end = true;
	    }
	    return action_seq;
    }
}
