function Map(tsize, data) {
	this.tsize = tsize;
	//tamaño del tile
	this.data = data;
	//array con el mapa
	this.draw = function(dc, x, y) {
		var boxX = boxY = 0;
		for(var i = 0; i < this.data.length; i++) {
			for(var j = 0; j < this.data[0].length; j++) {
				boxX = x + j * this.tsize;
				boxY = y + i * this.tsize;
				dc.fillStyle = (this.data[i][j] == 1) ? "#000" : "#aaa";
				dc.fillRect(boxX, boxY, this.tsize+0.5, this.tsize+0.5);
			}
		}
	}

    this.drawPath =function(dc, x, y,path,color) {
        if (null==color) color = "rgba(0,0,0,0.5)";
		var boxX = boxY = 0;
		for(var i = 0; i < path.length; i++) {
				boxX = x + path[i][1] * this.tsize;
				boxY = y + path[i][0] * this.tsize;
				dc.fillStyle = color;
				dc.fillRect(boxX, boxY, this.tsize+0.5, this.tsize+0.5);
		}
	}    

	this.getTileCoord = function(x, y) {
		var j = Math.floor(y / this.tsize);
		var i = Math.floor(x / this.tsize);
		if((i >= data.length) || (j >= data.length) || (i < 0) || (j < 0))
			return null;
		else
			return vector(i, j);
	}
	this.isWall = function(x, y) {
		var v = this.getTileCoord(x, y)
		if(v != null) {
			return this.data[v.y][v.x] == 1;
		} else
			return null;
	}

    this.toString = function(){
        return JSON.stringify(this.data);
    }

    this.loadMap = function(mapString){
        var map = JSON.parse(mapString);
        this.data = map;
    }
}

