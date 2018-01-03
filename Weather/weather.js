var url = "";
var gurl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCrBes2R9nOEvbMHMoJ4oCTzSNGaOD6eQc&callback=initMap";
var degree = '<span id="forc"><a href="" class="switch" id="f"> F</a> | <a href="" class="switch" id="c">C</a></span>';
var apiOpen = "d32fada3b37530ca403693700ae6c134";
var map;
var tempSwitch = false;

$(document).ready(function(){
  getLocation();
});

//Get location of user
function getLocation(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      url = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=d32fada3b37530ca403693700ae6c134";
      getWeather();
      initMap();
    });
  } else{
    alert("Please allow location services.")
  }
}

//Retrieve weather
function getWeather(){
  data = $.ajax({
    type: "GET",
    url: url,
    dataType: 'jsonp',
    success: function(json){
       current = fahrenheit(json.main.temp);
       low = fahrenheit(json.main.temp_min);
       high = fahrenheit(json.main.temp_max);

      $("#location").html("<div id='location'>" + json.name + " Weather</div>");
      $("#currentTemp").html("<span class='ftemp' id='currentTemp'>" + current + "&deg;" + "</span>");
      $("#icon").html("<span id='icon'><img src='https://openweathermap.org/img/w/" + json.weather[0].icon + ".png'></span>");
      $("#description").html("<span id='description'>" + json.weather[0].description.toUpperCase()) +"</span>";
      $("#lowTemp").html("<span class='ftemp' id='lowTemp'>&#x2193; " + low + "&deg; " +  "</span>");
      $("#highTemp").html("<span class='ftemp' id='highTemp'>&#x2191; " + high + "&deg; " + "</span>");
      $("#humidity").html("<div id='humidity'>Humidity: " + json.main.humidity + "%</div>");
    }
  });
  switchTemp();
}

//Create Map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: latitude, lng: longitude},
    zoom: 10
  });
}

//Convert temperature
function fahrenheit(kel){
  var f = Math.floor(9/5 * (kel - 273) + 32);
  return f;
}
function fahr(c){
  var fahr = Math.floor((c * 9/5) + 32);
  return fahr;
}
function celsius(f){
  var c = Math.floor((f - 32) * 5/9);
  return c;
}

//Switch temperature
function switchTemp(){
  $("#c").on("click", function(){
    if(tempSwitch === false){
      $("#currentTemp").html("<span id='currentTemp'>" + celsius(current) + "&deg;" + "</span>");
      $("#lowTemp").html("<span id='lowTemp'>&#x2193; " + celsius(low) + "&deg; " +  "</span>");
      $("#highTemp").html("<spanid='highTemp'>&#x2191; " + celsius(high) + "&deg; " + "</span>");
      tempSwitch = true;
      current = celsius(current);
      low = celsius(low);
      high = celsius(high);
    }
  });
  $("#f").on("click", function(){
    if(tempSwitch === true){
      $("#currentTemp").html("<span id='currentTemp'>" + fahr(current) + "&deg;" + "</span>");
      $("#lowTemp").html("<span id='lowTemp'>&#x2193; " + fahr(low) + "&deg; " +  "</span>");
      $("#highTemp").html("<spanid='highTemp'>&#x2191; " + fahr(high) + "&deg; " + "</span>");
      tempSwitch = false;
      current = fahr(current);
      low = fahr(low);
      high = fahr(high);
    }
  });
}
