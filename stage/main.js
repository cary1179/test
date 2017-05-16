require.config({
	baseurl: "./",
	paths: {
		"jquery": "../jquery-1.11.3",
		"jquery.plus": "jquery.plus",
		"stage": "stage_v2.0",
		"touch": "touch"
	}
});


require(["jquery", "stage", "touch", "jquery.plus"], function($, Stage, touch) {

	$(function() {

		Stage({
			elem: ".stage",
			time: 5000, // >1000
			width: document.body.clientWidth
		}).toggle(".stagedot");

	});

});