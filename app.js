$('#submitBtn').hide();

//makes it easier to see where you are by adding a class that highlights the entire row when you focus on an input 
//box
$(document).ready(function () {
    $('input').focus(function () {
        if($('tr').hasClass('currentInput')) {
            $('tr').removeClass('currentInput');
        }
        var currInp = $(this);
        var currInpParent = currInp.parent();
        var currInpParentsSiblings = currInpParent.siblings();
        var currInpParentsSiblingsParent = currInpParentsSiblings.parent();
        currInpParentsSiblingsParent.addClass('currentInput');
    });
})

//hides the initital booz table created in fn.php. Also hides the showOrder table created after everything happens in 
//count.php
$(document).ready(function () {
    $('#booz').hide();
    $('.showOrder').hide();
})

//creates the clickable tabs or buttons on the top of the page that shows each booz type by type.
var types = ['liquor', 'wine', 'bottleBeer', 'kegBeer', 'NA'];
$(document).ready(function () {
    for(var p in types) {
        $('.boozTypes').append('<li id = "' + types[p] + '">' + types[p] + '</li>');
    }
})

//creates the distributer clickable tabs/buttons in the right sidebar that shows the order per each distributer.
$(document).ready(function () {
    var dists = ['Southern', 'Columbia', 'Crown', 'Youngs'];
    for(var p in dists) {
        $('.boozDists').append('<li id = "' + dists[p] + '">' + '<p>' + dists[p] + '</p>' + '</li>');
    }
})

//positions the buttons for the types across the page

$(document).ready(
    function () {
    var num = 10;
    $('.boozTypes li').each(
        function () {
            $(this).css('left', num + '%');
            num += 25;
        }
    )
})

//actual click event for the liquor button. The next five functions are basically the same thing so I am only going 
//to comment the first.
$(document).ready(function() {
    $('.boozTypes #liquor').click(
    function () {
        //the submit button sends the form and therefor only needs to be present when one the the type tables are 
        //visible.
        $('#booz').show();
        $('#submitBtn').show();
        
        //the following array of divs are divs created in o.js, they are the divs that contain the orders per 
        //distributer as a table. When they aren't in focus, this removes the class active and hides the div.
        var dists = [$('#soDiv'),$('#coDiv'),$('#crDiv'),$('#yoDiv')];
        for(var these in dists) {
            dists[these].removeClass('active');
            dists[these].hide();
        }
        //This is here because when the user clicks on the buttons/tabs for the type table, in this case liquor; The 
        //liquor tab is highlighted to indicate what is currently on screen. The same occurs when one of the sidebar 
        //distributers is clicked. so this removes the highlight from the previously clicked item.
        $('.boozDists li').each(function() {
            $(this).removeClass('selectedDiv');
        })
        //removes the class that provides the styling for the selected item from all so that it can add it to only 
        //the currently selected tab/button
        $('.typesSelected').each(function () {
            $(this).removeClass('typesSelected');
        })
        $(this).addClass('typesSelected');
        
        //td.boozType is from the booz function in fn.php, in the array in that booz function the values per item are set to the type of booz that they are ( the boozitem => booztype ). The table that these values are in is never actually shown but their values are used here to get the correct items by their type. 
        var bType = $('td.boozType');
        $('#booz_type_header').hide();
        bType.each(function () {
            if(this.innerHTML == 1) {
                $(this).parent().show();
                bType.hide();
            }
            else {
                $(this).parent().hide();
            }
        })
    })
})

//see above function
$(document).ready(function() {
    $('.boozTypes #wine').click(
    function () {
        $('#submitBtn').show();
        $('#booz').show();
        var dists = [$('#soDiv'),$('#coDiv'),$('#crDiv'),$('#yoDiv')];
        for(var these in dists) {
            dists[these].removeClass('active');
            dists[these].hide();
        }
        
        $('.boozDists li').each(function() {
            $(this).removeClass('selectedDiv');
        })
        $('.typesSelected').each(function () {
            $(this).removeClass('typesSelected');
        })
        $(this).addClass('typesSelected');
        var bType = $('td.boozType');
        $('#booz_type_header').hide();
        bType.each(function () {
            if(this.innerHTML == 2) {
                $(this).parent().show();
                bType.hide();
            }
            else {
                $(this).parent().hide();
            }
        })
    })
})

