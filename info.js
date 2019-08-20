function Booz(id, name, type) {
	this.id = id;
	this.name = name;
	this.type = type;
};
function Current(name, on_hand, total, unit, unitQuantity, type, dateStart, dateEnd) {
	this.name = name;
	this.on_hand = on_hand;
	this.total = total;
	this.unit = unit;
	this.unitQuantity = unitQuantity;
	this.type = type;
	this.dateStart = dateStart;
	this.dateEnd = dateEnd;
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
		$('#infoDiv').remove();
		var typeClicked = $(this).index() + 1;
		
		if ($('#currentUl')) {
			$('#currentUl').remove();
		}
		$('.cContent').append('<ul id = "currentUl"></ul>');
		for (var p in Booz) {		
			if (Booz[p].type === typeClicked) {	
				var patt = /(_Vodka$|_Rum$|_Gin$|_Whiskey$|_Bourbon$|_Liqueur$|_Scotch$|_Tequila$|_Cognac$|_Orange_Liqueur$|_Coffee_Liqueur$|_Brandy$)/;
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
		});
	});
});
$(document).ready(function () {
	Current[['currentBooz']] = new Current($('div.orderHistorySqlView #selectedItem')[0].innerHTML, $('div.orderHistorySqlView #on_hand')[0].innerHTML, $('div.orderHistorySqlView #quantity')[0].innerHTML, $('div.orderHistorySqlView #unit')[0].innerHTML, $('div.orderHistorySqlView #unitQuantity')[0].innerHTML, $('div.orderHistorySqlView #itemType')[0].innerHTML, $('div.orderHistorySqlView #firstOrder')[0].innerHTML, $('div.orderHistorySqlView #lastOrder')[0].innerHTML);
	
});
$(document).ready(function () {
	var today = new Date();
	var firstOrder = new Date();
	var lastOrder = new Date();
	
	var firstOrderDateVals = Current.currentBooz.dateStart.split('-');
	var lastOrderDateVals = Current.currentBooz.dateEnd.split('-');
	
	var firstOrderYear = Number(firstOrderDateVals[0]);
	var firstOrderMonth = Number(firstOrderDateVals[1]) - 1;
	var firstOrderDate = Number(firstOrderDateVals[2]);

	var lastOrderYear = Number(lastOrderDateVals[0]);
	var lastOrderMonth = Number(lastOrderDateVals[1]) - 1;
	var lastOrderDate = Number(lastOrderDateVals[2]);

	firstOrder.setFullYear(firstOrderYear);
	firstOrder.setMonth(firstOrderMonth);
	firstOrder.setDate(firstOrderDate);
	
	lastOrder.setFullYear(lastOrderYear);
	lastOrder.setMonth(lastOrderMonth);
	lastOrder.setDate(lastOrderDate);

	var diffFirstToNow = today.getTime() - firstOrder.getTime();
	var diffFirstToLast = lastOrder.getTime() - firstOrder.getTime();
	diffFirstToNow = Math.floor(diffFirstToNow / (1000 * 60 * 60 * 24));
	diffFirstToLast = Math.floor(diffFirstToLast / (1000 * 60 * 60 * 24));
	console.log('diffFirstToNow: ' + diffFirstToNow);
	console.log('diffFirstToLast: ' + diffFirstToLast);
	$('.cContent').append('<div id = "infoDiv"></div>');
	$('#infoDiv').append('<p id = "days">' + diffFirstToNow + ' days since first ordered</p>');
	$('#infoDiv').append('<p id = "rateByUnit">1 ' + Current.currentBooz.unit + ' ordered every ' + diffFirstToNow / Number(Current.currentBooz.total) + ' days</p>');
	$('#infoDiv').append('<p id - "estOutDays">' + Number(Current.currentBooz.on_hand) * (diffFirstToNow / Number(Current.currentBooz.total)) + '</p>');
	//Need to convert cases to bottle
});