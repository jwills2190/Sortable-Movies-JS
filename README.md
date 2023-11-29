## Sortable Movies JavaScrpt Project
### Sorting movies array of 
This project dynamically generates a web page of movie info, consisting of a grid of divs, each containing a movie poster image and info about the film.

Let's start by checking out the final product:

The movies load in alphabetical order, although leading articles (A, The) are ignorned, so "A Beautiful Mind" starts with "B" and "The Deer Hunter" starts with "D".

Choosing from the select menu calls a function that sorts the movies array by the selected keys:
**Year**. The movies are reordered from oldest to newest
**Descending** to reverse the order (newest to oldest).
**Name** sorts movies alphabetically, by name from A-Z (ignoring leading articles)
**oscars** sorts movies by number of Academy Awards won
**tomatometer** sorts movies by Rotten Tomatoes score in descending order
Check/uncheck the **Descending** checkbox to reverse sort order.

The main functions:
**sortMovies()** does the sort by object key, which is the select menu value; function ends with a call to renderMovies().
**renderMovies()** iterates the **movies.js** array of movie objects using the data to make DOM elements, dynamically.
The checkbox has an inline function that reverses movies.js array order and calls renderMovies(). 