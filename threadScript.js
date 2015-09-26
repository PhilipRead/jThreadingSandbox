
// Job class
// Object used to store Job components in a multi-threaded environment.
// @field - dataBuffer: Any JavaScript object that holds all data for a Job.
// @field - intervalRef: Reference to the interval task returned by setInterval.
// @function - start: Any javascript with no arguments that initiates the job.
function Job(initialData) {
	this.dataBuffer = initialData;
	this.intervalRef = null;
	this.start = null;
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
	var i;
	for(i = 0; i < jobs.length; i++) {
		jobs[i].start();
	}
}

// queuePrint function
// Sets up a scrolling print job and pushed to jobs array.
// @param - outString: The string to be printed.
// @param - printDiv: The html container to print the string to.
// @param - speed: The number of milliseconds between character printing.
queuePrint = function(outString, printDiv, speed) {
	var textData = new TextData(outString, printDiv, speed);
	var curJob = new Job(textData);
	curJob.start = function() { 
		var jobData = this.dataBuffer;
		if(jobData.output.length > 0) {
			var curOutput = jobData.container.text();
			jobData.container.html(curOutput + jobData.output[0]);
			jobData.output = jobData.output.slice(1);
			this.intervalRef = setInterval(scrollPrint, jobData.outputSpeed, this);
		}
	};
	jobs.push(curJob);
}

// scrollPrint function
// Prints one character of the string contained in the job dataBuffer
// and clears the task when the string is empty.
// @param - job: The job object that contains the string and intervalRef.
scrollPrint = function(job) {
	var jobData = job.dataBuffer;
	if(jobData.output.length > 0) {
		var curOutput = jobData.container.text();
		jobData.container.html(curOutput + jobData.output[0]);
		jobData.output = jobData.output.slice(1);	
	}
	else {
		clearInterval(job.intervalRef);
	}
}

