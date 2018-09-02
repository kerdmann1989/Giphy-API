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
$(document).ready(function() {

$("#add-character").on("click", function (event) {
    event.preventDefault();
    var character = $("#character-input").val().trim();
    disneyChar.push(character);
    console.log(disneyChar);

    renderButtons();

});

function displayCharInfo() {
    var charName = $(this).attr("data-name");
    var queryURL = 
    "https://api.giphy.com/v1/gifs/search?q=" + charName + "&api_key=YHliQajpvzitiejwcdK5HJXqQBLCQWy4&limit=10";
    
    $.ajax ({
      url: queryURL,
      method: "GET"

    }).then (function(response) {
      var results = response.data;
      
      for (var i = 0; i < results.length; i++) {
          if (results[i].rating !== "r" && results[i].rating !=="pg-13")
          {
            // var gifDiv = $("<div class='item'>");
//NEW
            var gifDiv = $("<div>");
            var gifImage = $("<img id= 'gifimg' class='unit'>");  
            
            gifImage.attr("src", results[i].images.fixed_height_still.url);

            gifImage.attr({
                // storing multiple  urls to same image, one for animated state, and the other
                // a standard still shot \\
                'data-animate': results[i].images.fixed_height.url,
                'data-state': "still",
                'data-still': results[i].images.fixed_height_still.url
            });
            
            // gifDiv.attr({'data-state': "still"})

            // var gifImage = $("<img>");

//NEW
            // var gifImage = $("<img id= 'gifimg'>");

            // gifImage.attr("src", results[i].images.fixed_height_still.url);
//NEW        
//             gifImage.attr({'data-animate': results[i].images.fixed_height.url});
// //NEW
//             gifImage.attr({'data-state' : "still"});
// //NEW
//             gifImage.attr({'data-still' : results[i].images.fixed_height_still.url});

    gifDiv.append(gifImage);
    
    $("#gifs-appear-here").prepend(gifDiv)   
    $(".unit").on("click", function() {
        console.log("HELP")
        
        var state = $(this).attr("data-state");
        if (state==="still") {
        
            $(this).attr("data-state", "animate");
            $(this).attr("src", $(this).attr("data-animate"));
        } else  {
            $(this).attr("data-state", "still");
            $(this).attr("src", $(this).attr("data-still"));
           
        }});
            
     } }
    
    
    })
      }
    ;


$(document).on("click", ".character", displayCharInfo);
   
renderButtons();

//new info -- where to place it above??

});