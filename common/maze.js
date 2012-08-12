var MazeGenerator = (function(){

    function createEmptyMap(n,m){
        var map = [];
        for (var i=0; i<n; i++){
            map[i] = [];
            for (var j=0; j<m; j++)
                map[i][j]=1;
        }
        return map;
    }

    function get_neighbours(map,pos,n,m){
        var nb = [];
        var x = pos[0]; var y = pos[1];
        if (((x-2)>=0) && map[x-2][y]==1) nb.push([x-2,y]);
        if (((x+2) < n) && map[x+2][y]==1) nb.push([x+2,y]);
        if (((y-2)>=0) && map[x][y-2]==1) nb.push([x,y-2]);
        if (((y+2) < m) && map[x][y+2]==1) nb.push([x,y+2]);
        return nb;
    }

    function shuffle_array(o){
	    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	    return o;
    }

    function carve(from,to,map){
        map[from[0]][from[1]] = 0;
        map[to[0]][to[1]] = 0;
        var dx =0;
        var dy =0;
        if (from[0]!=to[0]) dx = ((to[0] - from[0])>0)?1:-1;
        if (from[1]!=to[1]) dy = ((to[1] - from[1])>0)?1:-1;
        map[from[0]+dx][from[1]+dy] = 0;
    }

    function DFSmaze(map,startpos){

        var stack = [];
        var current_cell;
        stack.push(startpos);    
        while(stack.length >0){
            current_cell = stack[stack.length-1];
            neighbours = get_neighbours(map,current_cell,map.length,map[0].length);     
            if(neighbours.length>0){
                shuffle_array(neighbours);  
                var cell = neighbours.pop();
                carve(current_cell,cell,map);
                stack.push(cell);
            } else {
                stack.pop();
            }        
        }  
        
        return map;
    }

    return {
        createMaze:function(n,m){
            var maze = createEmptyMap(n,m);
            return DFSmaze(maze,[0,0]);
        }
    }

})()


