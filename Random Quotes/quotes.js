//Requires a plugin to enable cross-origin resource sharing

var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
var count = 0;
var url = "https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
$(document).ready(function() {
    $("#randomQuote").on("click", function(){
      $.getJSON(url, function(json) {
        $(".quote").html('<span id="quoteMark">"</span>' + json.quoteText);
        if (json.quoteAuthor == '') {
          json.quoteAuthor = 'Unknown';
        }
        $(".author").html('- ' + json.quoteAuthor);
        document.body.style.backgroundColor = colors[count];
        document.getElementById("randomQuote").style.background = colors[count];
        document.getElementById("tweet").style.background = colors[count];
        document.getElementsByClassName("quote")[0].style.color = colors[count];
        document.getElementsByClassName("author")[0].style.color = colors[count];
        count++;

        var tweet = 'https://twitter.com/intent/tweet?text=' + json.quoteText + ' - ' + json.quoteAuthor;
        $(".twitter-share-button").attr("href", tweet);
      });
    });
});
