/**
 * @description: 轮播器JS
 * @Date: 20150608
 * @rely: 依赖jQuery, IE依赖jQuery v1版本
 * @attention: 注意事项：elem是ul的外层，time要大于1秒，toggle的对象要是一系列a标签
 */
define(["touch"], function(touch) {
	function Stage(obj) {
		return new stage.prototype.init(obj);
	}
	function stage() {}
	stage.prototype = {
		contructor: stage,
		init: function(obj) {
			var self = this;
			self.initDom(obj);
			setInterval($.proxy(function() {
				// self.moveTo(++self.index);
			}, self), self.time);

			if($.isMobile()) {
				var tap = new touch();
				tap.init({
					elem: ".stage ul"
				});
				tap.left(function() {
					self.moveTo(-1);
				});
				tap.right(function() {
					self.moveTo(1);
				});
			}

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
				 this.w = this.elem.width(); // 容器宽度
			  this.time = this.opt.time;
			 this.index = this.opt.index;
			 this.mTime = 100; // 动画时长
			this.moving = false; // 是否正在移动

			this.ul.css({
				width: this.w,
				height: this.li.height(),
				position: "relative",
				transition: "transform " + this.mTime/1000 + "s linear"
			});
			this.li.css({
				position: "absolute",
				top: 0,
				width: this.w,
				zIndex: -1
			});
			this.formatLayout();
		},
		/**
		 * 移动整个容器
		 * dir means: 决定往哪个方向偏移, '-1' 指左, '1' 指右
		 */
		moveTo: function(dir) {
			if(!this.moving) {
				var self = this, dtd = $.Deferred();
				self.moving = true;
				self.index = self.index - dir;
				index = self.index % self.length;
				self.index = index<0 ? (index+5) : index;
				self.ul.css({
					transform: "translateX("+dir*self.w+"px)",
					webkitTransition: "-webkit-transform " + this.mTime/1000 + "s linear",
					transition: "transform " + this.mTime/1000 + "s linear"
				});
				self.dots && self.dots.eq(index).addClass("cur").siblings().removeClass("cur");

				function format() {
					self.formatLayout();
					dtd.resolve();
				}
				dtd.promise(format);
				setTimeout(format, self.mTime+100);
				format.done(function() {
					self.moving = false;
				});
			}
		},
		/**
		 * 重置所有li的位置
		 */
		formatLayout: function() {
			var current = this.li.eq(this.index),
				prev	= this.index!==0 ? current.prev() : this.li.last(),
				next	= this.index!==this.length-1 ? current.next() : this.li.first();
			this.ul.css({
				transform: "translateX(0)",
				transition: "none"
			});
			this.li.css({
				transform: "translateX(0)",
				zIndex: -1
			});
			prev.css("transform", "translateX("+(-this.w)+"px)");
			next.css("transform", "translateX("+this.w+"px)");
			$.each([current, prev, next], function(i, $this) {
				$this.css("z-index", 1);
			});
		},
		toggle: function(arg) { // 轮播目录
			var self = this;
			self.toggleInit(arg);
			return this;
		},
		toggleInit: function(arg) {
			var self = this;
			$(arg).css("z-index", 2)
			self.dots = $(arg).children(); // 所有的小点
			self.dots.eq(self.index).addClass("cur").siblings().removeClass("cur");
		}
	}
	stage.prototype.init.prototype = stage.prototype;

	return Stage;
});


/* 轮播器实例 */
// $(function() {
// 	Stage({
// 		elem: ".stage",
// 		time: 5000, // >1000
// 		width: document.body.clientWidth
// 	}).onDir({
// 		left: "#left",
// 		right: "#right"
// 	}).toggle(".stagedot");
// });
