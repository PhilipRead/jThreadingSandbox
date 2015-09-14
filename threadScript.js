
// Job class
// Object used to store Job components in a multi-threaded environment.
// @field - dataBuffer: Any JavaScript object that holds all data for a Job.
// @function - nextTask: Any JavaScript function that will perform the next
//		portion of work for the Job. Ideally this task should take no
//		longer than a half of second to complete its task. This is to
//		ensure that the system does not get bogged down in one task.
function Job(initialData) {
	this.dataBuffer = initialData;
	this.nextTask = null;
}

// TextData class
// Object used to store all the Job data for a string printing job.
// @field - output: The string to print.
// @filed - container: The jQuery html container to print the string to.
// @field - outputSpeed: An integer representing the number of milliseconds
//		between character prints.
function TextData(stringToPrint, htmlContainer, speedToPrint) {
	this.output = stringToPrint;
	this.container = htmlContainer;
	this.outputSpeed = speedToPrint;
}

// execute function
// Function executes all the queued jobs
execute = function() {
	int i;
	for(i = 0; i < jobs.length; i++) {
		jobs[i].nextTask();
	}
	jobs = [];
}

queuePrint = function(outString, printDiv, speed) {
	var textData = new TextData(outString, printDiv, speed);
	var curJob = new Job(textData);
	var curJob.nextTask = function() {
		var jobData = curJob.dataBuffer;
		if(jobData.output.length > 0) {
			var curOutput = jobData.container.text();
			jobData.container.html(curOutput + jobData.output[0]);
			jobData.output = jobData.output.slice(1);
		}
	};
	jobs.push(curJob);
};

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

