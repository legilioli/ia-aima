function Problem(initial_state,succesors,goal_test,cost_function){
    this.initial_state = initial_state;
    this.succesors = succesors;
    this.goal_test = goal_test;
    this.cost = cost_function;
}
