$(document).ready(function(){
	function writeMessage(canvas, message) {
		var context = canvas.getContext('2d');
		context.clearRect(0, 0, 200, 20);
		context.font = '12pt Calibri';
		context.fillStyle = 'black';
		context.fillText(message, 5, 15);
	}
	function getMousePos(canvas, e) {
		var rect = canvas.getBoundingClientRect();
		return {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top
		};
	}
	function eventCoordDisplay()
	{
		$('#main-canvas').on('mousemove',function(e) {
			var mousePos = getMousePos(this, e);
			var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
			writeMessage(this, message);
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
		$('#main-canvas').off('click');
		appendNewInstruction('Now use the given tools to draw a layout of your house');
	}
	function eventRectFormSubmit()
	{
		$("#rect-form").on("submit",function(event){
		event.preventDefault();
		data = $(this).serializeArray();
		var length = data[0]['value'];
		var width = data[1]['value'];
		var unit = data[2]['value'];
		if(unit=='meters')
		{
			length = length * meters;
			width = width * meters;
		}
		if(unit=='feet')
		{
			length = length * feet;
			width = width * feet;
		}
		$('#main-canvas').drawRect({
				strokeStyle: '#c33',
				strokeWidth: 1,
				x: 100, y: 100,
				width: length,
				height: width
		});
		console.log($("#main-canvas")[0].getContext('2d'));
		return false;
		});
	}
	function eventDrawStartPoint()
	{
		$('#main-canvas').on('click',function(e){
			mousePos = getMousePos(this,e);
			drawStartPoint(mousePos);	
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
				
			});
		});
	}
	function eventUnitReselect()
	{
		
	}
	function eventRunAtStart()
	{
		eventCoordDisplay();
		eventRectFormSubmit();
		eventDrawStartPoint();
		eventFirstUnitSelect();
	}
	var feet = 10;
	var meters = feet*3.28084;
	eventRunAtStart();
});