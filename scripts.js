const getCurrent = async(lat,lon)=>{
    console.log(`In current ${
        lat,
        lon
    }`);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=cdbf4c47896d6a9d1bf49f14382cbc78`);
    // get the body out of the response
   const weather = await response.json(); 
   ///log the data
   $(".current").append($(`<h1>${weather.name}</h1>`));
   const myImage = $(`<img>`);
   myImage.attr('src',`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
   $(".current").append(myImage);
   $(".current").append($(`<p>Temp: ${weather.main.temp}</p>`));
   $(".current").append($(`<p>Wind: ${weather.wind.speed}</p>`));
   $(".current").append($(`<p>Humidity: ${weather.main.humidity}</p>`));
   console.log(weather);
   console.log(weather.name);
   console.log(weather.main.temp);
   console.log(weather.wind.speed);
}
//get 5 day forecast
const getfiveday = async(lat,lon)=>{
    console.log(`city ${
        lat,
        lon
    }`);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=cdbf4c47896d6a9d1bf49f14382cbc78`);
    // get the body out of the response
   const forecast = await response.json(); 
   console.log(forecast);

   var start = dayjs().add(1, "day").startof("day").unix();
   var end = dayjs().add(6, "day").startof("day").unix();
   ///log the data
  
   $(".Forecast").append($(`<div>${forecast.list[0].dt_txt}</div>`));
   $(".Forecast").append($(`<div>${forecast.list[0].main.temp}</div>`));
   $(".Forecast").append($(`<div>${forecast.list[0].wind.speed}</div>`));
   $(".Forecast").append($(`<div>${forecast.list[0].main.humidity}</div>`));
   
 //  const Image = $(`<img>`);
  // Image.attr('src',`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
//$(".Forecast").append(Image);
  // $(".Forecast").append($(`<p>Temp: ${weather.main.temp}</p>`));
  // $(".Forecast").append($(`<p>Wind: ${weather.wind.speed}</p>`));
  // $(".Forecast").append($(`<p>Humidity: ${weather.main.humidity}</p>`));
  // console.log(weather);
  // console.log(weather.name);
 //  console.log(weather.main.temp);
  // console.log(weather.wind.speed);
 
   }
 

//}
     

const getCoords=  async(city) =>{
console.log(city);
 const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=cdbf4c47896d6a9d1bf49f14382cbc78`);
 // get the body out of the response
const data = await response.json();
// get our values
const lat = data[0].lat;
const lon = data[0].lon;

 getCurrent(lat, lon);
 getfiveday(lat, lon);
}



//listen for a click
$(".weather_btn").on("click",()=>{
    // get the value form the form
    $(".current").empty();
    // get the coords
    getCoords($(".city").val());
    //pass the coords to the current weather
    // get the weather on th epage
});