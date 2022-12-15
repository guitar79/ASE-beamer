/**
* windrods-kma.js v0.0.1
* Copyright 2016, SELab, Inc.
* All rights reserved.
* Sunmook Han (smhan@selab.co.kr)
*/

NS = {
		HTML: 'http://www.w3.org/1999/xhtml',
        MATH: 'http://www.w3.org/1998/Math/MathML',
        SE: 'http://svg-edit.googlecode.com',
        SVG: 'http://www.w3.org/2000/svg',
        XLINK: 'http://www.w3.org/1999/xlink',
        XML: 'http://www.w3.org/XML/1998/namespace',
        XMLNS: 'http://www.w3.org/2000/xmlns/' // see http://www.w3.org/TR/REC-xml-names/#xmlReserved
};

	
var WR_KMA = new Object();
var WR_SVG = new Object();

var CIRCLE_COUNT = 6; // 원 개수
var CIRCLE_STEP = 30; // 원의 반지름
var WS_INDEX_STEP = 75; // WS index의 길이

var WS_INDEX_COUNT = 4; // 레전드 개수
var WS_INDEX_VALUE = ["~0.4", "0.5~3.3", "3.4~7.9", "8.0~13.8", "13.9~"];
var WS_INDEX_COLOR = ["black", "green", "blue", "red"];
var WS_INDEX_WIDTH = [1, 5, 10, 15];

var ST_WIDTH_CIRCLE = 0.5; // 원의 선 두께
var ST_WIDTH_MAIN_AXIS = 0.5; // Main Axis 두께
var ST_DASHARR = "2";

