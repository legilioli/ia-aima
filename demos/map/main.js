
var run = function(){

    var canvas = document.getElementById("c");
    dc = canvas.getContext("2d");
    var map = new Map(16,MazeGenerator.createMaze(25,25));
    map.draw(dc,0,0);


}


window.onload = run;

