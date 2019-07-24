//Order item constructer. I did this because I plan on making the orders editable. To do that, I need more control of 
//the items so this creates an OrderItem object that I will be able to more easily change and eventually create a new 
//query from to put into the previously ordered database table.
function OrderItem(name, dist, type, par, unit, unitType, defaultOrder, onHand) {
	this.name = name;
	this.dist = dist;
	this.type = type;
	this.par = par;
	this.unit = unit;
	this.unitType = unitType;
	this.defaultOrder = defaultOrder;
	this.onHand = onHand;
}
function OrderItemString(id, str) {
	this.id = id;
	this.str = str;
}

//uses the hidden showOrder table td values to assign properties to the OrderItem object instances created here.
function buildOrderObjects(){
	var itemsNeeded = $('.showOrder').find('tr');
	var orderItems = [];
	var num = 1;
	//gather up the required values to be used as the parameters for the OrderItem instance creation.
	itemsNeeded.each(function(){
		//
		//	here
		//
		var itemName = this.children[0].innerHTML;
		var itemDist = this.children[1].innerHTML;
		var itemType = this.children[2].innerHTML;
		var itemPar = this.children[3].innerHTML;
		var itemUnit = this.children[4].innerHTML;
		var itemUnitType = this.children[5].innerHTML;
		var defaultOrder = this.children[6].innerHTML;
		var itemOnHand = this.children[7].innerHTML;
		var itemNum = 'orderItem' + num;
		// object instance creation
		OrderItem[[itemNum]] = new OrderItem(itemName, itemDist, itemType, itemPar, itemUnit, itemUnitType, defaultOrder, itemOnHand);
		//console.log(OrderItem[itemNum]);
		orderItems.push(OrderItem[[itemNum]]);
		num += 1;
	})
	return orderItems;
}
function doPBtn1() {
	$('.cContent').append('<form id = "enterItemsFrm" action = "pages/oItemEntry.php" method = "post"></form>');
	var num = 1;
	for(var p in OrderItemString) {
		var itemIdentifier = "item" + num;
		var orderItemTxt = OrderItemString[p].str;
		console.log(OrderItemString[p].str);
		$('#enterItemsFrm').append('<input type = "hidden" name = "' + itemIdentifier + '" value = "' + orderItemTxt + '" / >');
		num += 1;		
	}
	var itemCount = num - 1;
	var frm = $('#enterItemsFrm')[0];
	$('#enterItemsFrm').append('<input type = "hidden" id = "sendNum" name = "item_num" value = "' + itemCount + '" / >');
	console.log($('#sendNum').val());
	frm.submit();
}
function doPBtn2() {
	var pBtn1Placeholder = 'pBtn2';
	console.log(pBtn1Placeholder);	
}
function doPBtn3() {
	var pBtn1Placeholder = 'pBtn3';
	console.log(pBtn1Placeholder);	
}
//var distDivs = ['soDiv', 'coDiv', 'crDiv', 'yoDiv'];
//As I did on app.js, the next four functions are very similar and am only going to comment the first.
$(document).ready(function () {
	$('.boozDists li#Southern').click(
	function() 
	{
		
		//removes the selectedDiv class from everything so it can be added to the only actually selected div below.
		$('.boozDists li').each(function() {
			$(this).removeClass('selectedDiv');
		})
		//removes the class typesSelected from all the types across the top of the page.
		$('.typesSelected').each(function () {
			$(this).removeClass('typesSelected');
		})
		//adds back the selectedDiv class to the div assosiated with this button's click.
		$(this).addClass('selectedDiv');
		//hide the submit button since  if this is being shown then the submit button has already been clicked and 
		//the form has already posted.
		$('#submitBtn').hide();
		//hide all of the booz table so that the current distributer div's table replaces it rather than puts it 
		//underneath it.
		$('#booz tbody tr').hide();
		//remove it's own active class so it doesn't keep adding the same list if clicked more than once
		if($('#soDiv').hasClass('active')) {
			$('#soDiv').remove();
		}
		if($('#orderFrm')) {
			$('#orderFrm').remove();
		}
		//create new table after the hidden showOrder table
		$('#booz').after(
		//not used
			'<form id = "orderFrm" action = "page.php" method = "post">' + 
				'<div id = "soDiv">' + 
					'<table id = "soTable">' + 
						'<thead>' + 
							'<th>Item</th>' + 
							'<th>Unit</th>' + 
							'<th>Unit Type</th>' + 
							'<th>Order</th>' +
							'<th>On Hand</th>' + 
						'</thead>' + 
					'</table>' + 
					'<div id = "orderFrmButtons">' + 
						'<input type = "button" id = "pBtn1" onclick = "doPBtn1()" value = "Submit Order"></input>' + 
						'<input type = "button" id = "pBtn2" onclick = "doPBtn2()" value = "doPBtn2"></input>' + 
						'<input type = "button" id = "pBtn3" onclick = "doPBtn3()" value = "doPBtn3"></input>' + 
					'</div>' + 
				'</div>' + 
			'</form>'
		);
		$('#booz').hide();
		var orderFormButton = $('#pBtn1');
		var orderFormButtons = orderFormButton.parent().children();
		//below sets the left % so the buttons are distributed horizontally across the page using the number at the end of the id and multiplying it by how ever many percentage points.
		orderFormButtons.each(function () {
			$(this).css('left', Number(this.id.substr(-1, 1)) * 15 + '%');
		})
		var orderFormButtonHeight = (Number(getComputedStyle(orderFormButton[0]).height.replace('px', '')) + 15) + 'px';
		var orderFormButtonLeft = orderFormButton[0].id.substr(-1, 1);
		//console.log(orderFormButtons);
		orderFormButton.parent().css('height', orderFormButtonHeight);
		
		//re-add the active class to this clicks assosiated div
		$('#soDiv').addClass('active');
		var num = 1;
		for(var p in buildOrderObjects()) {
			console.log(buildOrderObjects()[p]);
			//if item belongs to this dist then start gathering variables 
			if(buildOrderObjects()[p].dist == "Southern") {
				var soName = buildOrderObjects()[p].name;
				var soDist = buildOrderObjects()[p].dist;
				var soType = buildOrderObjects()[p].type;
				var soPar = buildOrderObjects()[p].par;
				var soUnit = buildOrderObjects()[p].unit;
				var soUnitType = buildOrderObjects()[p].unitType;
				var soDefaultOrder = buildOrderObjects()[p].defaultOrder;
				var soOnHand = buildOrderObjects()[p].onHand;
				
				//create row contents
				soOrderStr = 
					"<td>" + 
					soName + 
					"</td><td>" + 
					soDefaultOrder + 
					"</td><td>" + 
					soUnit + 
					"</td><td>" + 
					soUnitType + 
					"</td><td>" + 
					soOnHand +
					"</td>";
					
				var soOrderString = 
					"--" + 
					soName + 
					"--" + 
					soDist + 
					"--" + 
					soType + 
					"--" + 
					soPar + 
					"--" + 
					soDefaultOrder + 
					"--" + 
					soUnit + 
					"--" + 
					soUnitType + 
					"--" + 
					soOnHand + 
					"--";
				//soOrderString is used to insert into ordered table, soOrderStr is used to display order
				OrderItemString[[soName]] = new OrderItemString(num, soOrderString);
				
				//console.log(OrderItemString[[soName]]);
				
				//add row contents
				if(Number(soOnHand) < Number(soPar)) {
					$('#soTable').append('<tr>' + soOrderStr + '</tr>');
				}
			}
			num += 1;
		}
		
		//if any of the other distributer tabs have been clicked remove their active class 
		var otherDists = [$('#coDiv'),$('#crDiv'),$('#yoDiv')];
		//remove any other hidden inactive tables to reduce clutter
		var otherDistsTbls = [$('#coTable'),$('#crTable'),$('#yoTable')];
		if($('#soDiv').hasClass('active')) {
			for(var these in otherDists) {
				otherDists[these].removeClass('active');
				otherDists[these].hide();
				otherDistsTbls[these].remove();
			}
		}
	})
})

