(function($){
	$(document).ready(function () {
		$('.color-picker a').click(function (event) {
			event.preventDefault();
			$(this).addClass('selected-color');
			var selectedColor = $(this).css('backgroundColor');
			changeThemeColors(selectedColor);
		});

		//$('.themes').delay(1000).animate({left: '-270px'}, 250);

		$('.panel-toggle').on('click', function() {
			var $panel = $('.themes');
			var left = -270;

			if (parseInt($panel.css('left')) == left) {
				$panel.animate({left: '0px'}, 250);
			} else if ( parseInt($panel.css('left')) == 0) {
				$panel.animate({left: '-270'}, 250);
			}
		});
	});

	function rgbToHex(a){
		a = a.replace(/[^\d,]/g,"").split(",");
		return "#" + ((1 << 24) + ( +a[0] << 16) + (+a[1] << 8) +
			+a[2]).toString(16).slice(1)
	}

	function changeThemeColors(selectedColor) {
		$('body').css('backgroundColor', selectedColor);
		$('.themes').css('color', selectedColor);
		$('.btn').css( 'color', selectedColor);
		$('.modalbtn').css( 'color', selectedColor);
		$('.modal').css( 'color', selectedColor);
		$('.ppc-progress .ppc-progress-fill ').css( 'borderColor', selectedColor);
		$('.ppc-percents').css( 'backgroundColor', selectedColor);
	}
})(jQuery);