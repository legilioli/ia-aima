function Set(){
    this.data = [];
}

Set.prototype.put =function(element){
    var el_string = JSON.stringify(element);
    if(this.data.indexOf(el_string)==-1)
        this.data.push(el_string);
};

Set.prototype.remove =function(element){
    var idx = this.data.indexOf(JSON.stringify(element));
    if (idx!=-1)
        this.data.splice(idx,1);
};

Set.prototype.contains =function(element){
    return this.data.indexOf(JSON.stringify(element))!=-1;
};

