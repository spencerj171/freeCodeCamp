$(document).ready(function(){
  searchInput();
});

//Stores user input in a variable
function searchInput(){
  $('#searchSubmit').on("click", function(){
    var userInput = document.getElementById('searchText').value;
    url = "https://en.wikipedia.org/w/api.php?action=opensearch&limit=10&format=json&search=" + userInput;
    $('.results').empty();
    getSearchResults();
  });
  $('#searchText').keyup(function(e) {
    if(e.which == 13) {
      $('#searchSubmit').click();
    }
  });
}

//Requests results of the search
function getSearchResults(){
  data = $.ajax({
    type: "GET",
    url: url,
    dataType: 'jsonp',
    headers: { 'Api-User-Agent': 'Example/1.0' },
    success: function(data){

      for(var j = 0; j < data[1].length; j++){
        for(var i = 1; i < 4; i++){
          if(i===1){
            $('#result' + (j+1)).append("<span class='bold'>" + data[i][j] + ": </span><br>");
          }
          else if(i===2){
            $('#result' + (j+1)).append(data[i][j]);
          }
          else if(i===3){
            $('#result' + (j+1)).append("<br><a href='" + data[i][j] + "' target='_blank'>" + data[i][j] + "</a>");
            $('#result' + (j+1)).addClass('results');
          }
        }
      }

    }
  });
}