//see above function
$(document).ready(function () {
	$('.boozDists li#Columbia').click(
	function() 
	{
		$('.boozDists li').each(function() {
			$(this).removeClass('selectedDiv');
		})
		$('.typesSelected').each(function () {
			$(this).removeClass('typesSelected');
		})
		$(this).addClass('selectedDiv');
		$('#submitBtn').hide();
		$('#booz tbody tr').hide();
		if($('#coDiv').hasClass('active')) {
			$('#coDiv').remove();
		}
		if($('#orderFrm')) {
			$('#orderFrm').remove();
		}
		$('#booz').after(
		'<form id = "orderFrm" action = "page.php" method = "post">' + 
			'<div id = "coDiv">' + 
				'<table id = "coTable">' + 
					'<thead>' + 
						'<th>Item</th>' + 
						'<th>Unit</th>' + 
						'<th>Unit Type</th>' + 
						'<th>Order</th>' + 
						'<th>On Hand</th>' + 
					'</thead>' + 
				'</table>' + 
				'<div id = "orderFrmButtons">' + 
					'<input type = "button" id = "pBtn1" onclick = "doPBtn1()" value = "Submit Order"></input>' + 
					'<input type = "button" id = "pBtn2" onclick = "doPBtn2()" value = "doPBtn2"></input>' + 
					'<input type = "button" id = "pBtn3" onclick = "doPBtn3()" value = "doPBtn3"></input>' + 
				'</div>' + 
			'</div>' + 
		'</form>'
		);
		$('#booz').hide();
		var orderFormButton = $('#pBtn1');
		var orderFormButtons = orderFormButton.parent().children();
		//below sets the left % so the buttons are distributed horizontally across the page using the number at the end of the id and multiplying it by how ever many percentage points.
		orderFormButtons.each(function () {
			$(this).css('left', Number(this.id.substr(-1, 1)) * 15 + '%');
		})
		var orderFormButtonHeight = (Number(getComputedStyle(orderFormButton[0]).height.replace('px', '')) + 15) + 'px';
		var orderFormButtonLeft = orderFormButton[0].id.substr(-1, 1);
		//console.log(orderFormButtons);
		orderFormButton.parent().css('height', orderFormButtonHeight);
		$('#soDiv').addClass('active');
		var num = 1;
		$('#coDiv').addClass('active');
		for(var p in buildOrderObjects()) {
			if(buildOrderObjects()[p].dist == "Columbia") {
				var coName = buildOrderObjects()[p].name;
				var coDist = buildOrderObjects()[p].dist;
				var coType = buildOrderObjects()[p].type;
				var coPar = buildOrderObjects()[p].par;
				var coUnit = buildOrderObjects()[p].unit;
				var coUnitType = buildOrderObjects()[p].unitType;
				var coDefaultOrder = buildOrderObjects()[p].defaultOrder;
				var coOnHand = buildOrderObjects()[p].onHand;
				coOrderStr = 
					"<td>" + 
					coName + 
					"</td><td>" + 
					coDefaultOrder + 
					"</td><td>" + 
					coUnit + 
					"</td><td>" + 
					coUnitType + 
					"</td><td>" + 
					coOnHand +
					"</td>";
					
				var coOrderString = 
					"--" + 
					coName + 
					"--" + 
					coDist + 
					"--" + 
					coType + 
					"--" + 
					coPar + 
					"--" + 
					coDefaultOrder + 
					"--" + 
					coUnit + 
					"--" + 
					coUnitType + 
					"--" + 
					coOnHand + 
					"--";
				
				OrderItemString[[coName]] = new OrderItemString(num, coOrderString);
				if(Number(coOnHand) < Number(coPar)) {
					$('#coTable').append('<tr>' + coOrderStr + '</tr>');
				}
			}
			num += 1;
		}
		var otherDists = [$('#soDiv'),$('#crDiv'),$('#yoDiv')];
		//remove any other hidden inactive tables to reduce clutter
		var otherDistsTbls = [$('#soTable'),$('#crTable'),$('#yoTable')];
		if($('#coDiv').hasClass('active')) {
			for(var these in otherDists) {
				otherDists[these].removeClass('active');
				otherDists[these].hide();
				otherDistsTbls[these].remove();
			}
		}
	})
})

