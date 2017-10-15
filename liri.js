//Global Variables - Importing the keys and modules
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");
var keys = require("./keys.js");


var command = process.argv[2];
var params = process.argv.slice(2);
switch (params[0]) {
  case "my-tweets":
    twitterMe();
    break;
  case "spotify-this-song":
    if (params[1]) {
      spotifyMe()
    } else {
      params[1] = "Meditate";
      spotifyMe();
    }
    break;
  case "movie-this":
    if (params[1]) {
      movieInfo();
    } else {
      params[1] = "Mr. Nobody";
      movieInfo();
    }
    break;
};

// console.log(keys);

function twitterMe() {
  var client = new Twitter(keys.twitterKeys);
  var screen = {
    screen_name: 'power_max302'
  };
  client.get('/statuses/user_timeline/', screen, function (error, tweets, response) {
    if (error) throw error;
    for (var i = 0; i < tweets.length; i++) {
      console.log(tweets[i].text);
    };
  });
};


function spotifyMe() {
  var spotify = new Spotify(keys.spotifyKeys);

  spotify.search({
    type: "track",
    query: params[1]
  }, function (err, data) {
    if (err) {
      console.log(err);
      return;
    } else {
      var songInfo = data.tracks.items[0];
      var songResult = console.log(songInfo.artists[0].name)
      console.log(songInfo.name)
      console.log(songInfo.album.name)
      console.log(songInfo.preview_url)
      // console.log(songResult);                 
    }
  });
};

function movieInfo() {

  request("http://www.omdbapi.com/?t=" + params[1] + "&y=&plot=short&apikey=40e9cece", function (error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {

      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      var movieResult = [JSON.parse(body).Title, JSON.parse(body).Year, JSON.parse(body).imdbRating, JSON.parse(body).Ratings[1].Value, JSON.parse(body).Country, JSON.parse(body).Language, JSON.parse(body).Plot, JSON.parse(body).Actors];
      for (var i = 0; i < movieResult.length; i++) {
        console.log(movieResult[i]);
      }
    }
  });
};

