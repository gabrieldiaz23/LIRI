var dotenv = require("dotenv").config();
var fs = require("fs");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

//Cambiar el process argv para que tome el valor correcto
var task = process.argv[2];
var q = process.argv.slice(3).join(' ');

function WriteLog(data) {
    
    var args = process.argv.slice(2).join(' ');

    fs.appendFile("log.txt", args + data + '\n-----------------------------------------\n\n', function(err) {
        if (err) throw err;
       
      });
}

if(!task || !q)
{
    console.log('You did not type anything, so what if you check this badass hit out, tho\n');
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
          return console.log(error);
        }
      
        //console.log(data);
      
        var _data = data.split(",");
      
        spotify.search({ type: 'track', query: _data[1]}, function(err, data) {

            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var _data = data.tracks.items[0];
            var dataArr = [
                'Artist: ' + _data.artists[0].name + '\n',
                'Album: ' + _data.album.name + '\n',
                'Song preview: ' + _data.preview_url + '\n',
                'Song name: ' + _data.name + '\n'
            ];

            for (var i = 0; i < dataArr.length; i++) {
                console.log(dataArr[i]);
            }
            WriteLog(dataArr);
        });
      
    });
}
else if (task === 'spotify-this-song')
{
    spotify.search({ type: 'track', query: q}, function(err, data) {

        if (err) {
          return console.log('Error occurred: ' + err);
        }
        var _data = data.tracks.items[0];
        var dataArr = [
            'Artist: ' + _data.artists[0].name + '\n',
            'Album: ' + _data.album.name + '\n',
            'Song preview: ' + _data.preview_url + '\n',
            'Song name: ' + _data.name + '\n'
        ];
        
        for (var i=0; i < dataArr.length; i++)
        {
            console.log(dataArr[i]);
        }
        WriteLog(dataArr);
        

    });    
}
else if (task === 'movie-this')
{
    var movieQuery = "http://www.omdbapi.com/?t=" + q + "&y=&plot=short&apikey=trilogy";

    axios.get(movieQuery).then(
        function (response) {
            var _data = response.data;
            var dataArr = [
                "Name of the movie: " + _data.Title + '\n',
                "Year the movie came out: " + _data.Year + '\n',
                "IMDb rating: " + _data.imdbRating + '\n',
                "Rotten Tomatoes rating: " + _data.Ratings[1].Value + '\n',
                "Country: " + _data.Country + '\n',
                "Movie language: " + _data.Language + '\n',
                "Actors: " + _data.Actors + '\n',
                "Country: " + _data.Plot + '\n'
            ];
            for (var i = 0; i < dataArr.length; i++) {
                console.log(dataArr[i]);
            }
            WriteLog(dataArr);
        }        
    );
}
else if (task === 'concert-this')
{
    if(!q)
    {
        q = 'Mr. Nobody';
    }
    var concertQuery = "https://rest.bandsintown.com/artists/" + q + "/events?app_id=codingbootcamp";

    axios.get(concertQuery).then(
        function (response) {

            var _data = response.data[0];
            var dataArr = [
                'The artist will be on: ' + _data.venue.name + '\n',
                'Located in: ' + _data.venue.region + ', ' + _data.venue.country + '\n',
                'Date of the concert: ' + _data.datetime + '\n'
            ]
            for (var i = 0; i < dataArr.length; i++) {
                console.log(dataArr[i]);
            }
            WriteLog(dataArr);
        }
    );
}







