require("dotenv").config();
var keys = require('./keys.js');
var fs = require('fs');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var omdb = require('omdb');

// Create Objects using modules' Constructor Functions

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// Deconstruct command line entry

var command = process.argv[2];
var commandArg = process.argv.slice(3).join(" ");

// Switch app functionality based on command

switch (command) {
  case "my-tweets":
    if (commandArg.charAt(0) == '@') fetchTweets(commandArg);
    else fetchTweets('@RyWest88');
    break;

  case "spotify-this-song":
    if (commandArg) requestSpotify(commandArg);
    else requestSpotify("The Sign Ace of Base");
    break;

  case "movie-this":
    if (commandArg) requestOMDB(commandArg);
    else requestOMDB("Mr. Nobody");
    break;

  case "do-what-it-says":
    doWhatSays();
    break;

  default:
    if (command) console.log('Invalid command!');
    console.log("Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says");
}

function fetchTweets(user) {
  var params = {screen_name: user, count: 20};
  // API
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (error) return console.log(error);
    for (i in tweets) {

      console.log(`\n\n\t============= Tweet #${parseInt(i) + 1} ===============`);
      console.log(tweets[i].text.split(" ").slice(0, 12).join(" "));
      console.log(tweets[i].text.split(" ").slice(12).join(" "));
      console.log(`\n\tTweeted on ${tweets[i].created_at}`);

    }
  });
}

function requestSpotify(song) {
  // API
  spotify.search({type: 'track', query: song, limit: 1}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    console.log(`
      Song Title: ${data.tracks.items[0].name}
      Artist: ${data.tracks.items[0].artists[0].name}

      Track ${data.tracks.items[0].track_number} on ${data.tracks.items[0].album.name}
      Release Date: ${data.tracks.items[0].album.release_date}

      Preview: ${data.tracks.items[0].preview_url}
    `);

  });
}

function requestOMDB(movie) {
  var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
  request() // to be completed
}

function doWhatSays() {
  // to be completed
}
