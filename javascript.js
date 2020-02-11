$("document").ready(function(){
    var url = "https://www.anapioficeandfire.com/api/houses"
    var request = new XMLHttpRequest()
    request.open("GET", url, true)
    request.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            for(var response of JSON.parse(this.responseText)){
                //console.log(response)
                var house = "<div class='house'>"
                house+="<h1>"+response.name+"</h1>"
                house+="<h2>"+response.region+"</h2>"
                house+="<input type='hidden' value='"+JSON.stringify(response)+"'>"
                $("#houses").append(house)
            }
        }else if(this.readyState == 4 && this.status == 404){
            alert("Error contactando API")
        }
    }
    request.send()
})

$(document).on("click",".house",function(){
    var details = JSON.parse($(this).children().last().val())
    $("#details p")[0].innerText = "Name: " + details.name
    $("#details p")[1].innerText = "Region: " + details.region
    if(details.words.length == 0){
        $("#details p")[2].innerText = "Words: None"
    }else{
        $("#details p")[2].innerText = "Words: " + details.words
    }
    if(details.titles.length == 1 && details.titles[0].length==0){
        $("#details p")[4].innerText = "None"
    }else{
        $("#details p")[4].innerText = ""
        for(var title of details.titles)
            $("#details p")[4].innerText += title + " - "
            $("#details p")[4].innerText = $("#details p")[4].innerText.slice(0,$("#details p")[4].innerText.length-3)
    }
    $("#modal").fadeIn()
})