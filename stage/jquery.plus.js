/**
 * 扩展jquery
 */

define([], function() {

	$.extend({
		isMobile: function() {
			return document.ontouchstart !== undefined;
		}
	});
	
});