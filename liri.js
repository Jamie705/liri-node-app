var request = require('request');
var fs = require('fs');
var Spotify = require('node-spotify-api');

var dotenv = require("dotenv").config();
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

// //Loading modules

var command = process.argv[2];
var input = process.argv[3];

//    * `concert-this`

//     * `spotify-this-song`
function spotifyIt(musicSearch) {
    spotify.search({ type: 'track', query: musicSearch }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
//  * If no song is provided then your program will default to "The Sign" by Ace of Base.
        // if (musicQuery === undefined) {
        //     musicQuery = defaultSong;
                    
        else {
            for (i = 0; i < data.tracks.items.length && i < 5; i++){
            
                var musicQuery = data.tracks.items[i];
                // console.log("===============================");
                console.log("Artist: " + musicQuery.artists[0].name +
                "\nSong Name: " + musicQuery.name +
                "\nLink to Song: " + musicQuery.preview_url +
                "\nAlbum Name: " + musicQuery.album.name +
                "\n===============================");
           }
        };
        
    });
}
// spotifyIt();


    // * `movie-this`
function movieIt (movieQuery) {
    
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieQuery + "&y=&plot=short&apikey=trilogy";
    // + movieQuery +
    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {
        
// * If the user doesn't type a movie in, the program will output data for the movie 'Mr.Nobody.'
            // console.log("The movie's rating is: " + JSON.parse(body).Title);
            var movieData = JSON.parse(body);

            // for (i = 0; i < movieData.length && i < 5; i++) {
               
                console.log("===============================");
            // * Title of the movie.              
                console.log("Movie Title: " + movieData.Title +
            // * Year the movie came out.
                "\nYear: " + movieData.released +
            // * IMDB Rating of the movie.
                "\nIMDB Rating: " + movieData.imdbRating +
            // * Rotten Tomatoes Rating of the movie.
                "\nRotten Tomatoes Rating: " + movieData.Ratings[1].Value +
            // * Country where the movie was produced.
                "\nCountry: " + movieData.Country +
            // * Language of the movie.
                "\nLanguage: " + movieData.Language +
            // * Plot of the movie.
                "\nPlot: " + movieData.Plot +
            // * Actors in the movie.
                "\nActors: " + movieData.Actors +
                "\n===============================");             
            // }
        };
    });
}

// movieIt();

// Switch for commands for all functions
var ask = function (command, funData){
    switch(command) {
        case "concert-this":
            concert(funData);
            break;
        case "movie-this" :
            movieIt(funData);
            break;
        case 'spotify-this-song':
            spotifyIt(funData); 
            break;
        case 'do-what-it-says':
            doWhatItSays(); 
            break;
        default:
        console.log("Bad command.");
    }
};

var doWhatItSays = function() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) throw err;
            var randomText = data.split(",");
        
        if (randomtext.length == 2) {
            ask (randomText[0], randomText [1]);
        }
        else if (randomText.length == 1) {
            ask(randomText[0]);
        }
    });
}

ask (command, input);
