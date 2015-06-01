/* = 轮播器 = */

function Stage(obj) {
	return new stage.prototype.init(obj);
}
function stage() {}
stage.prototype = {
	constructor: "stage",
	option: {
		elem: null,
		time: 5000,
		controller: {
			left: "#left",
			right: "#right"
		}
	},
	curLeft: 0,
	length: 0,
	init: function(obj) {
		$.extend(this.option, obj);
		this.length = $(this.option.elem).find("li").length;

		var left = $(this.option.controller.left), right = $(this.option.controller.right),
			_this = this, maxLength = window.screen.width*(this.length-1);
		
			
		left.on("click", function() {
			_this.curLeft -= window.screen.width;
			_this.curLeft = _this.curLeft < -maxLength ? 0 : _this.curLeft;
			_this.set(_this.curLeft);
		});
		right.on("click", function() {
			_this.curLeft += window.screen.width;
			_this.curLeft = _this.curLeft > 0 ? -maxLength : _this.curLeft;
			_this.set(_this.curLeft);
		});

		setInterval(function() {
			_this.curLeft -= window.screen.width;
			_this.curLeft = _this.curLeft < -maxLength ? 0 : _this.curLeft;
			_this.set(_this.curLeft);
		}, this.option.time);
	},
	set: function(left) {
		var _ul = $(this.option.elem);
		_ul.animate({
			left: left + "px"
		});
	}
}
stage.prototype.init.prototype = stage.prototype;