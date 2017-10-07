/*var clickCount = 0;

$("#catPicture").click(function(){
    clickCount = clickCount + 1;
    console.log(clickCount);
    $("#showClickCount").append("<h1>" + clickCount + "</h1>");
    alert(clickCount);
});*/

function catClicker() {
    var clickCount = 0;

   $(".catPicture").click(function(){
        clickCount ++;
        $("h1").replaceWith("<h1>Clicked: " + clickCount + " time(s)</h1>");
    });
}

$(catClicker);