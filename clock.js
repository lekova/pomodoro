var $ = window.$;

$(document).ready(function() {
	// var timer = 0;
	// var sessionT = 40; // default value for session
	// var breakT = 5; // default value for break
	var isOn = false;

	// function startTimer(timeLength) {
	// 	seconds = timeLength + 1;
	// 	setInterval(function tick() {
	// 		// console.log('seconds: ', seconds);
	// 		--seconds;
	// 		var secs = seconds;
	// 		secs %= 3600;
	// 		// console.log('secs: ', secs);
	// 		var mns = Math.floor(secs / 60);
	// 		secs %= 60;
	// 		var pretty = (mns < 10 ? '0' : '') + mns + ':' + (secs < 10 ? '0' : '') + secs;
	// 		console.log('pretty: ', pretty);
	// 		$('#time').html(pretty);
	// 	}, 1000);
	// }

	var intervalId;

	function startTime(seconds) {
		intervalId = setInterval(tick, 1000);
		isOn = true;
	}

	function stopTime() {
		clearInterval(intervalId);
		isOn = false;
	}

	function tick() {

		var timeStr = $('#time').html().split(':');
		console.log(timeStr);
		var elapsed = Number(timeStr[0] * 60 + Number(timeStr[1]));
		console.log('elapsed: ', elapsed);
		
		if (elapsed === 0) {
			stopTime();
			return;
		}
		
		--elapsed;
		var secs = elapsed;
		secs %= 3600;
		// console.log('secs: ', secs);
		var mns = Math.floor(secs / 60);
		secs %= 60;
		var pretty = (mns < 10 ? '0' : '') + mns + ':' + (secs < 10 ? '0' : '') + secs;
		$('#time').html(pretty);
	}
	function setTimeText() {
		var secs = Number($('#length').html()) * 60;
		console.log('secs: ', secs);
		secs %= 3600;
		// console.log('secs: ', secs);
		var mns = Math.floor(secs / 60);
		secs %= 60;
		var pretty = (mns < 10 ? '0' : '') + mns + ':' + (secs < 10 ? '0' : '') + secs;
		$('#time').html(pretty);
	}

	$('#circle').on('click', function() {
		// var time = Number($('#length').html()) * 60;
		var timeStr = $('#time').html().split(':');
		var elapsed = Number(timeStr[0] * 60 + Number(timeStr[1]));
		console.log(elapsed);
		// startTime(elapsed + 1);
	});

	$('#length-minus').on('click', function() {
		var time = Number($('#length').html());
		// timer cannot go bellow 0 min
		if (time > 0) {
			$('#length').html(Number($('#length').html()) - 1);
		}

		setTimeText();
	});

	$('#length-plus').on('click', function() {
		var time = Number($('#length').html());
		if (time < 60) {
			$('#length').html(time + 1);
		}
		setTimeText();
	});

	$('#break-minus').on('click', function() {
		var breakTime = Number($('#break').html());
		// var lengthTime =  Number($('#length').html());
		// timer cannot go bellow 0 min
		if (breakTime > 0) {
			$('#break').html(breakTime - 1);
		}
	});

	$('#break-plus').on('click', function() {
		var breakTime = Number($('#break').html());
		var lengthTime = Number($('#length').html());

		if (breakTime >= lengthTime) {
			// if break goes above work length
			// set time break time on length time
			// so the user will notice a no change on the field
			$('#break').html(lengthTime);
		} else {
			$('#break').html(breakTime + 1);
		}
	});

	$('#start-reset-btn').on('click', function() {
		console.log('start before isOn: ', isOn);
		if (isOn) {
			$('#start-reset-btn').html('Start');
			stopTime();
			$('#length').html(40);
			$('#break').html(5);
			setTimeText();
			// set timer = 0;
		} else {
			$('#start-reset-btn').html('Reset');
			startTime();
		}

		console.log('start after isOn: ', isOn);
	});

	$('#stop-btn').on('click', function() {
		console.log('STOP before isOn: ', isOn);
		isOn ? stopTime() : startTime();
		console.log('STOP after isOn: ', isOn);
	});
});
