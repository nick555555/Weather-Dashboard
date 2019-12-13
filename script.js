for (var i = 0; i < localStorage.length; i++)   {
  var inputCity = $(".citySearchBox").val();
  var cityButton = $("<button class='cityButton'>");
  cityButton.text(localStorage.key(i));
  cityButton.attr("data-name", localStorage.key(i));
  $(".prevCitiesDisplay").prepend("<br>");
  $(".prevCitiesDisplay").prepend(cityButton);
} 

var city = localStorage.key(0);
var queryURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + city + "&appid=b27a6231d69cb742aaeccfa4bb63304c";
var queryURLFiveDay = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + city + "&appid=b27a6231d69cb742aaeccfa4bb63304c";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {

  var iconURL = "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png";
  var weatherIcon = $("<img>");
  weatherIcon.attr("src", iconURL);

  var cityName = response.name;
  $(".cityName").text(cityName + " " + moment().format('l') + " ").append(weatherIcon);
  var cityTemp = response.main.temp;
  $(".cityTemp").text("Temperature: " + cityTemp + " " + String.fromCharCode(176) + "F");
  var cityHumid = response.main.humidity;
  $(".cityHumid").text("Humidity: " + cityHumid + "%");
  var windSpeed = response.wind.speed;
  $(".windSpeed").text("Wind Speed: " + windSpeed + " MPH");

        
  var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=b27a6231d69cb742aaeccfa4bb63304c";

  $.ajax({
    url: queryURLUV,
    method: "GET"
  }).then(function(responseUV) {

    var uvIndex = responseUV.value;
    $(".uvIndex").text("UV Index: " + uvIndex);
  })
})

$.ajax({
  url: queryURLFiveDay,
  method: "GET"
}).then(function(responseForecast) {
  for (let i = 1; i < 6; i++) {
    var newCard = $("<div class='card'>");
    var cardBody = $("<div class='card-body'>");
    newCard.append(cardBody);
    var cardTitle = $("<h5 class='card-title'>");
    cardTitle.text(moment().add(i, 'days').format('l'));
    cardBody.append(cardTitle);
    var cardIcon = $("<img>");
    var cardIconURL = "https://openweathermap.org/img/wn/" + responseForecast.list[i].weather[0].icon + ".png";
    cardIcon.attr("src", cardIconURL);
    cardBody.append(cardIcon);
    var cardTemp = $("<p class='card-text'>");
    cardTemp.text("Temp: " + responseForecast.list[i].main.temp +  " " + String.fromCharCode(176) + "F");
    cardBody.append(cardTemp);
    var cardHumid = $("<p class='card-text'>");
    cardHumid.text("Humidity: " + responseForecast.list[i].main.humidity + "%")
    cardBody.append(cardHumid);
    $(".fiveDayForecast").append(newCard);
  }
})

function displayWeatherInfo() {

    $(".fiveDayForecast").empty();

    var city = $(this).attr("data-name");
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + city + "&appid=b27a6231d69cb742aaeccfa4bb63304c";
    var queryURLFiveDay = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + city + "&appid=b27a6231d69cb742aaeccfa4bb63304c";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        var iconURL = "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png";
        var weatherIcon = $("<img>");
        weatherIcon.attr("src", iconURL);

        var cityName = response.name;
        $(".cityName").text(cityName + " " + moment().format('l') + " ").append(weatherIcon);
        var cityTemp = response.main.temp;
        $(".cityTemp").text("Temperature: " + cityTemp + " " + String.fromCharCode(176) + "F");
        var cityHumid = response.main.humidity;
        $(".cityHumid").text("Humidity: " + cityHumid + "%");
        var windSpeed = response.wind.speed;
        $(".windSpeed").text("Wind Speed: " + windSpeed + " MPH");

        
        var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=b27a6231d69cb742aaeccfa4bb63304c";

        $.ajax({
          url: queryURLUV,
          method: "GET"
        }).then(function(responseUV) {

          var uvIndex = responseUV.value;
          $(".uvIndex").text("UV Index: " + uvIndex);
        })
      })

    $.ajax({
      url: queryURLFiveDay,
      method: "GET"
    }).then(function(responseForecast) {
      console.log(responseForecast);
      for (let i = 1; i < 6; i++) {
        var newCard = $("<div class='card'>");
        var cardBody = $("<div class='card-body'>");
        newCard.append(cardBody);
        var cardTitle = $("<h5 class='card-title'>");
        cardTitle.text(moment().add(i, 'days').format('l'));
        cardBody.append(cardTitle);
        var cardIcon = $("<img>");
        var cardIconURL = "https://openweathermap.org/img/wn/" + responseForecast.list[i].weather[0].icon + ".png";
        cardIcon.attr("src", cardIconURL);
        cardBody.append(cardIcon);
        var cardTemp = $("<p class='card-text'>");
        cardTemp.text("Temp: " + responseForecast.list[i].main.temp +  " " + String.fromCharCode(176) + "F");
        cardBody.append(cardTemp);
        var cardHumid = $("<p class='card-text'>");
        cardHumid.text("Humidity: " + responseForecast.list[i].main.humidity + "%")
        cardBody.append(cardHumid);
        $(".fiveDayForecast").append(newCard);
      }
    })
}


