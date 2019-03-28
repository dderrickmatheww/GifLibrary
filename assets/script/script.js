var gifCats = ["Apex Legends", "Sly Cooper", "German Shepard Dog", "Telltales", "The Office"];


$(document).ready(function(){
function displayGifInfo() {
  $("button").on("click", function () {

    var gifs = $(this).attr("data-person")
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifs + "&api_key=Do0obuG0reFss2eMQBowwUGByV399wqw";
    var stillURL = "https://api.giphy.com/v1/gifs/search?q=" + gifs + "&api_key=Do0obuG0reFss2eMQBowwUGByV399wqw"

    $("#gifs-appear-here").empty();
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          //varibles
          var gifDiv = $("<div class='float-left text-center'>");
          var still = results[i].images.fixed_height_still.url
          var animate = results[i].images.fixed_height.url
          var rating = results[i].rating;
          //grabs rating and sets it to a paragraph tag
          var p = $("<p>").text("Rating: " + rating);
          //grabs the gif and puts it in a img tag
          var personImage = $("<img class='gifs' data-still ='" + still + "' data-animate='" + animate + "' >");
          personImage.attr("src", results[i].images.fixed_height_still.url);
          //places the paragraph tag & the actual gif into the gifDiv
          gifDiv.prepend(p);
          gifDiv.prepend(personImage);
          //Placing the gifDiv into the html and onto the page
          $("#gifs-appear-here").prepend(gifDiv);
        }
        $(".gifs").on("click", function () {
          // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
          var state = $(this).attr("data-state");
          // If the clicked image's state is still, update its src attribute to what its data-animate value is.
          // Then, set the image's data-state to animate
          // Else set src to the data-still value
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });
      });
  });

}

// This function handles events where the add gif button is clicked
$("#add-gif").on("click", function (event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var gif = $("#gif-input").val().trim();

  // The gif from the textbox is then added to our array
  gifCats.push(gif);

  // Calling renderButtons which handles the processing of gifcats array
  renderButtons();
});

// Adding click event listeners to all elements with a class of "gif"
$(document).on("click", ".gif", displayGifInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();


function renderButtons() {


  $("#buttons-view").empty();
  // Loops through the array of gitCats
  for (var i = 0; i < gifCats.length; i++) {

    // Then dynamicaly generates buttons for each gif in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button class= 'btn btn-outline-primary'>");
    // Adds a class of gif to our button
    a.addClass("gif");
    // Added a data-attribute
    a.attr("data-person", gifCats[i]);
    // Provided the initial button text
    a.text(gifCats[i]);
    // Added the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

})

