// The MIT License (MIT)

// Copyright (c) 2015 MatthieuHarbich

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.



KlikLayer.prototype.polygonView = function(hTime){
	var lastTime = -1;
		$(this.video).on('timeupdate', function () {

			var videoTime = Math.floor(this.currentTime * 4) / 4;
			_this.videoTime = videoTime;
			if(typeof hTime[videoTime] != 'undefined'){
				if (lastTime === videoTime) {return};
			 	lastTime = videoTime;
			 	console.log(videoTime)
			 	console.log(hTime[videoTime])
			 	_this.color = 'red';
			 	KlikLayer.prototype.drawPolygones(hTime[videoTime]);

			}else{
				_this.R.clear();
			}
		    
		});
}

KlikPolygon.prototype.addPoint = function(position){
	if(this.edit){

	var points = new KlikPolygonPoint(_this.R, _this.points, _this.pointsPercentage, _this.coordinatesString, _this.widthInPx,_this.heightInPx, position, this);
	// this.update();


	_this.points.push({
		id: 'da',
		x: position.x,
		y: position.y
	})
	this.update(_this.points);

	return points;
	}	
}

KlikPolygon.prototype.update = function(points){
	var polygonUpdatedPoints = this.getPoints();

	var updatedPoints = points;

	_this.coordinatesString = '';
	for (var i = updatedPoints.length - 1; i >= 0; i--) {
		var ptn = updatedPoints[i].x + ','+updatedPoints[i].y+' ';
		_this.coordinatesString += ptn;
	};

	this.drawPolygon(this, _this.coordinatesString);
}

KlikPolygon.prototype.stop = function(){

	if (this.edit) {

		this.edit = false;
		// this.update();
		this.polyPath.attr('path',_this.convertedPath+' Z');
	};
	
}

KlikPolygon.prototype.start = function(){
	_this.edit = true;
	
}

KlikPolygon.prototype.drawPolygon = function(that, points){
	var that = that;

	_this.convertedPath = points.replace(/([0-9.]+),([0-9.]+)/g, function($0, x, y) {
	    return 'L ' + Math.floor(x) + ' ' + Math.floor(y);
	}).replace(/^L/, 'M');

	that.polyPath.attr('path',_this.convertedPath).attr('fill', 'blue').attr('opacity', 0.5);	
}

KlikLayer.prototype.newPolygon = function(){
	return new KlikPolygon(this.R, _this.widthInPx, _this.heightInPx, _this.id);
}

function KlikPolygon(R, widthInPx, heightInPx, paperId){
	_this = this;
	_this.R = R;
	_this.points = [];
	_this.pointsPercentage = [];
	_this.coordinatesString = '';
	_this.edit = true;
	_this.polyPath = _this.R.path('');
	_this.widthInPx = widthInPx;
	_this.heightInPx = heightInPx;
	_this.paperId = paperId;
	_this.first = true;

	
	
	do {
	_this.polyClass =  Math.random().toString(36).substr(2, 9);
	} while ($('.' + _this.polyClass).length != 0);
	_this.polyPath.node.setAttribute('class',_this.polyClass);
	
}

KlikPolygon.prototype.getPoints = function(){
	_this.points = [];
	var arrayOfPoints = this.coordinatesString.split(/[\s,]+/);

	var pts = [];
	// for (var i = arrayOfPoints.length - 2; i >= 0; i = i-2) {
	// 	var pt = {
	// 		x: parseFloat(arrayOfPoints[i-1]),
	// 		y: parseFloat(arrayOfPoints[i])
	// 	}

	// 	_this.points.push(pt);

	// };


	for (var i = this.pointsPercentage.length - 1; i >= 0; i--) {
		var xPx = (this.pointsPercentage[i].x/100)*_this.widthInPx;
		var yPx = (this.pointsPercentage[i].y/100)*_this.heightInPx;
		var point = {
			'x': xPx,
			'y': yPx
		};
		_this.points.push(point);
	};

	return _this.points;
}


