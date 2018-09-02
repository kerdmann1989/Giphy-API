
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
    if (character == "") {
        return false;
    }
    disneyChar.push(character);

    renderButtons();
    return false;
  })
}

  function displayCharInfo() {
    var character = $(this).attr("data-name");
    var queryURL = 
    "https://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=YHliQajpvzitiejwcdK5HJXqQBLCQWy4&limit=10";
    
    $.ajax ({
      url: queryURL,
      method: "GET"

    }).then(function(response) {

        // $("#gifs-appear-here").empty();
     
      var results = response.data;

      console.log(response.data)

    //   if (results = "") {
    //       alert("Sorry - there is no gif for your request");
    //   }
      
      for (var i = 0; i < results.length; i++) {

        var gifDiv = $("<div>");
        // var gifRating = $("<p>").text("Rating " + results[i].rating);

        // gifDiv.append(gifRating);
        // console.log(gifRating)

      var gifImage = $("<img>");
      console.log("?")
    //   $("<img id = 'gifimg' class='unit'>");  
        gifImage.attr("src", results[i].images.fixed_height_still.url);
         // gifImage.attr({'data-state': "animate"})
         gifImage.attr("data-still", results[i].images.fixed_height_still.url);
         gifImage.attr("data-animate", results[i].images.fixed_height.url);
         gifImage.attr("data-state", "still");
         gifImage.addClass("image");

         gifDiv.append(gifImage);

         
      
         $("#gifs-appear-here").prepend(gifDiv);

      
      }
    });
}
renderButtons();
addNewButton();


        

    //     gifImage.attr({
    //       "data-animate", results[i].images.fixed_height.url,
    //       'data-state': "still",
    //       "data-still", results[i].images.fixed_height_still.url
    //    });
       
            

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

    // gifDiv.append(gifImage);
    $(document).on("click", ".character", displayCharInfo);

        
    // $("#gifs-appear-here").prepend(gifImage);

    $(".image").on("click", ".image", function() {
       
        var state = $(this).attr("data-state");
        if (state==="still") {
        
           
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");

        } else  {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          
            if (results[i].rating !== "r" && results[i].rating !=="pg-13")
        }

    });

});
          

// $(document).on("click", ".character", displayCharInfo);
   
// renderButtons();

// });