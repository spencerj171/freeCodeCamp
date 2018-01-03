var url = "https://wind-bow.gomix.me/twitch-api/streams/";
var featured = [];
var channel;
var fullUrl;
var channelUrl;
var logo;
var status;
var game;


$(document).ready(function(){
  getStreamer();
  getFeatured();
});


function getStreamer(){
  fullUrl = url + "freecodecamp";
    data = $.ajax({
      type: "GET",
      url: fullUrl,
      dataType: 'jsonp',
      data: {format: "json"},
      success: function(data){
        channel = "freecodecamp";
        logo = "https://discourse-user-assets.s3.amazonaws.com/optimized/2X/c/cf6e8e0a75acb7aa900eb304270a6407ae1d9e2c_1_690x388.jpg";
        $('#output').append("<a target='_blank' href='https://twitch.tv/" + channel + "'<span class='col-lg-4'><img src='" + logo + "'></span></a>");
        $('#output').append("<a target='_blank' href='https://twitch.tv/" + channel + "'<span class='col-lg-4' id='fchannel'>" + channel + "</span></a>");
        if(data.stream === null){
          game = "offline";
          $('#output').addClass('offline streamers');
          $('#output').append("<span class='col-lg-4' id='fgame'>" + game + "</span>");
        } else{
          game = data.stream.game;
          $('#output').addClass('online streamers');
          if(game.length < 17){
            $('#output').append("<span class='col-lg-4' id='fgame'>" + game + "</span>");
          } else{
            var short = game.slice(0, 17);
            $('#output').append("<span class='col-lg-4' id='fgame'>" + short + "...</span>");
          }
        }
      }
    });
  }


function getFeatured(){
  data = $.ajax({
      type: "GET",
      url: url + "featured",
      dataType: 'jsonp',
      data: {format: "json"},
      success: function(data){
        for(var i = 0; i < data.featured.length; i++){
          logo = data.featured[i].image;
          channel = data.featured[i].stream.channel.name;
          game = data.featured[i].stream.game;
          featured.push([logo, channel, game]);
        }
        for(var i = 0; i < featured.length; i++){
          for(var j = 0; j < featured[i].length; j++){
            if(j === 0){
              if(data.featured[i].image === ""){
                logo = "http://waterfallsoftasmania.com.au/uploads/waterfalls/featured/medium/medium_no_image_available.jpg";
                $('#featured' + i).append("<a target='_blank' href='https://twitch.tv/" + channel + "'<span class='col-lg-4'><img src='" + logo + "'></span></a>");
              } else{
                $('#featured' + i).append("<a target='_blank' href='https://twitch.tv/" + channel + "'<span class='col-lg-4'><img src='" + featured[i][j] + "'></span></a>");
              }
            } else if(j ===1){
              $('#featured' + i).append("<a target='_blank' href='https://twitch.tv/" + channel + "'<span class='col-lg-4' id='channel'>" + featured[i][j] + " </span></a>");
            }
            else{
              if(featured[i][j].length < 17){
                $('#featured' + i).append("<span class='col-lg-4' id='game'>" + featured[i][j] + " </span>");
              } else{
                var short = featured[i][j].slice(0, 17);
                $('#featured' + i).append("<span class='col-lg-4' id='game'>" + short + "...</span>");
              }
            }
          }
        }
      }
  });
}
