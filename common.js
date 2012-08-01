function assertTrue(expr){
    if (expr!=true) throw "Assertion error";
}

Array.prototype.clone = function(){ return JSON.parse(JSON.stringify(this)) }

function arrayIsEqual(a1,a2){
    return JSON.stringify(a1) == JSON.stringify(a2);
}

function printMatrix(m){
    for (var i=0;i<m.length;i++){
        b = "";
        for ( var j=0;j<m[i].length;j++)
            b = b + " " + m[i][j];
        console.log(b);
    }
}

function Problem(initial_state,succesors,goal_test,cost_function){
    this.initial_state = initial_state;
    this.succesors = succesors;
    this.goal_test = goal_test;
    this.cost = cost_function;
}

assertTrue(!arrayIsEqual([1,3],[1]));
assertTrue(!arrayIsEqual([1,3],[1,2]));
assertTrue(arrayIsEqual([1,3],[1,3]));

