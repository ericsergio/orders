$(document).ready(function () {
	$('#aboutPage').parent().remove();
});
$(document).ready(function () {
	var tArr = ['README', 'Database', 'Improvements'];
	for(var p in tArr) {
		$('.p_top_controls ul').append('<li id = ' + tArr[p] + '>' + tArr[p] + '</li>');
		var pTopControlsHeight = Number($('.p_top_controls').css('height').replace('px', ''));
		var tblOpenControlsFont = pTopControlsHeight * .7;
		$('.tblOpenControls li').css('fontSize', tblOpenControlsFont);
		var tblOpenControlsHeight = pTopControlsHeight * .9;
		$('.tblOpenControls').css('height', tblOpenControlsHeight);
	};
	$('.p_top_controls ul li').each(function () {
		$(this).css('marginLeft', '12%');
	})
});
