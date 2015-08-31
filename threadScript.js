var buffers = [];
var containers = [];
var jobs

printOutput = function(output, container, speed, buffInd) {
	buffers[buffInd] = output;
	containers[buffInd] = container;
	outputInterval = setInterval(VisualUtils.scrollPrint, speed);
};

scrollPrint = function() {
	if(outputTxt) {
		var curOutput = lastDiv.text();
		lastDiv.html(curOutput + outputTxt[0]);
		outputTxt = outputTxt.slice(1);
	}
	else {
		clearInterval(outputInterval);
		VisualUtils.returnControl();
	}
};