//see 2 functions up
$(document).ready(function () {
	$('.boozDists li#Crown').click(
	function() 
	{
		$('.boozDists li').each(function() {
			$(this).removeClass('selectedDiv');
		})
		$('.typesSelected').each(function () {
			$(this).removeClass('typesSelected');
		})
		$(this).addClass('selectedDiv');
		$('#submitBtn').hide();
		$('#booz tbody tr').hide();
		if($('#crDiv').hasClass('active')) {
			$('#crDiv').remove();
		}
		if($('#orderFrm')) {
			$('#orderFrm').remove();
		}
		$('#booz').after(
		'<form id = "orderFrm" action = "page.php" method = "post">' + 
			'<div id = "crDiv">' + 
				'<table id = "crTable">' + 
					'<thead>' + 
						'<th>Item</th>' + 
						'<th>Unit</th>' + 
						'<th>Unit Type</th>' + 
						'<th>Order</th>' + 
						'<th>On Hand</th>' + 
					'</thead>' + 
				'</table>' + 
				'<div id = "orderFrmButtons">' + 
					'<input type = "button" id = "pBtn1" onclick = "doPBtn1()" value = "Submit Order"></input>' + 
					'<input type = "button" id = "pBtn2" onclick = "doPBtn2()" value = "doPBtn2"></input>' + 
					'<input type = "button" id = "pBtn3" onclick = "doPBtn3()" value = "doPBtn3"></input>' + 
				'</div>' + 
			'</div>' + 
		'</form>'
		);
		$('#booz').hide();
		var orderFormButton = $('#pBtn1');
		var orderFormButtons = orderFormButton.parent().children();
		//below sets the left % so the buttons are distributed horizontally across the page using the number at the end of the id and multiplying it by how ever many percentage points.
		orderFormButtons.each(function () {
			$(this).css('left', Number(this.id.substr(-1, 1)) * 15 + '%');
		})
		var orderFormButtonHeight = (Number(getComputedStyle(orderFormButton[0]).height.replace('px', '')) + 15) + 'px';
		var orderFormButtonLeft = orderFormButton[0].id.substr(-1, 1);
		//console.log(orderFormButtons);
		orderFormButton.parent().css('height', orderFormButtonHeight);

		$('#crDiv').addClass('active');
		var num = 1;
		for(var p in buildOrderObjects()) {
			if(buildOrderObjects()[p].dist == "Crown") {
				var crName = buildOrderObjects()[p].name;
				var crDist = buildOrderObjects()[p].dist;
				var crType = buildOrderObjects()[p].type;
				var crPar = buildOrderObjects()[p].par;
				var crUnit = buildOrderObjects()[p].unit;
				var crUnitType = buildOrderObjects()[p].unitType;
				var crDefaultOrder = buildOrderObjects()[p].defaultOrder;
				var crOnHand = buildOrderObjects()[p].onHand;
				crOrderStr = 
					"<td>" + 
					crName + 
					"</td><td>" + 
					crDefaultOrder + 
					"</td><td>" + 
					crUnit + 
					"</td><td>" + 
					crUnitType + 
					"</td><td>" + 
					crOnHand +
					"</td>";
					
				var crOrderString = 
					"--" + 
					crName + 
					"--" + 
					crDist + 
					"--" + 
					crType + 
					"--" + 
					crPar + 
					"--" + 
					crDefaultOrder + 
					"--" + 
					crUnit + 
					"--" + 
					crUnitType + 
					"--" + 
					crOnHand + 
					"--";
				
				OrderItemString[[crName]] = new OrderItemString(num, crOrderString);
				if(Number(crOnHand) < Number(crPar)) {
					$('#crTable').append('<tr>' + crOrderStr + '</tr>');
				}
			}
			num += 1;
		}
		var otherDists = [$('#soDiv'),$('#coDiv'),$('#yoDiv')];
		//remove any other hidden inactive tables to reduce clutter
		var otherDistsTbls = [$('#soTable'),$('#coTable'),$('#yoTable')];
		if($('#crDiv').hasClass('active')) {
			for(var these in otherDists) {
				otherDists[these].removeClass('active');
				otherDists[these].hide();
				otherDistsTbls[these].remove();
			}
		}

	})
})

