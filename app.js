$('#submitBtn').hide();

//makes it easier to see where you are by adding a class that highlights the entire row when you focus on an input 
//box
$(document).ready(function () {
    $('input').focus(function () {
        if($('tr').hasClass('currentInput')) {
            $('tr').removeClass('currentInput');
        };
        var currInp = $(this);
        var currInpParent = currInp.parent();
        var currInpParentsSiblings = currInpParent.siblings();
        var currInpParentsSiblingsParent = currInpParentsSiblings.parent();
        currInpParentsSiblingsParent.addClass('currentInput');
    });
});

//hides the initital booz table created in fn.php. Also hides the showOrder table created after everything happens in 
//count.php
$(document).ready(function () {
    $('#booz').hide();
    $('.showOrder').hide();
});

//creates the clickable tabs or buttons on the top of the page that shows each booz type by type.

$(document).ready(function () {
    var types = ['liquor', 'wine', 'bottleBeer', 'kegBeer', 'NA'];
    for(var p in types) {
        $('.boozTypes').append('<li id = "' + types[p] + '">' + types[p] + '</li>');
    };
});

//creates the distributer clickable tabs/buttons in the right sidebar that shows the order per each distributer.
$(document).ready(function () {
    var dists = ['Southern', 'Columbia', 'Crown', 'Youngs'];
    for(var p in dists) {
        $('.boozDists').append('<li id = "' + dists[p] + '">' + dists[p] + '</li>');
    };
    var typeMenuHeight = Number($('.typeMenu').css('height').replace('px', ''));
    var boozTypesFont = typeMenuHeight * .7;
    $('.boozTypes li').css('fontSize', boozTypesFont);
    var boozTypesHeight = typeMenuHeight * .9;
    $('.boozTypes').css('height', boozTypesHeight);
    var typeMenuTop = Number($('.typeMenu').css('top').replace('px', ''));
    //var num = typeMenuTop + (typeMenuHeight * 2);
    var boozDistsTopValue = typeMenuTop + typeMenuHeight;
    $('ul.boozDists').css('top', boozDistsTopValue);
    var boozTypesBottom = Number($('.boozTypes').css('bottom').replace('px', ''));
    //console.log('boozTypesBottom: ' + boozTypesBottom);
    //console.log('typeMenuHeight: ' + typeMenuHeight);
    //console.log('boozTypesHeight: ' + boozTypesHeight);
    //$('.boozTypes').css('top', typeMenuTop);
});

//actual click event for the liquor button. The next five functions are basically the same thing so I am only going 
//to comment the first.
$(document).ready(function() {
    $('.boozTypes #liquor').click(
    function () {
        //the submit button sends the form and therefor only needs to be present when one the the type tables are 
        //visible.
        if(window.location.pathname.match('index')) {
            $('#booz').show();
            $('#submitBtn').show();
            var lastDistTop = $('ul.boozDists li:last').offset().top;
            var lastDistHeight = Number($('ul.boozDists li:last').css('height').replace('px', ''));
            var submitTopNum = (lastDistTop + lastDistHeight) * 1.15;
            var submitTopStr = submitTopNum + 'px';
            $('#submitBtn').css('top', submitTopStr);
        };
        //the following array of divs are divs created in o.js, they are the divs that contain the orders per 
        //distributer as a table. When they aren't in focus, this removes the class active and hides the div.
        var dists = [$('#soDiv'),$('#coDiv'),$('#crDiv'),$('#yoDiv')];
        for(var these in dists) {
            dists[these].removeClass('active');
            dists[these].hide();
        };
        //This is here because when the user clicks on the buttons/tabs for the type table, in this case liquor; The 
        //liquor tab is highlighted to indicate what is currently on screen. The same occurs when one of the sidebar 
        //distributers is clicked. so this removes the highlight from the previously clicked item.
        $('.boozDists li').each(function() {
            $(this).removeClass('selectedDiv');
        });
        //removes the class that provides the styling for the selected item from all so that it can add it to only 
        //the currently selected tab/button
        $('.typesSelected').each(function () {
            $(this).removeClass('typesSelected');
        });
        $(this).addClass('typesSelected');
        //td.boozType is from the booz function in fn.php, in the array in that booz function the values per item are set to the type of booz that they are ( the boozitem => booztype ). The table that these values are in is never actually shown but their values are used here to get the correct items by their type. 
        var bType = $('td.boozType');
        $('#booz_type_header').hide();
        bType.each(function () {
            if(this.innerHTML == 1) {
                $(this).parent().show();
                bType.hide();
            }
            //abcabcabcabc
            else {
                $(this).parent().hide();
            };
        });
    });
});

