var gifCats = ["Apex Legends", "Sly Cooper", "German Shepard", "Telltales", "The Office"];




function displayMovieInfo() {
$("button").on("click", function() {
    
    var gifs = $(this).attr("data-person")
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifs + "&api_key=Do0obuG0reFss2eMQBowwUGByV399wqw";
    
    $("#gifs-appear-here").empty();
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div class='float-left text-center'>");
        
          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var personImage = $("<img>");
          personImage.attr("src", results[i].images.fixed_height.url);

          gifDiv.prepend(p);
          gifDiv.prepend(personImage);

          $("#gifs-appear-here").prepend(gifDiv);
        }
      });
  });
}

// This function handles events where the add movie button is clicked
$("#add-gif").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var gif = $("#gif-input").val().trim();

    // The movie from the textbox is then added to our array
    gifCats.push(gif);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  // Adding click event listeners to all elements with a class of "movie"
  $(document).on("click", ".gif", displayMovieInfo);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();


function renderButtons() {

   
    $("#buttons-view").empty();
    // Loops through the array of movies
    for (var i = 0; i < gifCats.length; i++) {
        
      // Then dynamicaly generates buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adds a class of movie to our button
      a.addClass("gif");
      // Added a data-attribute
      a.attr("data-person", gifCats[i]);
      // Provided the initial button text
      a.text(gifCats[i]);
      // Added the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }

 
 
  