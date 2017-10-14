var Twitter = require('twitter'); 

var keys = require("./keys.js");

// console.log(keys);

var client = new Twitter(keys);
// console.log(client)
var params = {screen_name: 'power_max302'};
client.get('/statuses/user_timeline/', params , function(error, tweets, response){
    if(error) throw error;
    for(var i = 0; i < tweets.length; i++){
    console.log(tweets[i].text);
    };
  });