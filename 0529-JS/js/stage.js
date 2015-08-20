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
		$(this.option.elem).find("li").width(1);

		var left = $(this.option.controller.left), right = $(this.option.controller.right), // 左右控制器
		_ul = $(this.option.elem), _li = $(this.option.elem).find("li"), _this = this; // ul, li
		this.length = _li.length; // banner图数量
		this.windowW = _ul.parent().width(); // 窗口大小
		this.maxLength = this.windowW*(_li.length-1); // 最大滑动距离

		_ul.width(this.windowW*this.length);
		_ul.css("left", 0);
		_li.width(this.windowW);
	
		left.on("click", $.proxy(this.left, this));
		right.on("click", $.proxy(this.right, this));
		setInterval($.proxy(this.left, this), this.option.time);
	},
	set: function(left) {
		var _ul = $(this.option.elem);
		_ul.animate({
			left: left + "px"
		});
	},
	left: function() {
		this.curLeft -= this.windowW;
		this.curLeft = this.curLeft < -this.maxLength ? 0 : this.curLeft;
		this.set(this.curLeft);
	},
	right: function() {
		this.curLeft += this.windowW;
		this.curLeft = this.curLeft > 0 ? -this.maxLength : this.curLeft;
		this.set(this.curLeft);
	}
}
stage.prototype.init.prototype = stage.prototype;