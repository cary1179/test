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
			self.autoPlay();
			// document.hidden && self.pause();

			if($.isMobile()) {
				var tap = this.tap = new touch();
				tap.init({
					elem: ".stage ul",
					allowMoving: true
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
				time: 1000
			};
			this.opt = $.extend(opt, obj);

			  this.elem = $.type(this.opt.elem) == "string" ? $(this.opt.elem) : this.opt.elem;
				this.ul = this.elem.find("ul");
				this.li = this.ul.find("li");
			this.length = this.li.length;
				 this.w = this.elem.width(); // 容器宽度
			  this.time = this.opt.time;
			 this.index = this.opt.index;
			 this.mTime = 200; // 动画时长
			this.moving = false; // 是否正在移动

			this.ul.css({
				width: this.w,
				height: this.li.height(),
				position: "relative",
				webkitTransition: "-webkit-transform " + this.mTime/1000 + "s linear"
			});
			this.li.css({
				position: "absolute",
				top: 0,
				width: this.w,
				display: "none"
			});
			this.formatLayout();
		},
		/**
		 * 移动整个容器
		 * dir means: 决定往哪个方向偏移, '-1' 指左, '1' 指右
		 */
		moveTo: function(dir) {
			if(!this.moving) {
				var self = this;

				self.moving = true;			  // 正在运动中
				self.pause();				  // 暂停自动轮播
				self.tap.allowMoving = false; // 运动中不允许触屏滑动
				self.index = self.index - dir;
				index = self.index % self.length;
				self.index = index<0 ? (index+self.length) : index;

				self.ul.css({
					webkitTransform: "translateX("+dir*self.w+"px)",
					webkitTransition: "-webkit-transform " + this.mTime/1000 + "s linear"
				});
				self.dots && self.dots.eq(index).addClass("cur").siblings().removeClass("cur");

				setTimeout(function() {
					self.formatLayout(function () {
						this.moving = false;			// 不在运动中
						this.autoPlay();				// 重启自动轮播
						this.tap.allowMoving = true;	// 不在运动中，允许触屏滑动
					});
				}, self.mTime+100);
			}
		},
		/**
		 * 重置所有li的位置
		 */
		formatLayout: function(callback) {
			var current = this.li.eq(this.index),
				prev	= this.index!==0 ? current.prev() : this.li.last(),
				next	= this.index!==this.length-1 ? current.next() : this.li.first();
			this.ul.css({
				webkitTransform: "translateX(0)",
				webkitTransition: "none"
			});
			this.li.css({
				webkitTransform: "translateX(0)",
				display: "none"
			});
			prev.css("webkitTransform", "translateX("+(-this.w)+"px)");
			next.css("webkitTransform", "translateX("+this.w+"px)");
			$.each([current, prev, next], function(i, $this) {
				$this.css("display", "block");
			});

			callback && callback.call(this, null);
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
		},
		autoPlay: function() {
			var self = this;
			self.timer && clearInterval(self.timer);
			self.timer = setInterval(function () {
				self.moveTo(-1);
			}, self.time);
		},
		pause: function() {
			clearInterval(this.timer);
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
