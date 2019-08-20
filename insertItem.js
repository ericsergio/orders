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
$(document).ready(function () {
	$('.p_cContent').append('<div id = "descDiv"><h4 id = "descHead"></h4><ul id = "descUl"><li id = "validType"></li><li id = "numVals"></li></ul></div>');
	var valTypes = ['text', 'Number : 1-4', 'Number : 1-5', 'Number : Reorder Point', 'Number : 1-3', 'Number : 1-7', 'Number : Set Default Order', 'Number : Current On Hand'];
	var numVals = ['just text and underscores', '<ul><li>1 : Southern</li><li>2 : Columbia</li><li>3 : Crown</li><li>4 : Youngs</li></ul>', '<ul><li>Liquor</li><li>Wine</li><li>Bottles</li><li>Kegs</li><li>Cans</li></ul>', 'Your Re-Order Point', '<ul><li>Case</li><li>Bottle</li><li>Keg</li></ul>', '<ul><li>187 ml</li><li>750 ml</li><li>1 Liter</li><li>1.5 Liter</li><li>Bottle</li><li>Keg</li><li>Can</li></ul>', 'Set Default Order', 'Set On Hand'];
	$('input').each(function () {
		var lblId = $(this).attr('id').replace('col_', '');
		$(this).prev().attr('id', lblId);
	})
	$('label').each(function () {
		$(this).next().focus(function () {
			$('#descHead').html(($(this).attr('id')));
			var idx = $(this).parent().parent().index();
			$('#validType').html(valTypes[idx]);
			$('#numVals').html(numVals[idx]);
		})
	})
})