//see 2 functions up
$(document).ready(function() {
    $('.boozTypes #bottleBeer').click(
    function () {
        $('#submitBtn').show();
        $('#booz').show();
        var dists = [$('#soDiv'),$('#coDiv'),$('#crDiv'),$('#yoDiv')];
        for(var these in dists) {
            dists[these].removeClass('active');
            dists[these].hide();
        }
        
        $('.boozDists li').each(function() {
            $(this).removeClass('selectedDiv');
        })
        $('.typesSelected').each(function () {
            $(this).removeClass('typesSelected');
        })
        $(this).addClass('typesSelected');
        var bType = $('td.boozType');
        $('#booz_type_header').hide();
        bType.each(function () {
            if(this.innerHTML == 3) {
                $(this).parent().show();
                bType.hide();
            }
            else {
                $(this).parent().hide();
            }
        })
    })
})

//see 3 functions up
$(document).ready(function() {
    $('.boozTypes #kegBeer').click(
    function () {
        $('#submitBtn').show();
        $('#booz').show();
        var dists = [$('#soDiv'),$('#coDiv'),$('#crDiv'),$('#yoDiv')];
        for(var these in dists) {
            dists[these].removeClass('active');
            dists[these].hide();
        }
        
        $('.boozDists li').each(function() {
            $(this).removeClass('selectedDiv');
        })
        $('.typesSelected').each(function () {
            $(this).removeClass('typesSelected');
        })
        $(this).addClass('typesSelected');
        var bType = $('td.boozType');
        $('#booz_type_header').hide();
        bType.each(function () {
            if(this.innerHTML == 4) {
                $(this).parent().show();
                bType.hide();
            }
            else {
                $(this).parent().hide();
            }
        })
    })
})

//see 4 functions up
$(document).ready(function() {
    $('.boozTypes #NA').click(
    function () {
        $('#submitBtn').show();
        $('#booz').show();
        var dists = [$('#soDiv'),$('#coDiv'),$('#crDiv'),$('#yoDiv')];
        for(var these in dists) {
            dists[these].removeClass('active');
            dists[these].hide();
        }
        
        $('.boozDists li').each(function() {
            $(this).removeClass('selectedDiv');
        })
        $('.typesSelected').each(function () {
            $(this).removeClass('typesSelected');
        })
        $(this).addClass('typesSelected');
        var bType = $('td.boozType');
        $('#booz_type_header').hide();
        bType.each(function () {
            if(this.innerHTML == 5) {
                $(this).parent().show();
                bType.hide();
            }
            else {
                $(this).parent().hide();
            }
        })
    })
})
$(document).ready(function () {
    $('.boozTypes').children().on('click', function () {
        if($(this).hasClass('typesSelected')) {
            $('form h2').remove();
            $('form').prepend('<h2 id = "tblTitle">' + this.id.toLowerCase() + '</h2>');
        }
    })
})
/*
//Added this because I was going to have a button to disable the dialogs so they don't keep getting in the way of the page's functionality. I'm going to temporarily just comment out the man.js page until I get this part right.
$(document).ready(function () {
    $('body').append('<p id = "dialogOff">one</p>');
    $('#dialogOff').css({
        'position' : 'absolute',
        'top' : '15%',
        'left' : '85%',
        'backgroundColor' : '#36486b',
        'width' : '7%',
        'border-radius' : '25%',
        'box-shadow' : 'box-shadow: 14px 4px 3px grey;',
        'font-family' : 'Helvetica',
        'color' : '#FFFFFF',
        'text-align' : 'center',
        'z-index' : '7'
    });

    $('#dialogOff').click(function() {
        $('#manDialog').css('height','0px');
        $('#manDialog').css('width','0px');
        
    })
})
*/
