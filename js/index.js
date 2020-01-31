// const API_Key = "7bb52d1b01a14f94bc2f0c66cf04e18f"
const qURL = "https://newsapi.org/v2/top-headlines?q="
var favorites =[]
$("#btn").on("click", function(){
    var topic = $("#search").val()
    var searchURL = qURL + topic + "&apikey=7bb52d1b01a14f94bc2f0c66cf04e18f"

    $.ajax({
        url: searchURL,
        method: "GET"
    }).then(function (response){
        console.log(response.articles[0])
        var data = response.articles
        for(let i=0;i<data.length;i++){
            var newDiv = $("<div class='box'>")
            var newTitle = $("<a class='title' target='_blank' href='"+ data[i].url +"'>"+ data[i].title + "'</a>")
            var newdescription = $("<p class='description'>"+ data[i].description+"</p>")
            var newButton = $("<button class='follow' data-link="+data[i].url+" data-title="+(data[i].title).toString()+" data-source="+data[i].source.id+">follow</button>")
            var newDate = $("<p class='date'>Last updated: "+data[i].publishedAt+"</p>")
            newDiv.append(newTitle, newdescription, newDate, newButton)
            $("#result").append(newDiv)
        }
        $(document).ready(function(){
            $("button").on("click", function(){
                var favStory = {
                    link: $(this).data("link"),
                    title: $(this).data("title"),
                    source: $(this).data("source")
                } 
                favorites.push(favStory)
                updateFavs(favorites)
                console.log(favorites)
            })
        })
    })
})
function updateFavs(favorites){
    $("#favs").empty()
    for(let i=0;i<favorites.length;i++){
        var newfavBox = $("<div class='favBox'>")
        var newfavTitle = $("<a class='favTitle' href='"+favorites[i].url+"'>"+favorites[i].title+"</a>")
        var newfavSource = $("<p class='favSource'>"+favorites[i].source+"</p>")
        newfavBox.append(newfavTitle, newfavSource)

        $("#favs").append(newfavBox)
    }
}