/**
 * @description: 轮播器JS
 * @Date: 20150608
 * @rely: 依赖jQuery, IE依赖jQuery v1版本
 * @attention: 注意事项：elem是ul的外层，time要大于1秒，toggle的对象要是一系列a标签
 */

function Stage(obj) {
	return new stage.prototype.init(obj);
}
function stage() {}
stage.prototype = {
	contructor: stage,
	init: function(obj) {
		this.initDom(obj);
		setInterval($.proxy(function() {
			this.moveTo(++this.index);
		}, this), this.time);
	},
	initDom: function(obj) {
		var opt = {
			elem: $(".J_stage"),
			index: 0,
			time: 5000
		};
		this.opt = $.extend(opt, obj);

		  this.elem = $.type(this.opt.elem) == "string" ? $(this.opt.elem) : this.opt.elem;
			this.ul = this.elem.find("ul");
			this.li = this.ul.find("li");
		this.length = this.li.length;
			 this.w = this.elem.width();
		  this.time = this.opt.time;
		 this.index = this.opt.index;

		this.ul.css({
			width: this.w*this.length,
			position: "relative",
			left: -this.w*this.index
		});
		this.li.width(this.w);
	},
	moveTo: function(index) { // moving the ul
		index = index % this.length;
		this.index = index<0 ? (index+5) : index;
		this.ul.animate({left: -this.w*this.index}, 750);
		this.dots && this.dots.eq(index).addClass("cur").siblings().removeClass("cur");
	},
	onDir: function(tapObj) { // define which direction to move
		if(tapObj){
			$.extend(this, {
				leftDom: $(tapObj.left),
				rightDom: $(tapObj.right)
			});
			this.leftDom.on("click", $.proxy(function() {
				this.moveTo(++this.index);
			}, this));
			this.rightDom.on("click", $.proxy(function() {
				this.moveTo(--this.index);
			}, this));
		}
		return this;
	},
	toggle: function(arg) { // 轮播目录
		var self = this;
		self.toggleInit(arg);
		self.dots.on("click", function(e) {
			$(this).addClass("cur").siblings().removeClass("cur");
			self.moveTo($(this).index());
		});
		return this;
	},
	toggleInit: function(arg) {
		var self = this;
		self.dots = $(arg).children(); // 所有的小点
		self.dots.eq(self.index).addClass("cur").siblings().removeClass("cur");
	}
}
stage.prototype.init.prototype = stage.prototype;

/* 轮播器实例 */
$(function() {
	Stage({
		elem: ".stage",
		time: 5000, // >1000
		width: document.body.clientWidth
	}).onDir({
		left: "#left",
		right: "#right"
	}).toggle(".stagedot");
});
