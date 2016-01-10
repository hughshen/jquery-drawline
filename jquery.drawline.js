/*
 * jQuery Drawline Plugin
 * Copyright (c) 2016 Hugh Shen
 * https://github.com/hughshen/jquery-drawline
 */
;(function($, undefined) {
	
	$.drawline = function(outer, center, options) {
		var settings = $.extend({}, $.drawline.defaults, options || {}),
			outer = outer.eq(0),
			center = center.eq(0),
			centerParent = center.offsetParent().length ? center.offsetParent().eq(0) : $('body'),
			lineElement = document.createElement('div'),
			outerInfo = {},
			centerInfo = {},
			lineInfo = {};

		outerInfo = getElementCenterPoint(outer);
		centerInfo = getElementCenterPoint(center);
		lineInfo.width = getDistanceBetweenTwoElements(outerInfo, centerInfo);
		lineInfo.deg = getLineElementRotateDeg(outerInfo, centerInfo, settings.lineWidth);

		// console.log(outerInfo);
		// console.log(centerInfo);
		// console.log(lineInfo);

		// start draw line
		center.after(lineElement);

		$(lineElement).addClass($.drawline.defaults.lineClass);
		$(lineElement).addClass(settings.lineClass);
		$(lineElement).css({
			'width' : lineInfo.width + 'px',
			'height' : settings.lineWidth + 'px',
			'position': 'absolute',
			'left': centerInfo.x - centerParent.offset().left,
			'top': centerInfo.y - centerParent.offset().top,
			'background': settings.lineColor,
			'transform': 'rotate(' + lineInfo.deg + 'deg)',
			'-webkit-transform': 'rotate(' + lineInfo.deg + 'deg)',
			'-ms-transform': 'rotate(' + lineInfo.deg + 'deg)',
			'-moz-transform': 'rotate(' + lineInfo.deg + 'deg)',
			'transform-origin': '0',
			'-webkit-transform-origin': '0',
			'-ms-transform-origin': '0',
			'-moz-transform-origin': '0',
			'z-index': settings.lineZIndex,
		});
	};

	// default settings
	$.drawline.defaults = {
		lineWidth: 1,
		lineClass: 'thin-line',
		lineColor: '#000',
		lineZIndex: -1,
	};

	// functions
	function getElementCenterPoint(ele) {
		var point = {};
		point.x = ele.offset().left + parseInt(ele.width() / 2);
		point.y = ele.offset().top +  parseInt(ele.height() / 2);
		return point;
	}

	function getDistanceBetweenTwoElements(outerInfo, centerInfo) {

		return Math.sqrt(Math.pow(Math.abs(outerInfo.x - centerInfo.x), 2) + Math.pow(Math.abs(outerInfo.y - centerInfo.y), 2));
	}

	function getLineElementRotateDeg(outerInfo, centerInfo, lineWidth) {
		var deg = Math.round(Math.atan((Math.abs(outerInfo.y - centerInfo.y)) / (Math.abs(outerInfo.x - centerInfo.x))) * 180 / 3.14);
		// adjust deg
		var lineDeg = parseInt(lineWidth) / 10;
		if (outerInfo.x < centerInfo.x && outerInfo.y <= centerInfo.y) {
			deg += 180 + lineDeg;
		}else if (outerInfo.x < centerInfo.x && outerInfo.y > centerInfo.y) {
			deg = 180 - deg + lineDeg;
		}else if (outerInfo.x >= centerInfo.x && outerInfo.y < centerInfo.y) {
			deg = 360 - deg - lineDeg;
		} else {
			deg = deg - lineDeg;
		}
		return deg;
	}
})(jQuery);