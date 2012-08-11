
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
    if (((x-1)>=0) && map[x-1][y]==1) nb.push([x-1,y]);
    if (((x+1) < n) && map[x+1][y]==1) nb.push([x+1,y]);
    if (((y-1)>=0) && map[x][y-1]==1) nb.push([x,y-1]);
    if (((y+1) < m) && map[x][y+1]==1) nb.push([x,y+1]);
    return nb;
}

function is_double_connected(map,pos,n,m){
    var paths = 0;
    var x = pos[0]; var y = pos[1];
    if (((x-1)>=0) && map[x-1][y]==0) paths++;
    if (((x+1) < n) && map[x+1][y]==0) paths++;
    if (((y-1)>=0) && map[x][y-1]==0) paths++;
    if (((y+1) < m) && map[x][y+1]==0) paths++;

    if (((y+1) < m) && ((x+1) < n) && map[x+1][y+1]==0) paths++;
    if (((y-1) >= 0) && ((x-1) >= 0) &&  map[x-1][y-1]==0) paths++;
    if (((y+1) < m) && ((x-1) >= 0) && map[x-1][y+1]==0) paths++;
    if (((y-1) >= 0) && ((x+1) < n) && map[x+1][y-1]==0) paths++;


    return paths > 2;
}

function shuffle_array(o){
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
}

function DFSmaze(map){

    var stack = [];
    stack.push([1,1]);
    while (stack.length>0){
        var pos = stack.pop();
//        if(!is_double_connected(map,pos,map.length,map[0].length)){
            var neighbours = get_neighbours(map,pos,map.length,map[0].length);
            if(neighbours.length>0){
                map[pos[0]][pos[1]]=0;
                neighbours = shuffle_array(neighbours);
                for(var i = 0; i < neighbours.length;i++){
                    map[neighbours[i][0]][neighbours[i][1]]=2;
                    stack.push(neighbours[i]);
                }
    
            }

//        }
    }
    
    for(var i = 0; i<map.length;i++)
        for(var j=0; j<map[0].length;j++)
            if (map[i][j]==2) map[i][j]=1;    

    printMatrix(map);
    return map;
}

function divideMap(map,x0,xf,y0,yf){
    
    // selecciono el x e y para la division   
    var x = Math.floor(Math.random()*(yf-y0));
    var y = Math.floor(Math.random()*(xf-x0));

    console.log(x);
    console.log(y);

    for (var j=y0;j<=yf;j++)
        map[y][j]=1;
    for (var i=x0;i<=xf;i++)
        map[i][x]=1;

    // llamada recursiva a las camaras resulantes
    
//    map = divideMap(map,x0)
    if ((x-x0)>0)

    return map;
}
