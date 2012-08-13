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


function Timer(){
    this.start_time = new Date();
    this.stop_time;
    this.elapsed = 0;
    this.running = false;
}

Timer.prototype.reset = function(){
    this.elapsed = 0;
    this.running = false;
}

Timer.prototype.start = function(){
    if(!this.running){
        this.start_time = new Date();
        this.running = true;
    }
}

Timer.prototype.stop = function(){
    if(this.running) {
        this.stop_time = new Date();
        this.elapsed = this.elapsed + (this.stop_time.getTime()-this.start_time.getTime());
    }
}

Timer.prototype.getElapsed = function(){
    return this.elapsed;
}


var logger = (function(){        
        
        var console_mode = true;

        var output_element = null;
        
        var set_log_element = function(element_id){
            output_element = document.getElementById(element_id);
        };
  
        var output_to_element = function(msg){
            output_element.innerHTML += (msg + "\n");
            output_element.onchange();
        };
        
        return {
            log:function(msg){
                if (console_mode==true) console.log(msg);
                if (output_element) output_to_element(msg);
            },
            
            set_log_element:set_log_element
        }
    })();


assertTrue(!arrayIsEqual([1,3],[1]));
assertTrue(!arrayIsEqual([1,3],[1,2]));
assertTrue(arrayIsEqual([1,3],[1,3]));

