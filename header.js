$(document).ready(
    function () {
    //var num = 10;
    if(this.location.href.search('index.php') > 0) {
        $('.headerNav li:first').remove();
    }
});
function resizeHead() {
    var headListItemWidth = Number($('.headerNav li').css('width').replace('px', ''));
    var headWidth = Number($('header').css('width').replace('px', ''));
    var fSzProp = headWidth * .0205;
    var headListItemPercent = headListItemWidth / headWidth;
    $('.headerNav li').each(function () {
        $(this).css('fontSize', fSzProp);
    });
};
function resizeDists() {
    var distListItemWidth = Number($('.boozDists li').css('width').replace('px', ''));
    var headWidth = Number($('header').css('width').replace('px', ''));
    var fSzProp = headWidth * .02913;
    var distListItemPercent = distListItemWidth / headWidth;
    $('.rightSideBar .boozDists li').each(function () {
        $(this).css('fontSize', fSzProp);
    });
};
function resizeTypes() {
    var typesListItemWidth = Number($('ul.boozTypes li').css('width').replace('px', ''));
    var headWidth = Number($('header').css('width').replace('px', ''));
    var fSzProp = headWidth * .02913;
    var typesListItemPercent = typesListItemWidth / headWidth;
    $('ul.boozTypes li').each(function () {
        $(this).css('fontSize', fSzProp);
    });
};
function resizeTopControls() {
    var topControlsListItemWidth = Number($('ul.tblOpenControls li').css('width').replace('px', ''));
    var headWidth = Number($('header').css('width').replace('px', ''));
    var fSzProp = headWidth * .02913;
    var topControlsListItemPercent = topControlsListItemWidth / headWidth;
    $('ul.tblOpenControls li').each(function () {
        $(this).css('fontSize', fSzProp);
    });
};
function resizeHeadAndDists() {
    resizeHead();
    resizeDists();
};
function resizeHeadDistsAndTypes() {
    resizeHeadAndDists();
    resizeTypes();
};
function resizeHeadAndTopControls() {
    resizeHead();
    resizeTopControls();
}