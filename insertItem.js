/*function InsertItem(name, dist, type, par, orderType, orderQuantity, defaultOrder, onHand) {
	this.name = name;
	this.dist = dist;
	this.par = par;
	this.orderType = orderType;
	this.orderQuantity = orderQuantity;
	this.defaultOrder = defaultOrder;
	this.onHand = onHand || null;
}*/
$(document).ready(function () {
	var columns = [];
	$('#sql_parts tbody').children().each(function () {
		$(this).addClass('insertRows');
		$(this).attr('id', $(this).children()[0].innerHTML);
		columns.push($(this).attr('id'));
		$(this).children()[0].innerHTML = '<input type = "text" id = col_' + $(this).children()[0].innerHTML + ' name = "' + $(this).children()[0].innerHTML + '">';
		if($(this).children()[1].innerHTML.match('varchar')) {
			$(this).children().children(':first').attr('placeholder', 'Enter Text');
		} else {
			$(this).children().children(':first').attr('placeholder', 'Enter Number');
		}
		$(this).children().children(':first').before('<label for "' + $(this).attr('id') + '">' + $(this).attr('id') + '</label>');
		$(this).children(':last').hide();
	})
	$('#sql_parts').wrap('<form id = "insertFrm" action = "new_insert.php" method = "post"></form>');
	var newInsert = document.getElementById('insertFrm');
	$('#sql_parts').after('<div id = "insertSubmit">Submit</div>');
	$('#insertSubmit').on('click', function (e) {
		var arrString = columns.join("__");
		$('#insertFrm').prepend('<input type = "hidden" name = "colStr" value = ' + arrString + '><input type = "hidden" name = "table" value = "' + $('#saveTbl')[0].innerHTML + '">');
		newInsert.submit();
	})
})