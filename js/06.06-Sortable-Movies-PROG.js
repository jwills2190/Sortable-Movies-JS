// Lesson 06.06 - START

// warm up: convert movie name to file name:
let movieNames = [
    "2001: A Space Odyssey", 
    "The Wolf of Wall Street", 
    "Look Who's Talking"
];

// write a function that takes in a movie name and returns an array of corresponding file names
// such that if movie name is '2001: A Space Odyssey', file name is 
// "2001-a-space-odyssey"
const fileNameArr = [];

function makeMovieFileName(movieNames) {
    for (let i = 0; i < movieNames.length; i++) {
        movieNames[i] = movieNames[i].replaceAll(" ", "-");
        let fileNames = movieNames[i];
        fileNames = fileNames.replaceAll(",", "");
        fileNames = fileNames.replaceAll(":", "");
        fileNames = fileNames.replaceAll("'", "");
        fileNameArr.push(fileNames.toLowerCase()+ ".jpg");
    }
    
    return fileNameArr;
}

const fileNames = console.log(makeMovieFileName(movieNames));

// expected output:
// [
    // "2001-a-space-odyssey.jpg", 
    // "the-wolf-of-wall-street.jpg", 
    // "look-who's-talking.jpg"
// ];

// Have to remove punctuation
// 4 punctuation marks to consider: ":, "
// HINT: replaceAll()

// 7. Start by getting the **movie-holder** div, for displaying the movies:
const movieHolder = document.querySelector('.movie-holder');

// 7B. Get the checkbox:
const descCB = document.getElementById('cb');
// on check/uncheck (change event) reverse order of sort and call renderMovies
descCB.addEventListener('change', function() {
    movies.reverse();
    renderMovies();
});


// 7C. Get the select menu and have it call sortMovies function:
const selectMenu = document.querySelector('select');
selectMenu.addEventListener('change', sortMovies);

// 7D. Populate the select menu with dynamically generated option tags:
// make an array of movie object keys, then iterate over the array
// save the movie obj keys to an array; all obj have same keys
// so use any of the movies array's objects as the object
const movieKeys = Object.keys(movies[0]);
console.log('array movie object keys:', movieKeys);

for (let i = 0; i < movieKeys.length; i++) {
    let key = movieKeys[i];
    if (key != "Genres" && key !="director") {
        // make a new option for that key and add it to select menu:
        const optn = document.createElement('option');
        // give the option its required value and text:
        optn.value = key; // leave value lowercase to match data set
        optn.text = key[0].toUpperCase() + key.slice(1); // capitalize to look nice for user: Year
        if (key == 'name') optn.selected = true;
        selectMenu.appendChild(optn);
    }
}


// 8. loops the movies and add 3 new properties (noArticle, hm, fileName)
for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    let hrs = Math.floor(movie.duration/60); // 2.916 => 2
    let mins = movie.duration % 60; 
    movie.hm = `${hrs}h ${mins}m`

    let movieName = movie.name;
    movieName = movieName.replaceAll(" ", "-");
    movieName = movieName.replaceAll(",", "");
    movieName = movieName.replaceAll(":", "");
    movieName = movieName.replaceAll("'", "");
    movieName = movieName.replaceAll(".", "");
    movie.fileName = movieName.toLowerCase()+ ".jpg";

    let noArticle = movie.name.replace("The ", "");
    noArticle = noArticle.replace("A ", "");
    movie.noArticle = noArticle;
}

console.log(movies);




// 22. Define the **renderMovies()** function. First thing to do is clear the **movieHolder** of any existing content:
function renderMovies() {

    // clear the movie holder for a fresh render of a new sort order:
    movieHolder.innerHTML = "";

    // 27. Set up a loop to iterate the movies array and simplify the current movie by passing it to a variable:
    for (let i = 0; i < movies.length; i++) {
        const movie = movies[i]
        // 28. Next in the loop, make a div, give it its class and output it to movieHolder:
        const divvy = document.createElement('div');
        divvy.className = 'divvy';
        divvy.textContent = movie.name;
        movieHolder.appendChild(divvy);


        // 29. Still in the loop, make an image object, set its source to the movie's jpg and output it to the div:
        const poster = new Image();
        poster.src = `images/${movie.fileName}`;
        divvy.appendChild(poster);

        // 30. Below the image, output the text info for the movie:
        divvy.innerHTML += movie.name + '<br>';
        divvy.innerHTML += movie.hm + ' - ' + movie.year + '<br>';
        divvy.innerHTML += `Oscars: ${movie.oscars.won} won, ${movie.oscars.nominated} nominated<br>`;
        divvy.innerHTML += `Director: ${movie.director}<br>`;
        divvy.innerHTML += `Rotten Tomatoes: ${movie.tomatometer}`;

    // 31. Close the loop, close the function and Reload the page. The grid of movies should be back, although the sort feature doesn't work yet. That's next.
    }  // end loop

} // end renderMovies()

// call the sortMovies function as soon as the page is ready for it:
// the first sort will be by the default name (A-Z);
// the sortMovies function ends with a call to renderMovies
document.addEventListener('DOMContentLoaded', sortMovies);


// sorting movies

// 32. Get the select menu and have it call the **sortMovies** function:

// 33. Get the checkbox. When a change occurs (check/uncheck), run an inline function that reverses the order of the movies and calls the renderMovies() to refresh the display::

// 34. Define the sortMovies() function and get the menu choice, which is the sort key:
function sortMovies() {

    // 35. Get the value of the select menu, this is the sort key:
    let key = selectMenu.value;
    
    if(key == 'name') {
        key = 'noArticle';
    } 
    // sort names by noArticle key
    // so that "The" movies don't all cluster at the end.

    // oscars is a child object of {won: 1, nominated: 2} so we need oscars.won not just oscars
    // if (key == 'oscars') key = 'oscars.won';

    // 36. Sort according to the sort(callback) for object key:
    // Muse use [] accessor because key is a variable.. cannot use a.key. must be a[key].
    movies.sort(function(a,b) {
        if (key == 'oscars') {
            descCB.checked = 'checked';
            return a[key].won < b[key].won ? 1 : -1;
        } else if(key =='tomatometer') {
            descCB.checked = 'checked'; // or: 'true' since this is a recursive attribute,
            // meaning that the value is same as attribute name: checked = 'checked'
            return a[key] < b[key] ? 1 : -1;
        } else {
            descCB.checked = false;
            return a[key] > b[key] ? 1 : -1;
        }
});          
        //     {
        //         return 1;
        //     } else {
        //         return -1;
        //     } 
        // }else {
        //     if(a[key] > b[key]) {
        //         return 1;
        //     } else {
        //         return -1;
        //     }
        // }
  

    // 38. Still inside sortMovies(), call the renderMovies() function and then end the sortMovies() function:
    renderMovies();

} // end sortMovies()