$(".search").on("click", function(event) {
  event.preventDefault();
  var inputCity = $(".citySearchBox").val();
  var cityButton = $("<button class='cityButton'>");
  cityButton.text(inputCity);
  cityButton.attr("data-name", inputCity);
  $(".prevCitiesDisplay").prepend("<br>");
  $(".prevCitiesDisplay").prepend(cityButton);
  $(".citySearchBox").val("");
  localStorage.setItem(inputCity, inputCity);
  
  $(".fiveDayForecast").empty();

  var city = inputCity;
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + city + "&appid=b27a6231d69cb742aaeccfa4bb63304c";
  var queryURLFiveDay = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + city + "&appid=b27a6231d69cb742aaeccfa4bb63304c";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    var iconURL = "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png";
    var weatherIcon = $("<img>");
    weatherIcon.attr("src", iconURL);

    var cityName = response.name;
    $(".cityName").text(cityName + " " + moment().format('l') + " ").append(weatherIcon);
    var cityTemp = response.main.temp;
    $(".cityTemp").text("Temperature: " + cityTemp + " " + String.fromCharCode(176) + "F");
    var cityHumid = response.main.humidity;
    $(".cityHumid").text("Humidity: " + cityHumid + "%");
    var windSpeed = response.wind.speed;
    $(".windSpeed").text("Wind Speed: " + windSpeed + " MPH");

        
    var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=b27a6231d69cb742aaeccfa4bb63304c";

    $.ajax({
      url: queryURLUV,
      method: "GET"
    }).then(function(responseUV) {

    var uvIndex = responseUV.value;
    $(".uvIndex").text("UV Index: " + uvIndex);
  })
})

$.ajax({
  url: queryURLFiveDay,
  method: "GET"
}).then(function(responseForecast) {
  for (let i = 1; i < 6; i++) {
    var newCard = $("<div class='card'>");
    var cardBody = $("<div class='card-body'>");
    newCard.append(cardBody);
    var cardTitle = $("<h5 class='card-title'>");
    cardTitle.text(moment().add(i, 'days').format('l'));
    cardBody.append(cardTitle);
    var cardIcon = $("<img>");
    var cardIconURL = "https://openweathermap.org/img/wn/" + responseForecast.list[i].weather[0].icon + ".png";
    cardIcon.attr("src", cardIconURL);
    cardBody.append(cardIcon);
    var cardTemp = $("<p class='card-text'>");
    cardTemp.text("Temp: " + responseForecast.list[i].main.temp +  " " + String.fromCharCode(176) + "F");
    cardBody.append(cardTemp);
    var cardHumid = $("<p class='card-text'>");
    cardHumid.text("Humidity: " + responseForecast.list[i].main.humidity + "%")
    cardBody.append(cardHumid);
    $(".fiveDayForecast").append(newCard);
  }
})
});

$(document).on("click", ".cityButton", displayWeatherInfo);