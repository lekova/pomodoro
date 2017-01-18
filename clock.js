$(document).ready(function () {

	var isTimerStarted = false;
	var isBreak = false;
	var isInitial = true;
	var intervalId;
	var value = 0;

	function stopTime() {
		clearInterval(intervalId);
		isTimerStarted = false;
	}

	function tick() {
		var timeStr = $('#time').html().split(':');
		var elapsed = Number(timeStr[0] * 60 + Number(timeStr[1]));

		if (elapsed === 0) {
			stopTime();
			if (isInitial) {
				isBreak = true;
				isInitial = false;
			} else {
				isBreak = isBreak ? false : true;
			}
			isBreak ? setModalBreak() : setModalTime();
			audioElement.play();
			$('#myModal').modal();
			return;
		}

		--elapsed;
		var secs = elapsed;
		secs %= 3600;
		var mns = Math.floor(secs / 60);
		secs %= 60;
		var pretty = (mns < 10 ? '0' : '') + mns + ':' + (secs < 10 ? '0' : '') + secs;

		var percent;
		if(isBreak) {
			percent = Math.round((elapsed * 100) / Number($('#break').html() * 60),1);

		} else {
			percent = Math.round((elapsed * 100) / Number($('#length').html() * 60),1);
		}

		value = 100 - percent;

		addValue = $('#progress_bar').val(value);

		$('.progress-value').html(value + '%');
		var $ppc = $('.progress-pie-chart'),
			deg = 360 * value / 100;
		if (value < 50) {
			$ppc.removeClass('gt-50');
		}
		else if (value > 50) {
			$ppc.addClass('gt-50');
		}

		$('.ppc-progress-fill').css('transform', 'rotate(' + deg + 'deg)');
		$('.ppc-percents span').html(value + '%');

		$('#time').html(pretty);
	}

	function setTimeText() {
		var secs = isBreak ? Number($('#break').html()) * 60 : Number($('#length').html()) * 60;
		secs %= 3600;
		var mns = Math.floor(secs / 60);
		secs %= 60;
		var pretty = (mns < 10 ? '0' : '') + mns + ':' + (secs < 10 ? '0' : '') + secs;
		$('#time').html(pretty);
	}

	function setModalBreak() {
		$('#modal-title-text').html('It\'s time to take a break');
		$('#modal-body-text').html('For ' + $('#break').html() + ' minutes');
	}

	function setModalTime() {
		$('#modal-title-text').html('It\'s time to start work');
		$('#modal-body-text').html('For ' + $('#length').html() + ' minutes');
	}

	function reset() {
		stopTime();
		$('#length').html(25);
		$('#break').html(5);
		setTimeText();
		isBreak = false;
		isTimerStarted = false;
		$('#session').html('WORK');
		$('#time').html('25:00');
		$('.ppc-progress-fill').css('transform', 'rotate(0deg)');
		$('.ppc-percents span').html('0%');
		$('#pbar').removeClass('gt-50');
	}

	$('#length-minus').on('click', function () {
		var time = Number($('#length').html());
		// timer cannot go bellow 0 min
		if (time > 0) {
			$('#length').html(Number($('#length').html()) - 1);
		}
		setTimeText();
	});

	$('#length-plus').on('click', function () {
		var time = Number($('#length').html());
		if (time < 60) {
			$('#length').html(time + 1);
		}
		setTimeText();
	});

	$('#break-minus').on('click', function () {
		var breakTime = Number($('#break').html());
		// var lengthTime =  Number($('#length').html());
		// timer cannot go bellow 0 min
		if (breakTime > 0) {
			$('#break').html(breakTime - 1);
		}
	});

	$('#break-plus').on('click', function () {
		var breakTime = Number($('#break').html());
		var lengthTime = Number($('#length').html());

		if (breakTime >= lengthTime) {
			// if break goes above work length, set time break time on length time
			// so the user will notice a no change on the field
			$('#break').html(lengthTime);
		} else {
			$('#break').html(breakTime + 1);
		}
	});

	$('#start-btn').on('click', function () {
		if (!isTimerStarted) {
			intervalId = setInterval(tick, 1000);
			isBreak = false;
			isTimerStarted = true;
		}
	});

	$('#stop-btn').on('click', function () {
		stopTime();
	});

	$('#reset-btn').on('click', function () {
		reset();
	});

	$('#modal-btn-ok').on('click', function () {
		if (isBreak) {
			$('#time').html(formatNumber(Number($('#break').html())) + ':00');
			$('#session').html('BREAK');
		} else {
			$('#time').html(formatNumber(Number($('#length').html())) + ':00');
			$('#session').html('WORK');
		}

		clearInterval(intervalId);
		intervalId = setInterval(tick, 1000);
	});

	$('#modal-btn-cancel').on('click', function () {
		reset();
	});

	var audioElement = document.createElement('audio');
	audioElement.setAttribute('src', 'alarm.mp3');

	function formatNumber(number) {
		return number < 10 ? '0' + number : number;
	}
});
