
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
assertTrue(arrayIsEqual(searchAStarGraph(sliding_problem,SlidingPuzzle.h),["left","left","up","right","up","right","down","down"]));

sliding_problem = SlidingPuzzle.makeProblem([[1,2,0],[4,5,3],[7,8,6]]);
assertTrue(arrayIsEqual(searchDFSID(sliding_problem),["down","down"]));

sliding_problem = SlidingPuzzle.makeProblem([[1,2,0],[4,5,3],[7,8,6]]);
assertTrue(arrayIsEqual(searchAStarGraph(sliding_problem,SlidingPuzzle.h),["down","down"]));

