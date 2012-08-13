
function generateRandomMap(n,m){
    var map = [];
    for(var i=0;i<n;i++){
        var row = [];
        for(var j=0;j<m;j++)
            row.push(0);
        map.push(row);       
    }

    if((n>2) && (m>2))
    for(var i = 0; i < n-1;i++)
        map[i][Math.floor(m/3)]=1; 

    if((n>2) && (m>2))
    for(var i = 1; i < n;i++)
        map[i][Math.floor(m/3)*2]=1; 
            
    return map;
}


var run = function(){

    logger.set_log_element("console");

    var canvas = document.getElementById("c");
    dc = canvas.getContext("2d");

    var n = 50;
    var m = 50;

    var new_map_action = function(){
        var problem = MazeProblem.makeProblem(n,m);
//        problem.map_data = generateRandomMap(n*2+1,m*2+1);
        var map = new Map(400/(n*2+1),problem.map_data);
        map.draw(dc,0,0);
        // solve maze
        var timer = new Timer();
        timer.start();
        var actions = searchStrategy.searchBFSGraph(problem);
        timer.stop();
        path = MazeProblem.getPathCoords(actions,[1,1]);
        map.drawPath(dc,0,0,path,"rgba(255,0,0,0.5)");
        logger.log("Tiempo de busqueda: " + timer.getElapsed()/1000 + " seg.");
        logger.log("------------------------------------------\n");

        timer.reset();
        timer.start();
        var actions = searchStrategy.searchAStarGraph(problem);
        timer.stop();
        path = MazeProblem.getPathCoords(actions,[1,1]);
        map.drawPath(dc,0,0,path,"rgba(0,0,255,0.5)");
        logger.log("Tiempo de busqueda: " + timer.getElapsed()/1000 + " seg.");
        logger.log("------------------------------------------\n");
    }

    var button = document.getElementById("button_new");
    button.onclick = new_map_action;

    var textConsole = document.getElementById("console");
    textConsole.onchange = function() {
        textConsole.scrollTop=textConsole.scrollHeight; 
    };


    new_map_action();

}


window.onload = run;

