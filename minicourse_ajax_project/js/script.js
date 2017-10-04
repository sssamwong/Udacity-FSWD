
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    $greeting.text('So, you want to live at ' + address + '?');

    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address + '';

    // load streetview
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

    //NYTimes AJAX request here

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += '?' + $.param({
        'api-key': "cff6129e07b84f0c928893806dfd6081",
        'q': cityStr,
        'sort': "newest",
        'page': 0
    });


    $.getJSON(url, function(data) {
        $nytHeaderElem.text('New York Times Articles About ' + cityStr);
        articles = data.response.docs;
        $.each(articles, function(i, article) {
            $nytElem.append('<li class="article">' + '<a href="' + article.web_url + '">' + article.headline.main + '</a>' + '<p>' + article.snippet + '</p>' + '</li>');
        });
    }).error(function(e){
            $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
    });


    return false;
};

$('#form-container').submit(loadData);
