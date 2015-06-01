/*
* 首页js
* date: 2015/05/30
* writer: yu.c
*/
var agApp = angular.module("agApp", []);
agApp.config(function($sceProvider) {
	$sceProvider.enabled(false);
});
agApp.directive("agTab", function() {
	return {
		scope: {
			cont: "@agTabContent",
			target: "@agTabTarget"
		},
		template: "<li ng-repeat='tab in tabs' ng-click='setCur($index)' ng-class='{cur: curIndex == $index}'>{{tab}}</li>",
		link: function(scope, element, attrs) {
			var _wrap = $(element).parents(".index_layout4"), target = scope.target;
			scope.curIndex = 0;
			scope.tabs = scope.cont.split(" ");
			_wrap.find(target).eq(1).hide();
			scope.setCur = function() {
				scope.curIndex = this.$index;
				_wrap.find(target).hide().end().find(target).eq(scope.curIndex).show();
			}
		}
	}
});

/* jQuery */
;$(function() {
	/* = 弹层 = */
	$("#drop1").hover(function() {
		$(this).drop("#drop1_pop");
	});
	$("#drop2").hover(function() {
		$(this).drop("#drop2_pop");
	});
	$("#drop3").hover(function() {
		$(this).drop("#drop3_pop");
	});
	$("#drop4").hover(function() {
		$(this).drop("#drop4_pop");
	});
	$("#drop5").focus(function() {
		$(this).drop("#drop5_pop");
		$("#drop5_pop").click(function(e) {
			var tar = e.target.tagName == "LI" ? $(e.target).find("a")[0] : e.target;
			console.log(tar.innerHTML);
			$("#drop5").val(tar.innerHTML);
		});
	});
	$("#drop6").hover(function() {
		$(this).drop("#drop6_pop", "left");
	});
	$("#tel").hover(function() {
		$(this).drop("#tel_pop", "left");
	});
	$("#coupon").hover(function() {
		$(this).drop("#coupon_pop", "left");
	});
	$("#icon1_drop").hover(function() {
		$(this).drop("#icon1_pop", "left");
	});
	$("#icon3_drop").hover(function() {
		$(this).drop("#icon3_pop", "left");
	});
	$("#icon5_drop").hover(function() {
		$(this).drop("#icon5_pop", "left");
	});
	$("#icon6_drop").hover(function() {
		$(this).drop("#icon6_pop", "left");
	});
	$("#icon7_drop").hover(function() {
		$(this).drop("#icon7_pop", "left");
	});

	/* = 筛选弹层 = */
	$("#nav_type").hover(function() {
		$(this).drop("#nav_list", "down", function() {
			$("#nav_list").show();
		});
	});
	for(var i=0,nav=$("#nav_list li"),l=nav.length; i<l; i++) {
		$("#nav_list li").eq(i).hover(function(index) {
			return function() {
				$(".tab_box").hide();
				$("#nav_list").drop("#tab_box"+index, "right");
			}
		}(i));
	}
	$("div:not(#nav_list)").click(function() {
		$("#nav_list, .tab_box").hide();
	});

	/* = 回到顶部 = */
	$("#backtop").click(function() {
		$(window).scrollTop(0);
	});

	/* = 搜索切换 = */
	$("#searchType").agSelect("#drop4_pop");

	/* = 轮播宽度自适应 = */
	var _list = $(".banner").find("li"),
		_ul = $(".banner").find("ul"),
		windowW = window.innerWidth || window.screen.width;
	$(window).on("resize load", function() {
		_ul.css("width", windowW*_list.length);
		_list.css("width", windowW);
	});

	/* = 轮播 = */
	Stage({
		elem: ".banner ul",
		time: 5000,
		controller: {
			left: ".banner_left",
			right: ".banner_right"
		}
	});
	
});


