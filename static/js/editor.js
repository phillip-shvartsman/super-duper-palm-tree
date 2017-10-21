$(document).ready(function(){
	var feet = 10;
	var meters = feet*3.28084;
	var csrftoken = getCookie('csrftoken');
	var currentPoint = [];
	var pointHistory = [];
	var tempPoint = [];
	var drawTemp = false;
	var layerIndex = 0;
	var unit = "1";
	var boardsize = "1";
	
	var tempTextColor = "#008000"
	var tempLineColor = "#FF0000"
	var finalTextColor = "#0000FF";
	var finalLineColor = "#000000";
	function drawTempFigures(mousePos)
	{
		x = mousePos.x;
		y = mousePos.y;
		var toPrint;
		var feet;
		var inches;
		$('#main-canvas').removeLayer('temp-line');
		$('#main-canvas').removeLayer('temp-text');
		if((currentPoint.x<x+10 && currentPoint.x>x-10))
		{
			if(unit=='m')
			{
				toPrint = Math.abs(mousePos.y-currentPoint.y)/10 + 'meters';
			}
			if(unit=='f')
			{
				feet = Math.floor(Math.abs(mousePos.y-currentPoint.y)/12);
				inches = Math.floor(Math.abs(mousePos.y-currentPoint.y)-feet*12);
				toPrint = feet+"'"+inches+'"';
			}
			
			$('#main-canvas').addLayer({
				type : 'line',
				strokeStyle: '#000',
				strokeWidth: 3,
				name : 'temp-line',
				fillStyle: '#c33',
				x1: currentPoint.x, y1: currentPoint.y,
				x2: currentPoint.x, y2: mousePos.y,
			});
			$('#main-canvas').addLayer({
				type : 'text',
				fillStyle: '#9cf',
				strokeStyle: '#25a',
				strokeWidth: 2,
				name : 'temp-text',
				x: currentPoint.x+10, y: mousePos.y,
				fontSize: 12,
				fontFamily: 'Calibri, sans-serif',
				text: toPrint
			});
			tempPoint = {x:currentPoint.x,y:mousePos.y};
		}
		else if(currentPoint.y<y+10 && currentPoint.y>y-10)
		{
			if(unit=='m')
			{
				toPrint = Math.abs(mousePos.x-currentPoint.x)/10 + 'meters';
			}
			if(unit=='f')
			{
				feet = Math.floor(Math.abs(mousePos.x-currentPoint.x)/12);
				inches = Math.floor(Math.abs(mousePos.x-currentPoint.x)-feet*12);
				toPrint = feet+"'"+inches+'"';
			}
			$('#main-canvas').addLayer({
				type : 'line',
				strokeStyle: '#000',
				strokeWidth: 3,
				name : 'temp-line',
				fillStyle: '#c33',
				x1: currentPoint.x, y1: currentPoint.y,
				x2: mousePos.x, y2: currentPoint.y,
			});
			$('#main-canvas').addLayer({
				type : 'text',
				fillStyle: '#9cf',
				strokeStyle: '#25a',
				strokeWidth: 2,
				name : 'temp-text',
				x: mousePos.x, y: (currentPoint.y - 10),
				fontSize: 12,
				fontFamily: 'Calibri, sans-serif',
				text: toPrint
			});
			tempPoint = {x:mousePos.x,y:currentPoint.y};
		}
	}
	function writeMessage(canvas, message,mousePos) {
		$("#main-canvas").removeLayer('coordinates');
		$('#main-canvas').addLayer({
			  type : 'text',
			  fillStyle: '#9cf',
			  strokeStyle: '#25a',
			  strokeWidth: 2,
			  name : 'coordinates',
			  x: 80, y: 15,
			  fontSize: 12,
			  fontFamily: 'Calibri, sans-serif',
			  text: message
		});
		if(drawTemp)
		{
			drawTempFigures(mousePos);
		}
		$('#main-canvas').drawLayers();
	}
	function getMousePos(canvas, e) {
		var rect = canvas.getBoundingClientRect();
		return {
			x: Math.floor(e.clientX - rect.left),//Floored to deal with Matt's issue
			y: Math.floor(e.clientY - rect.top)
		};
	}
	function eventCoordDisplay()
	{
		$('#main-canvas').on('mousemove',function(e) {
			var mousePos = getMousePos(this, e);
			var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
			writeMessage(this, message,mousePos);
		});
	}
	function appendNewInstruction(message)
	{
		$('#instruction').empty();
		$('#instruction').append('<h3>'+message+'</h3>');
	}
	function drawStartPoint(mousePos)
	{
		$('#main-canvas').addLayer({
			type : 'rectangle',
			name : 'startPoint',
			fillStyle: '#c33',
			x: mousePos.x, y: mousePos.y,
			width: 5,
			height: 5
		}).drawLayers();
	}
	function eventRectFormSubmit()
	{
	}
	function eventDrawStartPoint()
	{
		$('#main-canvas').on('click',function(e){
			mousePos = getMousePos(this,e);
			drawStartPoint(mousePos);
			$('#main-canvas').off('click');
			appendNewInstruction('Now use the given tools to draw a layout of your house');
			currentPoint = mousePos;
			drawTemp = true;
			pointHistory.push(mousePos);
			eventNewVertex();	
		});
	}
	function eventClearCanvas()
	{
		$("#clear-canvas").on("click",function(event){
			$('#main-canvas').clearCanvas()
		});	
	}
	function eventFirstUnitSelect()
	{
		$("#unit-select").on('click',function(){
			$("#main-container").fadeIn('slow',function(){
				var store = $(".active").attr('name');
				unit = store;
			});
		});
	}
	function eventSendToServer()
	{
		url = 'http://localhost:8000/process/';
		$("#send-data-to-server").on("click",function(){
			var results = pointHistory.reduce(function(result, item, index, array) {
			  result[index] = item; //a, b, c
			  return result;
			}, {})
			results = JSON.stringify(results);
			data = {text:results,unit:unit,boardsize:boardsize};
			$.ajax({
				url : url,
				headers: {'X-CSRFToken':csrftoken},
				type: "POST",
				data : data,
				dataType: 'json',
				success:function(data, textStatus, jqXHR){
					console.log(data);
				},
				error: function(jqXHR, textStatus, errorThrown){
			    	 console.log(textStatus);
				}
			});
		});
	}
	function eventUnitReselect()
	{
		
	}
	function eventNewVertex()
	{
		$('#main-canvas').on('click',function(e){
			console.log(pointHistory);
			layerIndex += 1;
			currentPoint = tempPoint;
			pointHistory.push(tempPoint);
			$('#main-canvas').setLayer('temp-line',{
				name: 'line' + layerIndex,
				strokeStyle: '#c33'
			});
			$('#main-canvas').setLayer('temp-text',{
					name: 'text' + layerIndex,
			});
			
			$('#main-canvas').drawLayers();
			if((currentPoint.x == pointHistory[0].x) && (currentPoint.y == pointHistory[0].y))
			{
				alert("!");
				$('#main-canvas').off('click');
				$('#main-canvas').off('mousemove');
				appendNewInstruction('Now choose the board size that you have');
				if(unit=='f')
				{
					$("#board-size-form-feet").fadeIn('slow',function(){});
				}
				if(unit=='m')
				{
					$("#board-size-form-meters").fadeIn('slow',function(){});
				}
			}
		});
	}
	function eventRunAtStart()
	{
		eventCoordDisplay();
		eventRectFormSubmit();
		eventDrawStartPoint();
		eventFirstUnitSelect();
		eventSendToServer();
	}
	
	function getCookie(name) {
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
	eventRunAtStart();
});