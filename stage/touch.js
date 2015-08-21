/**
 * touch插件
 * @todo:
 *		1、各个方向执行不同的方法
 * 		2、计算滑动距离
 * 		3、to be continued ..
 */

define([], function() {

	/**
	* 		 e: event
	* 		xy: "original" || "vertical"
	* 	   dir: "-1" =>  left or up
	*	    	 "1" => right or down
	* callback: fn回调函数	
	*/
	var dirCallback = function(e, xy, dir, callback) {
		var touches = e.originalEvent.touches[0],
			range = xy=="original" ? touches.clientX-this.startX : touches.clientY-this.startY,
			moving = this.moving(range);
		moving.done(function() {
			range*dir > 0 && callback.call(this, range);
		}).fail($.noop);
		return range;
	}

	function touch() {}

	touch.prototype = {
		constructor: touch,
		init: function(opt) {
			var option = {
				elem: window
			}
			this.opt = $.extend(option, opt);
			this.elem = $.type(this.opt.elem)=="string" ? $(this.opt.elem) : this.opt.elem;
			this.allowMoving = this.opt.allowMoving || true; // 当前是否允许跟随滑动

			this.initFirstTouch(this.opt);
		},
		initFirstTouch: function() {
			var self = this;
			this.elem.on("touchstart", function(e) {
				e.preventDefault();
				var touches = e.originalEvent.touches[0];
				self.startX = touches.clientX;
				self.startY = touches.clientY;
			});
		},
		moving: function(range) {
			var dtd = $.Deferred();
			if(this.allowMoving) { // 可跟随滑动
				this.elem.css("-webkit-transform", "translate3d("+range+"px, 0, 0)");
				this.elem.on("touchend", function() {
					dtd.resolve();
				});
			}else { // 不可跟随滑动(doing nothing..)
				dtd.reject();
			}
			return dtd.promise();
		},
		left: function(fn) {
			var self = this;
			this.elem.on("touchmove", function(e) {
				e.preventDefault();
				var range = dirCallback.call(self, e, "original", -1, fn);
			});
		},
		right: function(fn) {
			var self = this;
			this.elem.on("touchmove", function(e) {
				e.preventDefault();
				dirCallback.call(self, e, "original", 1, fn);
			});
		},
		moveUp: function(fn) {
			var self = this;
			this.elem.on("touchmove", function(e) {
				e.preventDefault();
				dirCallback.call(self, e, "vertical", -1, fn);
			});
		},
		moveDown: function(fn) {
			var self = this;
			e.preventDefault();
			this.elem.on("touchmove", function(e) {
				dirCallback.call(self, e, "vertical", 1, fn);
			});
		}
	}

	return touch;

});

// touch.left(fn);