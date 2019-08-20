//This page is for the managedb.html page. I intend on it being a page with the ability to update, alter or modify the database used for the project.
//written by Eric Sergio


function DisplayedTbl(id) {
	this.id = id;
}

//this will run once one of the tabs are clicked. It creates a new DisplayedTbl obj with an id that matches the index number of which table tab was clicked.
function setClickedTbl() {
	var clicked = document.getElementById('frmInput').value;
	var clickedTbl = clicked.substr(-1,1);
	DisplayedTbl.clickedTable = new DisplayedTbl(clickedTbl);
	$('#frm').append('<input id = "frmInputClickedTblId" type = "hidden" name = "two" value = ' + DisplayedTbl.clickedTable + '></input>');
}


//sets up the top tabs which will control displaying what is currently in the database tables
$(document).ready(function () {
	var tArr = ['Items', 'Dists', 'Unit', 'Ordered', 'Unit_Quantity'];
	for(var p in tArr) {
		var idx = Number(tArr.indexOf(tArr[p]));
		//sets the id of the list items to the name from the array tArr concatenated with its index within the array. The id will be used in the next function to store the value of which item was clicked so in the php action page I can use that index in a switch statement to make the correct query to the database.
		$('.p_top_controls ul').append('<li id = ' + tArr[p] + idx + '>' + tArr[p] + '</li>');
		var pTopControlsHeight = Number($('.p_top_controls').css('height').replace('px', ''));
		var tblOpenControlsFont = pTopControlsHeight * .7;
		$('.tblOpenControls li').css('fontSize', tblOpenControlsFont);
		var tblOpenControlsHeight = pTopControlsHeight * .9;
		$('.tblOpenControls').css('height', tblOpenControlsHeight);
		var pTopControlsTop = Number($('.p_top_controls').css('top').replace('px', ''));
	};
});

//gets which tab was clicked and sends its corresponding index number to do_db.php
$(document).ready(function () {
	$('.p_top_controls ul li').click(function () {
		var clicked = $(this)[0].id;
		//set the value to the item clicked's id which holds the name and index number of the top tags to be used in do_db.php
		$('#frm').append('<input id = "frmInput" type = "hidden" name = "one" value = ' + clicked + '></input>');
		var frm = document.getElementById('frm');
		//gets the numeric index value of the clicked table
		var clickedTbl = clicked.substr(-1,1);
		//constructor for displayed table that just has an id number corresponding the the index of the clicked table
		
		setClickedTbl();
		console.log(DisplayedTbl.clickedTable);
		//use jquery to submit the form rather than a submit button
		frm.submit();
	});
});
$(document).ready(function () {
	$('#mngDb').parent().remove();
});