//see 3 functions up
$(document).ready(function () {
	$('.boozDists li#Youngs').click(
	function()
	{
		$('.boozDists li').each(function() {
			$(this).removeClass('selectedDiv');
		})
		$('.typesSelected').each(function () {
			$(this).removeClass('typesSelected');
		})
		$(this).addClass('selectedDiv');
		$('#submitBtn').hide();
		$('#booz tbody tr').hide();
		if($('#yoDiv').hasClass('active')) {
			$('#yoDiv').remove();
		}
		if($('#orderFrm')) {
			$('#orderFrm').remove();
		}
		$('#booz').after(
		'<form id = "orderFrm" action = "page.php" method = "post">' + 
			'<div id = "yoDiv">' + 
				'<table id = "yoTable">' + 
					'<thead>' + 
						'<th>Item</th>' + 
						'<th>Unit</th>' + 
						'<th>Unit Type</th>' + 
						'<th>Order</th>' + 
						'<th>On Hand</th>' + 
					'</thead>' + 
				'</table>' + 
				'<div id = "orderFrmButtons">' + 
					'<input type = "button" id = "pBtn1" onclick = "doPBtn1()" value = "Submit Order"></input>' + 
					'<input type = "button" id = "pBtn2" onclick = "doPBtn2()" value = "doPBtn2"></input>' + 
					'<input type = "button" id = "pBtn3" onclick = "doPBtn3()" value = "doPBtn3"></input>' + 
				'</div>' + 
			'</div>' + 
		'</form>'
		);
		$('#booz').hide();
		var orderFormButton = $('#pBtn1');
		var orderFormButtons = orderFormButton.parent().children();
		//below sets the left % so the buttons are distributed horizontally across the page using the number at the end of the id and multiplying it by how ever many percentage points.
		orderFormButtons.each(function () {
			$(this).css('left', Number(this.id.substr(-1, 1)) * 15 + '%');
		})
		var orderFormButtonHeight = (Number(getComputedStyle(orderFormButton[0]).height.replace('px', '')) + 15) + 'px';
		var orderFormButtonLeft = orderFormButton[0].id.substr(-1, 1);
		//console.log(orderFormButtons);
		orderFormButton.parent().css('height', orderFormButtonHeight);

		$('#yoDiv').addClass('active');
		var num = 1;
		for(var p in buildOrderObjects()) {
			if(buildOrderObjects()[p].dist == "Youngs") {
				var yoName = buildOrderObjects()[p].name;
				var yoDist = buildOrderObjects()[p].dist;
				var yoType = buildOrderObjects()[p].type;
				var yoPar = buildOrderObjects()[p].par;
				var yoUnit = buildOrderObjects()[p].unit;
				var yoUnitType = buildOrderObjects()[p].unitType;
				var yoDefaultOrder = buildOrderObjects()[p].defaultOrder;
				var yoOnHand = buildOrderObjects()[p].onHand;
				yoOrderStr = 
					"<td>" + 
					yoName + 
					"</td><td>" + 
					yoDefaultOrder + 
					"</td><td>" + 
					yoUnit + 
					"</td><td>" + 
					yoUnitType + 
					"</td><td>" + 
					yoOnHand +
					"</td>";
					
				var yoOrderString = 
					"--" + 
					yoName + 
					"--" + 
					yoDist + 
					"--" + 
					yoType + 
					"--" + 
					yoPar + 
					"--" + 
					yoDefaultOrder + 
					"--" + 
					yoUnit + 
					"--" + 
					yoUnitType + 
					"--" + 
					yoOnHand + 
					"--";
				
				OrderItemString[[yoName]] = new OrderItemString(num, yoOrderString);
				if(Number(yoOnHand) < Number(yoPar)) {
					$('#yoTable').append('<tr>' + yoOrderStr + '</tr>');
				}
			}
			num += 1;
		}
		var otherDists = [$('#soDiv'),$('#coDiv'),$('#crDiv')];
		//remove any other hidden inactive tables to reduce clutter
		var otherDistsTbls = [$('#soTable'),$('#coTable'),$('#crTable')];
		if($('#yoDiv').hasClass('active')) {
			for(var these in otherDists) {
				otherDists[these].removeClass('active');
				otherDists[these].hide();
				otherDistsTbls[these].remove();
			}
		}
	})
})


//$('#soDiv').addClass('active');
//var num = 1;
