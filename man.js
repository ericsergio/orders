/*
// Rather than having a page dedicated to a "user manual" I decided to have the user manual on the count page itself 
// in the form of JQ dialogs. So, this is my "user manual" documentation.
function DialogMessage(id, name, text) {
	this.id = id;
	this.name = name;
	this.text = text || 'text not set';
}
$(document).on(
	'DOMContentLoaded',
	function()
	{
		var dialogItems = 
		[ 
			$("li#liquor"),
			$("li#wine"),
			$("li#bottleBeer"),
			$("li#kegBeer"),
			$("li#NA"),
			$("li#Southern"),
			$("li#Columbia"),
			$("li#Crown"),
			$("li#Youngs"),
			$("input#submitBtn")
		];
		var liLiquor = "Clicking this displays a table of only the liquor items from the booz() php function in fn.php. Enter a numeric value in the input box next to the item. At the moment, if you enter 0 you need to enter 00. Inside the database, there is a column named 'i_par', once the submit button is clicked the query compares whatever number was submitted with the par number for the matched item; If the inputed number is less than the par number for that particular item then it will be added to the order list. Once the submit button is clicked it starts over, however clicking on the various booz types tabs will not erase the previously entered inputs so you can enter everything on one list then go to the next. Please hover over the Submit button which will appear after clicking on any of the type tabs(the liquor, wine, beerBottles, kegBeer, and NA tabs are the type tabs) for more documentation.";
		var liWine = "Hover over liquor for instructions";
		var liBottleBeer = "Hover over liquor for instructions";
		var liKegBeer = "Hover over liquor for instructions";
		var liNA = "Hover over liquor for instructions";
		var liSouthern = "Clicking on this shows a new table of the items which had a distributor that matched Southern";
		var liColumbia = "Clicking on this shows a new table of the items which had a distributor that matched Columbia";
		var liCrown = "Clicking on this shows a new table of the items which had a distributor that matched Crown";
		var liYoungs = "Clicking on this shows a new table of the items which had a distributor that matched Youngs";
		var inputSubmitBtn = "Clicking on this button compares all of the non empty input boxes. It also creates the form in count.php. The sidebar tabs will only display information if an item had input that was lower then the par number set inside the database and the distributer number matched the distributor that was clicked. I am running very short on time and need to study for the final, I would have definetely tweaked these dialogs more but for this project I am just out of time. This is meant to be my 'User Manual' but just took a lot longer to get to work than I had anticipated.";
		var dialogText = [liLiquor, liWine, liBottleBeer, liKegBeer, liNA, liSouthern, liColumbia, liCrown, liYoungs, inputSubmitBtn];
		var mappedItems = $(dialogItems).map(
			function (key) {
				var idx = key;
				//console.log(dialogText[idx]);
				var txt = dialogText[idx];
				var d = "dialog" + idx;
				var dName = this[0].id;
				//console.log(dName);
				DialogMessage[[d]] = new DialogMessage(idx, dName, txt);
				return this;
			}
		)
		$(mappedItems).each(
			function () {
				this.mouseenter(function () {
					$('div#manDialog').remove();
					$('head').append("<link rel = 'stylesheet' href = 'styles/dialog.css'>")
					$('body').prepend("<div id = 'manDialog'><p id = 'dialogP'>test one two three</p></div>");
					for(var p in DialogMessage) {
						if(this.id == DialogMessage[p].name) {
							$('p#dialogP').html(DialogMessage[p].text);
						}
					}
					
					$('#manDialog').dialog({
						position: {my: "left+5000 bottom+100", at: "left bottom"},
						width: 590
					});
				})
			}
		)
		/*
		$(dialogItems[0]).mouseenter(function(){
			$('head').append("<link rel = 'stylesheet' href = 'styles/dialog.css'>")
			$('body').prepend("<div id = 'manDialog'><p>test one two three</p></div>");
			$('#manDialog').dialog();
	})
*/