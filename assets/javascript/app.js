$(document).ready(function() {

    var disneyChar = [
    "Aladdin",
    "Belle",
    "Captain Hook",
    "Chernabog",
    "Cinderella",
    "Cruella deVil",
    "Evil Queen",
    "Jack Skellington",
    "Maleficent",
    "Mickey Mouse",
    "Minnie Mouse",
    "Simba",
    "Timon",
    "Ursula"
];

function renderButtons () {
  $("#characters").empty();

  for (var i = 0; i < disneyChar.length; i++) {
    var a = $("<button>");
    a.addClass("character");
    a.attr("data-name", disneyChar[i]);
    a.text(disneyChar[i]);
    $("#characters").append(a);
  }
}
function addNewButton() {
  $("#add-character").on("click", function (event) {
    event.preventDefault();
    var character = $("#character-input").val().trim();
    $("#character-input").val("")
    if (character == "") {
        return false;
    }

    disneyChar.push(character);

    renderButtons();
  
    return false;

  })
}


function displayCharInfo() {
  $("#gifs-appear-here").empty();
  var character = $(this).attr("data-name");
  var queryURL = 
  "https://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=YHliQajpvzitiejwcdK5HJXqQBLCQWy4&limit=12";
  
  $.ajax ({
    url: queryURL,
    method: "GET"

  }).then(function(response) {
    
    var results = response.data;
    
    for (var i = 0; i < results.length; i++) {

      var gifDiv = $("<div>");
      gifDiv.addClass("col-lg-4");

      var gifImage = $("<img width='100%' height='300px'>");

      if (results[i].rating !== "r" && results[i].rating !=="pg-13" && results[i].rating !=="y")

      gifImage.attr("src", results[i].images.fixed_height_still.url);
      gifImage.attr("data-still", results[i].images.fixed_height_still.url);
      gifImage.attr("data-animate", results[i].images.fixed_height.url);
      gifImage.attr("data-state", "still");
      gifImage.addClass("image");

      gifDiv.append(gifImage);

      $("#gifs-appear-here").prepend(gifDiv);

      var gifRating = $("<p id='center'>").text("Rating " + results[i].rating);
      gifDiv.append(gifRating);
    }
  });
}
renderButtons();
addNewButton();

$(document).on("click", ".character", displayCharInfo);

$(document).on("click", ".image", function() {
      
  var state = $(this).attr("data-state");
    if (state==="still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");

    } else  {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");       
    }

  });

});
          
