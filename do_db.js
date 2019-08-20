$(document).ready(function () {
	//this section copies the table produced in the php with the id results, removes the original then 'pastes' the copy inside the content div and finally re-ids that copy to have the same id as the original. Needs to keep that same id for everything else below to work.
	var resultTbl = $('table#results').clone(true);
	resultTbl.removeAttr('id');
	$('#results').remove();
	$('.p_cContent').prepend(resultTbl);
	var newClonedTbl = $('.p_cContent').find('table');
	newClonedTbl.attr('id', 'results');
	//topVal was 5% of the items table's height when I was testing. It happened to be a good top value for the items table when testing. It was a bad value for the other tables which had a lesser or greater height value. Im changing this to be a static value temporarily.. maybe . Depending on how it is on other devices.
	var topVal = '159.796875px';
	$('#results').css('top',topVal);
	if($('table#results tbody tr').length === 1) {
		$('#Open_Database0').click();
	}
	$('#currTable').hide();
	var tblRowName = $('table#results tbody tr').children(0);
	var cols = $('table#results tbody tr th');
	var columnNames = [];
	//$('.p_sidebar').prepend('<p id = "pTop"></p><p id = "pLeft"></p>');
	for(var i = 0;i < cols.length;i++) {
		columnNames.push(cols[i].innerHTML);
	}
	tblRowName.on("click", function (e) {
		$('table#results tbody tr').each(function () {
			$(this).removeClass('active');
		})
		$('table#results tbody tr td').each(function () {
			$(this).removeClass('activeCell');
		})
		$(this).addClass('activeCell');
		var cols = ['i_name', 'i_dist', 'i_type', 'i_par', 'd_order_type', 'd_order_quantity', 'default_order', 'on_hand'];
		var idx = $(this).index();
		var activeCellColumn = cols[idx];
		$(this).parent().addClass('active');
		$('table#results tbody tr').not('.active').not('.tblHead').each(function () {
			$(this).css('opacity', '.3');
		})
		//These are used for the popup div positioning and dimension properties for the database controls.
		var winHeight = $('.p_sidebar')[0].clientHeight;
		var fromTop = e.clientY;
		var yCoord = winHeight - fromTop;
		var percentBelow = yCoord / winHeight;
		var percentAbove = 1.05 - percentBelow;
		var percentAbovePlus2 = .9 - percentBelow;
		var percentAboveStr = String(percentAbove).substr(2,2) + "%";
		var percentAbovePlus2Str = String(percentAbovePlus2).substr(2,2) + "%";
		var cellLeftValue = $(this).siblings('td').eq(0).offset().left;
		var rowElem = document.getElementsByClassName('active')[0];
		var rowWidth = getComputedStyle(rowElem).width;
		$('#pWinHeight').html("Window Height: " + getComputedStyle($('.p_cContent')[0]).height);
		$('#pWinWidth').html("Window Width: " + getComputedStyle($('.p_cContent')[0]).width);
		$('#pXYCoords').html("Coords: (" + e.clientX + ", " + yCoord + ")");
		$('#pPercentBelow').html("Percent Below: " + percentBelow + "%");
		$('#pPercentAbove').html("Percent Above: " + percentAbove + "%");
		$('#ctl').remove();
		$('body').append('<div id = "ctl"><ul id = "ctls"></ul></div>');
		var controls = ['<li id = "cntrlEditDb">Change Value</li>', '<li id = "delRow">Delete Row</li>', '<li id = "cntrlExit">Exit</li>'];
		//check below
		var controlIds = ['cntrlEditDb', 'delRow', 'cntrlExit' ];
		for(var p in controls){
			$('ul#ctls').append(controls[p]);
		}
		function getWidestCtl() {
			var elemWidths = [];
			for(var p in controlIds) {
				var elem = document.getElementById(controlIds[p])
				$(elem).css('float','left');
				var elemWidth = Number(getComputedStyle(elem).width.replace('px', ''));
				elemWidths.push(elemWidth);
			}
			var widestElem = elemWidths.sort().reverse()[0];
			return widestElem;
		}
		$('ul#ctls').css({
			'position': 'relative',
			'bottom': '20%'
		})
		$('ul#ctls li').css({
			'list-style-type': 'none',
			'margin-left': '11%',
			'font': '14px arial, sans-serif',
			'width':getWidestCtl(),
			'color': '#000000',
			'border': 'solid cyan 2px',
			'padding': '3px',
			'text-align': 'center',
			'background-image': 'radial-gradient(circle, #ffffe6, #cccc00)',
			'box-shadow':  'inset 0px 0px 55px 2px #ffffff',
			'border-radius': '5px'
		})
		if(percentBelow > .25){
			var useStr = percentAboveStr;
		} else {
			var useStr = percentAbovePlus2Str;
		}
		$('#ctl').css({
			'position': 'fixed',
			'top': useStr,
			'left': cellLeftValue,
			'height': '40px',
			'width': rowWidth,
			'background': 'linear-gradient(to bottom, #618685 0%, #36486b 100%)',
			'border': 'solid yellow 3px',
			'border-radius': '5%',
			'z-index': '7'
		})
		//$('table#results').css('z-index', '0');
		$('.p_cContent #ctl').css('z-index', '7');
		$('#cntrlExit').on('click', function (e) {
			$('#ctl').fadeOut(200);
			$('table#results tbody tr').css('opacity', '1');
			setTimeout(function(){
				$('#ctl').remove()
			}, 201);
		})
		
		//Change Value Button
		$('#cntrlEditDb').on('click', function (e) {
			$(this).hide();
			$('form').remove();
			$('body').prepend('<form id = "updateFrm" action = "updatedb.php" method = "post"></form>');
			$(this).siblings().hide();
			var item = $('.active')[0].children[0].innerText;
			var oldVal = $('.activeCell').html();
			var currentTable = $('#currTable').html();
			$(this).parent().append(
				'<li><input id = "inp" type = "text" name = "one"></li>' + 
				'<li><input type = "submit" id = "sbmt"></li>' + 
				'<li id = "lvl2CntrlExit">Exit</li>' + 
				'<input type="hidden" name = "item" value ="' + item + '">' + 
				'<input type = "hidden" name = "oldVal" value = "' + oldVal + '">' + 
				'<input type = "hidden" name = "column" value = "' + activeCellColumn + '">' +
				'<input type = "hidden" name = "currentTable" value = "' + currentTable + '">'
			);
			var thisParent = $(this).parent().parent();
			thisParent.css('width', rowWidth);
			var form = $('#updateFrm');
			thisParent.appendTo(form);
			
			$('ul#ctls').css({
				'position': 'relative',
				'bottom': '20%'
			})
			$('ul#ctls li').css({
				'list-style-type': 'none',
				'float': 'left',
				'margin-left': '10%'
			});
			$('#lvl2CntrlExit').css({
				'font': '14px arial, sans-serif',
				'width':getWidestCtl(),
				'border': 'solid yellow 1px',
				'padding': '3px',
				'text-align': 'center',
				'background-image': 'radial-gradient(circle, #ffffe6, #cccc00)',
				'box-shadow':  'inset 0px 0px 55px 2px #ffffff',
				'border-radius': '5px'
			})
			$('#sbmt').css({
				'width': getWidestCtl(),
				'padding': '3px',
				'font': '14px arial, sans-serif',
				'background-image': 'radial-gradient(circle, #ffffe6, #cccc00)',
				'box-shadow':  'inset 0px 0px 55px 2px #ffffff',
				'border-radius': '5px'
			});
			$('#inp').focus();
			
			$('#lvl2CntrlExit').on('click', function (e) {
				$('#ctl').fadeOut(200);
				$('table#results tbody tr').css('opacity', '1');
				setTimeout(function(){
					$('#ctl').remove();
				}, 201);
			});
		});
		$('#delRow').on('click', function (e) {
			var rowToDel = $('.active')[0].children[0].innerText;
			var currentTable = $('#currTable').html();
			$('body').prepend('<form id = "deleteFrm" action = "del_from_db.php" method = "post"></form>');
			$('#deleteFrm').append('<input id = "delVal" type = "hidden" name = "deleteThis" value = "' + rowToDel + '"><input type = "hidden" name = "fromTable" value = "' + currentTable + '">');
			var delFrmRef = document.getElementById('deleteFrm');
			delFrmRef.submit();
		})
		/*$('#delRow').on('click', function () {
		})*/
		$('#sbmt').on('click', function() {
			var oldVal = $('.activeCell').html();
			var newVal = $('#inp').val();
			$('#pVal').html(newVal);
			//check below
			var frm = document.getElementById('updateFrm');
			var valueStr = item + "__" + oldVal + "__" + newVal + "__";
		});
	});
});
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
	var top = $('#results').offset().top + 40;
	$('.p_cContent').prepend("<p id = 'addItem'>add item</p>");
	$('#addItem').css({
		'top': top
	});
	$('#addItem').on('click', function () {
		var currentTable = $('#currTable').html();
		$('body').prepend('<form id = "insertFrm" action = "insert_item.php" method = "post"><input type = "hidden" name = "tableNum" value = ' + currentTable + '></form>');
		var doInsertRef = document.getElementById('insertFrm');
		doInsertRef.submit();
	})
})
$('body').onresize = function () {
	positionTbl();
	resizeHead();
	resizeTopControls();
}
//bound to managedb.php's body onresize event
function positionTbl() {
	var greenOptionBar = $('div.p_top_controls');
	var greenOptionBarTop = Number(getComputedStyle(greenOptionBar[0]).top.replace('px', ''));
	var greenOptionBarHeight = Number(getComputedStyle(greenOptionBar[0]).height.replace('px', ''));
	var resultsTblTopMin = greenOptionBarHeight + greenOptionBarTop;
	$('table#results').css('top', resultsTblTopMin + 'px');
	$('table#results').css('paddingTop', '5%');
}
window.onload = function doPageHeight() {
	var pgHeight = $('table#results tbody tr:last').offset().top + 200;
	positionTbl();
	$('.p_cContent').css('height', pgHeight);
	$('footer').css({
		'position': 'absolute',
		'top': pgHeight
	});
}
