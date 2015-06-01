/*
* 首页js
* date: 2015/05/30
* writer: yu.c
*/
var agApp = angular.module("agApp", []);
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
agApp.directive("agStage", function() {
	return {
		link: function(scope, element, attrs) {
			var _list = $(element).find("li"),
				_ul = $(element).find("ul");
			_ul.width(window.innerWidth*_list.length);
			_list.width(window.innerWidth);
		}
	}
});
agApp.controller("stageController", function($scope) {
	$scope.listW = 0;
	$scope.num = $(".banner_img li").length;
	$scope.left = function() {
		$scope.listW = ($scope.listW - window.innerWidth) <= -window.innerWidth*$scope.num ? 0 : $scope.listW - window.innerWidth;
	}
	$scope.right = function() {
		$scope.listW = ($scope.listW + window.innerWidth) > 0 ? -window.innerWidth*($scope.num-1) : $scope.listW + window.innerWidth;
	}
	setInterval(function() {
		$scope.listW = ($scope.listW - window.innerWidth) <= -window.innerWidth*$scope.num ? 0 : $scope.listW - window.innerWidth;
		$scope.$apply();
	}, 5000);
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
			$("#drop5").val(e.target.innerText)
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
	
});


