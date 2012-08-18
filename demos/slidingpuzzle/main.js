var run = function(){

    logger.set_log_element("console");
    var textConsole = document.getElementById("console");
    textConsole.onchange = function() {
        textConsole.scrollTop=textConsole.scrollHeight; 
    };
    searchBFS = searchStrategy.searchBFS;
    searchBFSGraph = searchStrategy.searchBFSGraph;
    searchDFS = searchStrategy.searchDFS;
    searchDFSID = searchStrategy.searchDFSID;
    searchAStarGraph = searchStrategy.searchAStarGraph;

    SlidingPuzzle.test();

    sliding_problem = SlidingPuzzle.makeProblem([[1,2,3],[4,5,6],[7,8,0]]);
    assertTrue(arrayIsEqual(searchBFS(sliding_problem),[]))

    sliding_problem = SlidingPuzzle.makeProblem([[1,5,2],[7,4,3],[8,6,0]]);
    assertTrue(arrayIsEqual(searchBFS(sliding_problem),["left","left","up","right","up","right","down","down"]))

    sliding_problem = SlidingPuzzle.makeProblem([[1,5,2],[7,4,3],[8,6,0]]);
    assertTrue(arrayIsEqual(searchBFSGraph(sliding_problem),["left","left","up","right","up","right","down","down"]))

    sliding_problem = SlidingPuzzle.makeProblem([[1,2,0],[4,5,3],[7,8,6]]);
    assertTrue(arrayIsEqual(searchDFS(sliding_problem,4),["left","right","down","down"]));

    sliding_problem = SlidingPuzzle.makeProblem([[1,5,2],[7,4,3],[8,6,0]]);
    assertTrue(arrayIsEqual(searchDFS(sliding_problem,9),["left","right","left","left","up","right","up","right","down","down"]));

    sliding_problem = SlidingPuzzle.makeProblem([[1,5,2],[7,4,3],[8,6,0]]);
    assertTrue(arrayIsEqual(searchDFS(sliding_problem,7),["left","left","up","right","up","right","down","down"]));

    sliding_problem = SlidingPuzzle.makeProblem([[1,5,2],[7,4,3],[8,6,0]]);
    assertTrue(arrayIsEqual(searchDFSID(sliding_problem),["left","left","up","right","up","right","down","down"]));

    sliding_problem = SlidingPuzzle.makeProblem([[1,5,2],[7,4,3],[8,6,0]]);
    assertTrue(arrayIsEqual(searchAStarGraph(sliding_problem),["left","left","up","right","up","right","down","down"]));

    sliding_problem = SlidingPuzzle.makeProblem([[1,2,0],[4,5,3],[7,8,6]]);
    assertTrue(arrayIsEqual(searchDFSID(sliding_problem),["down","down"]));

/*    sliding_problem = SlidingPuzzle.makeProblem([[[4,8,1],[7,3,0],[6,2,5]]]);
    searchDFSID(sliding_problem);
*/
    sliding_problem = SlidingPuzzle.makeProblem([[1,2,0],[4,5,3],[7,8,6]]);
    assertTrue(arrayIsEqual(searchAStarGraph(sliding_problem),["down","down"]));

    canv = document.getElementById("c");
    dc = canv.getContext("2d");

   // shim layer with setTimeout fallback
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

//    var board = [[4,8,1],[7,3,0],[6,2,5]]; //toma 15 segs y ~36 mb de memoria
    var board = [[1,5,2],[7,4,3],[8,6,0]];
    var problem = SlidingPuzzle.makeProblem([[1,2,3],[4,5,6],[7,8,0]]);
    var solution = searchAStarGraph(SlidingPuzzle.makeProblem(board));
    
    var view = new SlidingPuzzleView(board,400,400);
    var img = new Image();

    img.onload = function(){
      view.setImage(img);
      view.draw(dc,0,0);
      console.log("image loaded");
    };

    img.src = "test.png";
    

    var solve_action = function(){

        var solution = searchAStarGraph(SlidingPuzzle.makeProblem(view.board));
        var animate_solution = function(lasttime){
            var date = new Date();
            var time = date.getTime();
            var time_elapsed = time - lasttime;
            if(time_elapsed > 500){
                var action = solution.shift();
                logger.log("Executing action: "+action);
                view.board = SlidingPuzzle.doAction(view.board,action);
                view.draw(dc,0,0);
                lasttime = time;
            }
            if(solution.length>0)
                    requestAnimFrame(function(){animate_solution(lasttime)});
        }


        var date = new Date();
        var time = date.getTime();
        logger.log("Starting solution");
        animate_solution(time);

    }



       // teclas
        function KeyDown(evt) {
	        switch (evt.keyCode) {
		        case 82:
			        /* 'r' was pressed */
                    console.log("R presionado");
		        case 38:
			        /* Up arrow was pressed */
        			view.move("up");
                    break;
		        case 40:
			        /* Down arrow was pressed */
        			view.move("down");
			        break;
		        case 37:
			        /* Left arrow was pressed */
        			view.move("left");
			        break;
		        case 39:
			        /* Right arrow was pressed */
        			view.move("right");

	        }
                view.draw(dc,0,0);
        }

        window.addEventListener('keydown', KeyDown, true);

        var button = document.getElementById("button_solve");
        button.onclick = solve_action;

}

window.onload = run;