//see above function
$(document).ready(function() {
    $('.boozTypes #wine').click(
    function () {
        if(window.location.pathname.match('index')) {
        $('#submitBtn').show();
            var lastDistTop = $('ul.boozDists li:last').offset().top;
            var lastDistHeight = Number($('ul.boozDists li:last').css('height').replace('px', ''));
            var submitTopNum = (lastDistTop + lastDistHeight) * 1.05;
            var submitTopStr = submitTopNum + 'px';        
            $('#submitBtn').css('top', submitTopStr);
        };
        $('#booz').show();
        var dists = [$('#soDiv'),$('#coDiv'),$('#crDiv'),$('#yoDiv')];
        for(var these in dists) {
            dists[these].removeClass('active');
            dists[these].hide();
        };
        $('.boozDists li').each(function() {
            $(this).removeClass('selectedDiv');
        });
        $('.typesSelected').each(function () {
            $(this).removeClass('typesSelected');
        });
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
            };
        });
    });
});

//see 2 functions up
$(document).ready(function() {
    $('.boozTypes #bottleBeer').click(
    function () {
        if(window.location.pathname.match('index')) {
            $('#submitBtn').show();
            $('#booz').show();
            var lastDistTop = $('ul.boozDists li:last').offset().top;
            var lastDistHeight = Number($('ul.boozDists li:last').css('height').replace('px', ''));
            var submitTopNum = (lastDistTop + lastDistHeight) * 1.05;
            var submitTopStr = submitTopNum + 'px';
            $('#submitBtn').css('top', submitTopStr);
        };
        var dists = [$('#soDiv'),$('#coDiv'),$('#crDiv'),$('#yoDiv')];
        for(var these in dists) {
            dists[these].removeClass('active');
            dists[these].hide();
        };
        $('.boozDists li').each(function() {
            $(this).removeClass('selectedDiv');
        });
        $('.typesSelected').each(function () {
            $(this).removeClass('typesSelected');
        });
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
            };
        });
    });
});

//see 3 functions up
$(document).ready(function() {
    $('.boozTypes #kegBeer').click(
    function () {
        if(window.location.pathname.match('index')) {
            $('#submitBtn').show();
            $('#booz').show();
            var lastDistTop = $('ul.boozDists li:last').offset().top;
            var lastDistHeight = Number($('ul.boozDists li:last').css('height').replace('px', ''));
            var submitTopNum = (lastDistTop + lastDistHeight) * 1.05;
            var submitTopStr = submitTopNum + 'px';
            $('#submitBtn').css('top', submitTopStr);
        };
        var dists = [$('#soDiv'),$('#coDiv'),$('#crDiv'),$('#yoDiv')];
        for(var these in dists) {
            dists[these].removeClass('active');
            dists[these].hide();
        };
        $('.boozDists li').each(function() {
            $(this).removeClass('selectedDiv');
        });
        $('.typesSelected').each(function () {
            $(this).removeClass('typesSelected');
        });
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
            };
        });
    });
});

//see 4 functions up
$(document).ready(function() {
    $('.boozTypes #NA').click(
    function () {
        if(window.location.pathname.match('index')) {
            $('#submitBtn').show();
            $('#booz').show();
            var lastDistTop = $('ul.boozDists li:last').offset().top;
            var lastDistHeight = Number($('ul.boozDists li:last').css('height').replace('px', ''));
            var submitTopNum = (lastDistTop + lastDistHeight) * 1.05;
            var submitTopStr = submitTopNum + 'px';
            $('#submitBtn').css('top', submitTopStr);
        }
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
            };
        });
    });
});
$(document).ready(function () {
    $('.boozTypes').children().on('click', function () {
        if($(this).hasClass('typesSelected')) {
            $('form h2').remove();
            $('form').prepend('<h2 id = "tblTitle">' + this.id.toLowerCase() + '</h2>');
        };
    });
});
$(document).ready(function () {
    $('[id$=_tbl]').each(function () {
        $(this).hide();
    });
});
