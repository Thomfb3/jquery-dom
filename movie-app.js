

$(document).ready(function () {

    $("#submit").on("click", function (e) {
        event.preventDefault();

        //Validate movie input
        let movieString = $("#movie-title").val();
        if (movieString === "" || movieString.length < 2) {
            alert("We need a valid movie title");
            return;
        }

        //Validate rating input
        let ratingNumber = $("#movie-rating").val();
        if (Number.isFinite(ratingNumber) || ratingNumber < 0 || ratingNumber > 10 || ratingNumber === '') {
            alert("We need a valid movie rating: 0 - 10");
            return;
        }

        //Container for movie ratings
        const container = $("#movie-container");
        //createe movie ratings Elements and class 
        const div = $("<div></div>").addClass("movie p-4 d-flex d-flex justify-content-between").attr("data-rating", ratingNumber);
        const p1 = $("<p></p>").text($("#movie-title").val());
        const p2 = $("<p></p>").text($("#movie-rating").val());
        const btn = $("<button></button>").text("Delete").addClass("btn btn-danger");
        //Append to all to the DOM
        $(p1).appendTo(div);
        $(p2).appendTo(div);
        $(btn).appendTo(div);
        $(div).appendTo(container);
        //Clear Inputs
        $("#movie-title").val("");
        $("#movie-rating").val("");
    });

    //Target delete buttons and remove parent object
    $("#movie-container").on("click", function (e) {
        if (e.target.tagName === 'BUTTON') {
            $(e.target).parent().remove();
        }
    });




    //Define Movie Map to sort movie titles
    const moviesMap = new Map();
    //Define Ratings Map to sort movie ratings
    const ratingsMap = new Map();
    //movieContainer contains our list of movies  
    const movieContainer = $("#movie-container");

    //Event listener for sort-az 
    $("#sort-az").on("click", function () {
        //clear the map of anything
        moviesMap.clear();

        //Loop through movie container, set map with every movie title and parent DOM element
        for (let i = 0; i < movieContainer.children().length; i++) {
            const thisMovie = movieContainer.children()[i];
            moviesMap.set($(thisMovie).children()[0].innerText.toLowerCase(), $(thisMovie));
        }

        //Sort our map by our keys -> movie tiles
        let sortedMoviesByAz = new Map([...moviesMap.entries()].sort());
        //Empty movie container 
        movieContainer.innerText = "";

        //Populate the movie container with all values -> DOM elements with the whole movie entry
        for (let movie of sortedMoviesByAz.values()) {
            $(movie).appendTo(movieContainer);
        }
    });


    //Event listener for sort- lowest to highest
    $("#sort-rating-L-to-H").on("click", function () {
        //clear the map of anything
        ratingsMap.clear();

        //Loop through movie container, set map with every parent DOM element and movie rating
        for (let i = 0; i < movieContainer.children().length; i++) {
            const thisMovie = movieContainer.children()[i];
            ratingsMap.set($(thisMovie), $(thisMovie).children()[1].innerText);
        }

        //Sort our map by our values -> movie ratings
        let sortedMoviesByRating = new Map([...ratingsMap.entries()].sort((a, b) => a[1] - b[1]));
        //Empty movie container 
        movieContainer.innerText = "";

         //Populate the movie container with all keys -> DOM elements with the whole movie entry
        for (let movie of sortedMoviesByRating.keys()) {
            $(movie).appendTo(movieContainer);
        }
    });

    //Event listener for sort- highest to lowest
    $("#sort-rating-H-to-L").on("click", function () {
        //clear the map of anything
        ratingsMap.clear();

        //Loop through movie container, set map with every parent DOM element and movie rating
        for (let i = 0; i < movieContainer.children().length; i++) {
            const thisMovie = movieContainer.children()[i];
            ratingsMap.set($(thisMovie), $(thisMovie).children()[1].innerText);
        }

        //Sort our map by our values -> movie ratings
        let sortedMoviesByRating = new Map([...ratingsMap.entries()].sort((a, b) => b[1] - a[1]));
        //Empty movie container 
        movieContainer.innerText = "";

         //Populate the movie container with all keys -> DOM elements with the whole movie entry
        for (let movie of sortedMoviesByRating.keys()) {
            $(movie).appendTo(movieContainer);
        }
    });















});