function KlikPolygonPoint(R, points, pointsPercentage, coordinatesString, widthInPx, heightInPx, position, polygon){
	_that = this;
	_that.R = R;
	_that.points = points;
	_that.coordinatesString = coordinatesString;
	_that.widthInPx = widthInPx;
	_that.heightInPx = heightInPx;
	_that.position = position;
	_that.pointsPercentage = pointsPercentage;
	

	var ptn = _that.position.x + ','+_that.position.y+' ';
	_that.coordinatesString += ptn;
	var paperWidth = R.offsetWidth;
	var Xpercentage = (_that.position.x/_that.widthInPx)*100 ;
	var Ypercentage = (_that.position.y/_that.heightInPx)*100;
	_that.pointsPercentage.push({'x': Xpercentage, 'y': Ypercentage, 'asda': 'sda'});
	var p = _that.R.circle(Xpercentage + '%', Ypercentage + '%', '1%').attr('fill', 'green');
	var start = function () {
	    this.ox = this.attr("cx");
	    this.oy = this.attr("cy");
	    console.log(polygon)
	},
	move = function (dx, dy) {
		var dxPercent = (dx/_that.widthInPx)*100;
		var oxPercent = parseFloat(this.ox);
		var dyPercent = (dy/_that.heightInPx)*100;
		var oyPercent = parseFloat(this.oy);
		// var oxPercent = this.ox.substring(0, this.ox.length - 1);
		_this.newPositionX = dxPercent + oxPercent + "%";
		_this.newPositionY = dyPercent + oyPercent + "%";

		_this.posXPercent = dxPercent + oxPercent;
		_this.posYPercent = dyPercent + oyPercent;

	    this.attr({cx: _this.newPositionX, cy: _this.newPositionY});
	    var points = [];
	    var x = (parseFloat(_this.newPositionX)/100)* _this.widthInPx;
	    var y = (parseFloat(_this.newPositionY)/100)* _this.heightInPx;

	    var newPosPx = {
	    	id:'dassss',
	    	x : x,
	    	y : y
	    }    
	    

	    var oxPx = (parseFloat(oxPercent)/100)* _this.widthInPx;
	    var oyPx = (parseFloat(oyPercent)/100)* _this.heightInPx;


	    for (var i = polygon.points.length - 1; i >= 0; i--) {
	    	if (polygon.points[i].x <= oxPx + 5 && polygon.points[i].x >= oxPx - 5 && polygon.points[i].y <= oyPx + 5 && polygon.points[i].y >= oyPx - 5 ) {
	    		polygon.points[i].x = newPosPx.x;
	    		polygon.points[i].y = newPosPx.y;

	    	};

	    	points.push(polygon.points[i]);

	    };

	    var newPolygonPoints = points.slice();

	    _this.points = points.slice();
	    polygon.points = points.slice();




	    polygon.update(newPolygonPoints)
		


	},
	up = function () {

		var arrayOfPoints = polygon.coordinatesString.split(/[\s,]+/);
		var pts = [];
		var ptsPercentage = [];
		console.log(polygon)


		// for (var i = polygon.points.length - 1; i >= 0; i--) {

		// };
		for (var i = arrayOfPoints.length - 2; i >= 0; i = i-2) {
			var pt = {
				x: parseFloat(arrayOfPoints[i-1]),
				y: parseFloat(arrayOfPoints[i])
			}
			pts.push(pt);

		};

		polygon.points = pts.slice();

		for (var i = polygon.points.length - 1; i >= 0; i--) {



			var posPer = {
				x: (polygon.points[i].x/_this.widthInPx)*100,
				y: (polygon.points[i].y/_this.heightInPx)*100
			}

			ptsPercentage.push(posPer);
		};

		polygon.pointsPercentage = ptsPercentage.slice();
		// for (var i = polygon.pointsPercentage.length - 1; i >= 0; i--) {

		// 	polygon.pointsPercentage[i] = {
		// 		x:2 + (4*i),
		// 		y:2 + (4*i)
		// 	} 
		// };


	};
	_that.R.set(p).drag(move, start, up);

	// pointsToPath(_this.coordinatesString);
	
}

KlikPolygonPoint.prototype.getPoints = function(){
	// _this.points = [];
	// for (var i = _this.pointsPercentage.length - 1; i >= 0; i--) {
	// 	var xPx = (_this.pointsPercentage[i].x/100)*_this.widthInPx;
	// 	var yPx = (_this.pointsPercentage[i].y/100)*_this.heightInPx;
	// 	_this.points.push({'x':xPx, 'y': yPx, 'id':'dsadsa'})
	// };

	// return _this.points;

}

KlikPolygonPoint.prototype.drag = function(points){
	var start = function () {
	    this.ox = this.attr("cx");
	    this.oy = this.attr("cy");
	},
	move = function (dx, dy) {

	    this.attr({cx: this.ox + dx, cy: this.oy + dy});
	},
	up = function () {};
	for (var i = points.length - 1; i >= 0; i--) {
		R.set(points[i]).drag(move, start, up);
	};
	
}
