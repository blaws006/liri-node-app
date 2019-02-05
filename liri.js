//Global Variables - Importing the keys and modules
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");
var keys = require("./keys.js");

//Global variable
// Let's implement yargs and simplify this switch case scenario
var params = process.argv.slice(2);
var paramName = process.argv.slice(3).join("+");
//Switch Case - Evaluates command and runs the appropriate function
switch (params[0]) {
  case "my-tweets":
    twitterMe(); //Shows tweets from my alias Twitter profile...
    break;
  case "spotify-this-song":
    if (params[1]) {
      spotifyMe() //If command is followed by a song...
    } else {
      paramName = "Meditate"; //If not, Meditate by EARTHGANG will show up
      spotifyMe();
    }
    break;
  case "movie-this":
    if (params[1]) { //If command is followed by a movie...
      movieInfo();
    } else { //If not, Mr. Nobody will pop up
      paramName = "Mr. Nobody";
      movieInfo();
    }
    break;
  case "do-what-it-says": //Reads random.txt file and runs 
    itSays();

};

function twitterMe() {
  var client = new Twitter(keys.twitterKeys); //Grabs the Twitter key
  var screen = {
    screen_name: 'power_max302'
  }; //This grabs the user timeline. Up to 20 posts
  client.get('/statuses/user_timeline/', screen, function (error, tweets, response) {
    if (error) throw error;
    for (var i = 0; i < tweets.length; i++) {
      console.log(tweets[i].text);
    };
  });
};


//Spotify Function. Grabs song information (artist, song, album, preview link). Defaults to Meditate (Earthgang) if no song is entered.
// Let's create a cleaner scenario for the error Handling.
function spotifyMe() {
  var spotify = new Spotify(keys.spotifyKeys);
  spotify.search({
    type: "track",
    query: paramName
  }, function (err, data) {
    if (err) {
      console.log('Artist could not be found');
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
//Function that grabs movie info. If no movie selected defaults to Mr. Nobody...
function movieInfo() {
  request("http://www.omdbapi.com/?t=" + paramName + "&y=&plot=short&apikey=40e9cece", function (error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {

      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      var movieResult = [JSON.parse(body).Title, JSON.parse(body).Year, JSON.parse(body).imdbRating, JSON.parse(body).Ratings[1].Value, JSON.parse(body).Country, JSON.parse(body).Language, JSON.parse(body).Plot, JSON.parse(body).Actors];
      for (var i = 0; i < movieResult.length; i++) {
        console.log(movieResult[i]);
      }
    } else {
      throw (error);
    }
  });
};
//Function that reads the random.txt document. After reading it executes the command within the document.
function itSays() {
  fs.readFile("random.txt", "utf8", function (err, data) {
    if (err) {
      console.log(err);
    }
    var dataArr = data.split(",");
    for (var i = 0; i < dataArr.length; i++) {
      params[1] = dataArr[1];

    }
    spotifyMe();
  });

};