function Booz(id, name, type) {
	this.id = id;
	this.name = name;
	this.type = type;
}
$(document).ready(function () {
	$('#booz tbody tr').each(function () {
		var iId = $(this).index();
		var varName = 'booz' + iId;
		var iName = $(this).children()[0].id;
		var iType = Number($(this).children()[1].innerHTML);
		Booz[[varName]] = new Booz(iId, iName, iType);
	})
	$('.tblContain').remove();
	$('#count_frm').remove();
	$('.headerNav li:eq(2)').remove();
	//$('.headerNav li:eq(1)').append('<a href = "../index.php">Count</a>');
	//console.log($('.headerNav li a:eq(0)'));
})
$(document).ready(function () {
	$('.boozTypes').children().click(function () {
		$('.orderHistorySqlView').remove();
		var typeClicked = $(this).index() + 1;
		
		if ($('#currentUl')) {
			$('#currentUl').remove();
		}
		$('.cContent').append('<ul id = "currentUl"></ul>');
		for (var p in Booz) {
			
			if (Booz[p].type === typeClicked) {
				
				var patt = /(_Vodka$|_Rum$|_Gin$|_Whiskey$|_Bourbon$|_Liqueur$|_Scotch$|_Tequila$|_Cognac$|_Orange_Liqueur$|_Coffee_Liqueur$|_Brandy$)/;
				//var secondaryPatt = //;
				var patt_ = /_/g;
				var itemStr = Booz[p].name.replace(patt, '');
				itemStr = itemStr.replace(patt_, ' ');
				var itemId = Booz[p].name
				$('#currentUl').append('<li id = "' + itemId + '">' + itemStr + '</li>');
				$('#currentUl').children().on('mouseover', function() {
					$(this).addClass('mousedOver');
				})
				$('#currentUl').children().on('mouseout', function() {
					$(this).removeClass('mousedOver')
				})
			}
		}
		$('#currentUl li').on('click', function () {
			$('.cContent').append('<form id = "iForm" action = "info.php" method = "post"><input type = "hidden" name = "clicked" value = ' + this.id + ' /></form>');
			iForm.submit();
		})
		/*$('.orderHistorySqlView').on("click", function() {
			$("iForm").remove();
			$('.cContent').append('<form id = "rForm" action = "item_info.php" method = "post"><input type = "hidden" name = "clicked" value = ' + storeItem.name + '><input type = "hidden" name = "numeric" value = ' + 1 + '></form>')
		})*/
	})
})