WR_KMA.newPlot = function(gd, data, layout, title) {
	
	CIRCLE_STEP = layout.radius; // 원의 반지름
	
	var divContainer = document.getElementById(gd);
	
	var layout_width = divContainer.offsetWidth;
	var layout_height = divContainer.offsetHeight;
	
	var centerX = layout_width/2;	// 그리기 영역의 중점 X
	//var centerY = layout_height/2;	// 그리기 영역의 중점 Y
	var centerY = layout_height * 0.4;	// 그리기 영역의 중점 Y
	
	var svgContainer = WR_SVG.addSvgElementFromJson({
		"element":"svg",
		"attr":{
			"id": "windRose",
			"width": layout_width,
			"height": layout_height,
			"border": "solid 2px #808080",
			"style" : "background:#fff"
		}
	});
	divContainer.appendChild(svgContainer);
	
	// border
	//WR_SVG.DrawRect(svgContainer, "svg_rect", 0, 0, layout_width, layout_height, "gray", 2, "white");
	
	WR_SVG.DrawTitle(svgContainer, 0, 16, "black", "font-weight:bold; font-size:16px", title);
	
	// WD Count steps
	for(var i=2; i<=CIRCLE_COUNT; i++) {
		WR_SVG.DrawCircle(svgContainer, centerX, centerY, CIRCLE_STEP*i, "gray", ST_WIDTH_CIRCLE, "transparent", ST_DASHARR);
	}
	
	// Main Axis
	WR_SVG.DrawLine(svgContainer, centerX - CIRCLE_STEP*CIRCLE_COUNT, centerY, centerX + CIRCLE_STEP*CIRCLE_COUNT, centerY, "gray", ST_WIDTH_MAIN_AXIS);
	WR_SVG.DrawLine(svgContainer, centerX, centerY - CIRCLE_STEP*CIRCLE_COUNT, centerX, centerY + CIRCLE_STEP*CIRCLE_COUNT, "gray", ST_WIDTH_MAIN_AXIS);

	WR_SVG.DrawCircle(svgContainer, centerX, centerY, CIRCLE_STEP, "black", ST_WIDTH_CIRCLE, "white");
	
	// EWSN
	WR_SVG.DrawText(svgContainer, centerX + CIRCLE_STEP*CIRCLE_COUNT + 10, centerY + 5, "black", "font-weight:bold", "E");		// E : 550, 305
	WR_SVG.DrawText(svgContainer, centerX - CIRCLE_STEP*CIRCLE_COUNT - 10*2, centerY + 5, "black", "font-weight:bold", "W");	// W : 40, 305
	WR_SVG.DrawText(svgContainer, centerX, centerY + CIRCLE_STEP*CIRCLE_COUNT + 10*2, "black", "font-weight:bold", "S", "middle");	// S : 295, 560
	WR_SVG.DrawText(svgContainer, centerX, centerY - CIRCLE_STEP*CIRCLE_COUNT - 10, "black", "font-weight:bold", "N", "middle");		// N : 295, 50

	// WS index
	var WS_index_x = centerX - CIRCLE_STEP*(CIRCLE_COUNT-2);
	var WS_index_y = centerY + CIRCLE_STEP*CIRCLE_COUNT + CIRCLE_STEP*2 + WS_INDEX_WIDTH[WS_INDEX_COUNT-1];
	var WS_index_width = CIRCLE_STEP*(CIRCLE_COUNT-1)*2;
	WS_INDEX_STEP = WS_index_width/WS_INDEX_COUNT;
	
	WR_SVG.DrawCircle(svgContainer, WS_index_x-CIRCLE_STEP, WS_index_y, CIRCLE_STEP, "black", WS_INDEX_WIDTH[0], "transparent");
	WR_SVG.DrawText(svgContainer, WS_index_x-CIRCLE_STEP, WS_index_y-5, "black", "font-weight:bold", "CALM", "middle");
	WR_SVG.DrawText(svgContainer, WS_index_x-CIRCLE_STEP, WS_index_y+12, "black", "font-weight:bold", "(%)", "middle");
	WR_SVG.DrawText(svgContainer, WS_index_x-CIRCLE_STEP, WS_index_y-CIRCLE_STEP-5, "black", "font-weight:bold", layout.legend[0], "middle");
	
	WR_SVG.DrawLine(svgContainer, WS_index_x-CIRCLE_STEP*2, WS_index_y+CIRCLE_STEP*1.9, WS_index_x + WS_index_width, WS_index_y+CIRCLE_STEP*1.9, "#D3D3D3", 26);
	for(var i=0; i<WS_INDEX_COUNT; i++) {
		WR_SVG.DrawLine(svgContainer, WS_index_x + WS_INDEX_STEP*i, WS_index_y, WS_index_x + WS_INDEX_STEP*(i+1), WS_index_y, WS_INDEX_COLOR[i], WS_INDEX_WIDTH[i]);
		WR_SVG.DrawLine(svgContainer, WS_index_x + WS_INDEX_STEP*i, WS_index_y-CIRCLE_STEP/2, WS_index_x + WS_INDEX_STEP*i, WS_index_y+CIRCLE_STEP*1.5, "black", 1, "2");
		WR_SVG.DrawText(svgContainer, WS_index_x + WS_INDEX_STEP*i, WS_index_y+CIRCLE_STEP*2, "black", "", layout.legend[i+1] );
	}
	WR_SVG.DrawText(svgContainer, WS_index_x+WS_index_width, WS_index_y+CIRCLE_STEP*2, "black", "", layout.legend[WS_INDEX_COUNT+1], "end" );
	
	// WS_CLASS Axis
	WR_SVG.DrawLine(svgContainer, centerX, centerY + CIRCLE_STEP*CIRCLE_COUNT, centerX + CIRCLE_STEP*CIRCLE_COUNT, centerY + CIRCLE_STEP*CIRCLE_COUNT, "black", 1);
	WR_SVG.DrawLine(svgContainer, centerX + CIRCLE_STEP*CIRCLE_COUNT, centerY, centerX + CIRCLE_STEP*CIRCLE_COUNT, centerY + CIRCLE_STEP*CIRCLE_COUNT, "black", 1);
	
    
    // WS_CLASS - x,y 축 Axis step & value -->
	//var WS_CLASS_max = 30;	// WS_CLASS의 마지막 값 (계산 필요)
	var WS_CLASS_max = WR_SVG.GetWsClassMax(data);
	var WS_CLASS_step = WS_CLASS_max / (CIRCLE_COUNT-1);	// 실제 그림 길이
	
	var WS_CLASS_x_y1 = centerY + CIRCLE_STEP*CIRCLE_COUNT - 5;
	var WS_CLASS_x_y2 = WS_CLASS_x_y1 + 10;
	var WS_CLASS_x_text_y =  centerY + CIRCLE_STEP*CIRCLE_COUNT + 10*2;
	
	var WS_CLASS_y_x1 = centerX + CIRCLE_STEP*CIRCLE_COUNT - 5;
	var WS_CLASS_y_x2 = WS_CLASS_y_x1 + 10;
	var WS_CLASS_y_text_x =  centerX + CIRCLE_STEP*CIRCLE_COUNT + 30;
	
	for(var i=1; i<CIRCLE_COUNT; i++) {
		WR_SVG.DrawLine(svgContainer, centerX + CIRCLE_STEP*i, WS_CLASS_x_y1, centerX + CIRCLE_STEP*i, WS_CLASS_x_y2, "black", 1);
		WR_SVG.DrawText(svgContainer, centerX + CIRCLE_STEP*i, WS_CLASS_x_text_y, "black", "", (i-1)*WS_CLASS_step, "middle");
		
		WR_SVG.DrawLine(svgContainer, WS_CLASS_y_x1, centerY + CIRCLE_STEP*i, WS_CLASS_y_x2, centerY + CIRCLE_STEP*i, "black", 1);
		WR_SVG.DrawText(svgContainer, WS_CLASS_y_text_x, centerY + CIRCLE_STEP*i + 5, "black", "", (i-1)*WS_CLASS_step, "end");
	}
	
	// WS_CLASS max Value
	WR_SVG.DrawText(svgContainer, WS_CLASS_y_text_x-20, WS_CLASS_x_text_y, "black", "", WS_CLASS_max+"%");
	
	var angle_tick = 360 / 16;
	
	if(data.length > 1) {
		for(var v=1; v<data[0].r.length-1; v++) {
			var angle = Math.radians(90 + angle_tick * (v-1));
			
			for(var c=0; c<data.length-1; c++) {
				if(data[c].WS_CLASS == WS_INDEX_VALUE[0]) continue;
				var WS_TICK = WS_INDEX_VALUE.indexOf(data[c].WS_CLASS) - 1;
				
				radius = data[c].r[v]/WS_CLASS_max * CIRCLE_STEP / 2 * (CIRCLE_COUNT-1);
				
				x1 = centerX + radius * Math.cos( angle ) - (CIRCLE_STEP + radius) * Math.cos( angle );
				y1 = centerY + radius * Math.sin( angle ) - (CIRCLE_STEP + radius) * Math.sin( angle );
				x2 = centerX - radius * Math.cos( angle ) - (CIRCLE_STEP + radius) * Math.cos( angle );
				y2 = centerY - radius * Math.sin( angle ) - (CIRCLE_STEP + radius) * Math.sin( angle );
				
				centerX = x2 + CIRCLE_STEP * Math.cos( angle );
				centerY = y2 + CIRCLE_STEP * Math.sin( angle );
				
				WR_SVG.DrawLine(svgContainer, x1, y1, x2, y2, WS_INDEX_COLOR[WS_TICK], WS_INDEX_WIDTH[WS_TICK]);
				//WR_SVG.DrawText(svgContainer, x2, y2, WS_INDEX_COLOR[c], "", data[c].r[v]);
				//WR_SVG.DrawText(svgContainer, x2, y2, WS_INDEX_COLOR[c], "", data[c].r[v] + ", " + radius );
			}
			
			centerX = layout_width/2;
			//centerY = layout_height/2;
			centerY = layout_height*0.4;
			
			//centerX = divContainer.offsetWidth/2;	// 그리기 영역의 중점 X
			//centerY = divContainer.offsetHeight/2;	// 그리기 영역의 중점 Y
		}
	}
	
	// 무풍 값 : SUM - CALM
	WR_SVG.DrawText(svgContainer, centerX, centerY+8, "black", "font-weight:bold;font-size:25", data[data.length-1].r[0], "middle");
	
	// save plot button
	var sptElem = WR_SVG.addSvgElementFromJson({
		"element": "text",
		"attr": {
			"id": "save_plot_text",
			"x": centerX + CIRCLE_STEP*(CIRCLE_COUNT+1) - 5,
			"y": 70,
			"fill": "#8FC8FF",
			"text-anchor": "end",
			"opacity": "0.0"
		}
	});
	sptElem.textContent = "이미지 저장";
	svgContainer.appendChild(sptElem);
	
	var save_plot = WR_SVG.addSvgElementFromJson({
		"element": "image",
		"attr": {
			"id": "save_plot",
			"x": centerX + CIRCLE_STEP*(CIRCLE_COUNT+1) - 30,
			"y": 30,
			"width": 30,
			"height": 30,
			"xlink:href": "/resources/js/WindRods/save_plot.svg",
			"onmouseover": "WR_SVG.downloadMouseOver('save_plot_text')",
			"onmouseout": "WR_SVG.downloadMouseOut('save_plot', 'save_plot_text')",
			"onclick": "WR_SVG.downloadImg('save_plot', 'save_plot_text')"
		}
	});
	svgContainer.appendChild(save_plot);
};

