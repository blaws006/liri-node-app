var Twitter = require('twitter'); 
var Spotify = require('node-spotify-api');

var keys = require("./keys.js");

// console.log(keys);

var client = new Twitter(keys.twitterKeys);
var spotify = new Spotify(keys.spotifyKeys);

// console.log(client)
var params = {screen_name: 'power_max302'};
client.get('/statuses/user_timeline/', params , function(error, tweets, response){
    if(error) throw error;
    for(var i = 0; i < tweets.length; i++){
    console.log(tweets[i].text);
    };
  });

  var song = process.argv.slice(2);

  spotify.search({ type: "track", query: song}, function(err, data) {
    if (err){
      console.log( err );
      return;
    }
    else {
      var songInfo = data.tracks.items[0];
      var songResult = console.log(songInfo.artists[0].name)
                      console.log(songInfo.name)
                      console.log(songInfo.album.name)
                      console.log(songInfo.preview_url) 
      console.log(songResult);                 
      }
  });
  
  
