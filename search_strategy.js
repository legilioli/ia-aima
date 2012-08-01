
searchStrategy = {

    makeNode: function(state, parent, action, cost, depth){
	    return {state:state,parent:parent,action:action,cost:cost,depth:depth}
    },

    searchBFS: function(problem){
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
    },

    searchDFS: function(problem, depth_limit){
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
    },

    searchDFSID: function(problem){
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
}