WR_SVG.downloadImg = function(id1, id2){
	document.getElementById(id1).style.opacity = "0.0";
	document.getElementById(id2).style.opacity = "0.0";
	
	var e = document.createElement('script');
	e.setAttribute('src', '/resources/js/WindRods/svg-crowbar.js');
	e.setAttribute('class', 'svg-crowbar');
	document.body.appendChild(e);
};

WR_SVG.downloadMouseOver = function(id){
	document.getElementById(id).style.opacity = "1.0";
};

WR_SVG.downloadMouseOut = function(id1, id2){
	document.getElementById(id1).style.opacity = "1.0";
	document.getElementById(id2).style.opacity = "0.0";
};

// GetWsClassMax
WR_SVG.GetWsClassMax = function(data) {
	var maxVal = 10;
	
	if(data.length > 1) {
		for(var v=1; v<data[0].r.length-1; v++) {
			maxVal = Math.max(maxVal, data[data.length-1].r[v]);
		}
	}
	
	return Math.ceil(maxVal / 10) * 10;
};

// assignAttributes
WR_SVG.assignAttributes = function(node, attrs, suspendLength){
	if(!suspendLength){
		suspendLength = 0;
	}
	
	for(var i in attrs){
		var ns = (i.substr(0,4) === 'xml:' ? NS.XML :
			i.substr(0,6) === 'xlink:' ? NS.XLINK : null);

		if(ns){
			node.setAttributeNS(ns, i, attrs[i]);
		} else {
			node.setAttribute(i, attrs[i]);
		}
	}

};

