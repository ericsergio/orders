/*function header() {
    var num = 15;
    $('.headerNav li').each(
        function () {
           $(this).css('left', num + '%');
           $(this).css('color', 'red');
            num += 10;
        }   
    )   
}
*/
$(document).ready(
    function () {
    var num = 10;
    if(this.location.href.search('index.php') > 0) {
        $('.headerNav li:first').remove();
    }
    $('.headerNav li').each(
        function () {
            $(this).css('left', num + '%');
            num += 40;
        }
    )
})

/*$(document).ready(function () {
    var itemInfo = $('#itemInfoPage')
    var itemInfoHref = itemInfo.attr('href');
    var newItemInfoHref = itemInfoHref.replace('pages/', '');
    if (this.location.href.includes('pages')) {
        itemInfo.attr('href', newItemInfoHref);
    }
})*/
$(document).ready(function () {
    var winWidth = $('header')[0].clientWidth;
    var first = winWidth * .15, second = winWidth * .30, third = winWidth * .45, fourth = winWidth * .60, fifth = winWidth * .75;
    $('#liquor').css('left', first);
    $('#wine').css('left', second);
    $('#bottleBeer').css('left', third);
    $('#kegBeer').css('left', fourth);
    $('#NA').css('left', fifth);
    /*var tabs = [$('#liquor'), $('#wine'), $('#bottleBeer'), $('#kegBeer'), $('#NA')];
    var num = 0;
    for(var i = first;i < winWidth; i+=first) {
        var px = i + 'px';
        console.log(px);
        tabs[num].css('left', px);
        num += 1;
    }
    */
})
function resizeHead() {
    var headListItemWidth = Number($('.headerNav li').css('width').replace('px', ''));
    var headWidth = Number($('header').css('width').replace('px', ''));
    var fSzProp = headWidth * .0205;
    var headListItemPercent = headListItemWidth / headWidth;
    $('.headerNav li').each(function () {
        $(this).css('fontSize', fSzProp);
    })
}
