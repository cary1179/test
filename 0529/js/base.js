/*
* 相关插件
*/

/* = 下拉 = */
$.fn.drop = function(arg, direction, callback) {
	var _pop = $(arg), direction = direction || "down", callback = callback || $.noop, _this = this;
	pos = {
		top: this.offset().top,
		left: this.offset().left
	}, posArray = [this.offset().top, this.offset().left];

	switch (direction) {
		case "left": {
			if(pos.left === posArray[1]) pos.left -= _pop.width();
			break;
		}
		case "right": {
			pos.left += this.width();
			break;
		}
		case "top": {
			pos.top -= _pop[0].offsetHeight;
			break;
		}
		case "down": {
			pos.top += this.height();
			break;
		}
	}

	_pop.show().css({
		position: "absolute",
		left: pos.left,
		top: pos.top
	});
	$(_this).addClass("cur");

	_pop.hover(function() {
		
	}, function() {
		$(this).hide();
		$(_this).removeClass("cur");
		callback();
	});

	_this.hover(function() {

	}, function(e) {
		var show = $(e.toElement)[0] == _pop[0] || $.inArray(_pop[0], $(e.toElement).parents("div")) !== -1;
		if(!show) {
			_pop.hide();
			$(_this).removeClass("cur");
		}
	});
}

/* 模拟select */
$.fn.agSelect = function(arg) {
	var target = $(arg), _this = this;
	target.click(function(e) {
		if(e.target.tagName == "A") {
			var tar = e.target, c;
			c = tar.innerHTML;
			tar.innerHTML = _this[0].innerHTML;
			_this[0].innerHTML = c;
		}
	});
}