// addSvgElementFromJson
WR_SVG.addSvgElementFromJson = function(data){
	var shape = data.attr.id;

	if(shape && data.element != shape.tagName){
		shape = null;
	}

	if(!shape){
		shape = document.createElementNS(NS.SVG, data.element);
	}
	WR_SVG.assignAttributes(shape, data.attr, 100);
	return shape;
};

//DrawTitle
WR_SVG.DrawTitle = function(sCon, x, y, fill, style, text, text_anchor){
	text_anchor = typeof text_anchor !== 'undefined' ? text_anchor : "inherit";
	
	var svgElem = WR_SVG.addSvgElementFromJson({
		"element": "text",
		"attr": {
			"x": x,
			"y": y,
			"fill": fill,
			"text-anchor": text_anchor,
			"style":style
		}
	});
	svgElem.textContent = text;
	sCon.appendChild(svgElem);
};



// DrawRect
WR_SVG.DrawRect = function(sCon, id, x, y, width, height, stroke, stroke_width, fill){
	var rect = WR_SVG.addSvgElementFromJson({
		"element": "rect",
		"attr": {
			"id": id,
			"x": x,
			"y": y,
			"width": width,
			"height": height,
			"stroke": stroke,
			"stroke-width": stroke_width,
			"fill": fill
		}
	});
	sCon.appendChild(rect);
};

// DrawCircle
WR_SVG.DrawCircle = function(sCon, cx, cy, r, stroke, stroke_width, fill, stroke_dasharray){
	var svgElem = WR_SVG.addSvgElementFromJson({
		"element": "circle",
		"attr": {
			"cx": cx,
			"cy": cy,
			"r": r,
			"stroke": stroke,
			"stroke-width": stroke_width,
			"fill": fill,
			"stroke-dasharray": stroke_dasharray
		}
	});
	sCon.appendChild(svgElem);
};

// DrawLine
WR_SVG.DrawLine = function(sCon, x1, y1, x2, y2, stroke, stroke_width, stroke_dasharray){
	var svgElem = WR_SVG.addSvgElementFromJson({
		"element": "line",
		"attr": {
			"x1": x1,
			"y1": y1,
			"x2": x2,
			"y2": y2,
			"stroke": stroke,
			"stroke-width": stroke_width,
			"stroke-dasharray": stroke_dasharray
		}
	});
	sCon.appendChild(svgElem);
};

// DrawText
WR_SVG.DrawText = function(sCon, x, y, fill, style, text, text_anchor){
	text_anchor = typeof text_anchor !== 'undefined' ? text_anchor : "inherit";
	
	var svgElem = WR_SVG.addSvgElementFromJson({
		"element": "text",
		"attr": {
			"x": x,
			"y": y,
			"fill": fill,
			"text-anchor": text_anchor,
			"style":style
		}
	});
	svgElem.textContent = text;
	sCon.appendChild(svgElem);
};

// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};


// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};
