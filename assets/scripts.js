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
  $(".Forecast").empty();
  console.log(`city ${
        lat,
        lon
    }`);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=cdbf4c47896d6a9d1bf49f14382cbc78`);
    // get the body out of the response
   const forecast = await response.json(); 
   console.log(forecast);
  
   
   const hour12 = forecast.list.filter((list) => list.dt_txt.includes("12:00"));
   console.log(hour12);
   
   
   hour12.forEach((index) => { 
  
  
$(".Forecast").append($(`<div class="col bg-danger m-3 text-center" >



   <p><img src="https://openweathermap.org/img/w/${index.weather[0].icon}.png"/></p>
  <p>${index.dt_txt}</p>
   <p>${index.main.temp}</p>
  <p>${index.wind.speed}</p>
   <p>${index.main.humidity}</p>
   
  </div>`))
  });
   
 
   
 
   }
 

//}
     

const getCoords=  async(city) =>{
console.log(city);
 const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=cdbf4c47896d6a9d1bf49f14382cbc78`);
 // get the body out of the response
const data = await response.json();
// get our values
const lat = data[0].lat;
const lon = data[0].lon;

 getCurrent(lat, lon);
 getfiveday(lat, lon);
 searched();
 displayLocal();
 

}
function searched() {
  let addCity = JSON.parse(localStorage.getItem("newCity"));
  if (!Array.isArray(addCity)) {
    addCity = [];
  }
  addCity.unshift($(".city").val());
  localStorage.setItem("newCity", JSON.stringify(addCity))
  
};

function displayLocal() {
  let localCity = JSON.parse(localStorage.getItem("newCity"));
  console.log(localCity);

  if (localCity) {
      const lastCity = localCity[(localCity = [0])];
      const listCity = $(
          `<button type="button" class="btn btn-warning mb-1">${lastCity}</button>`
      );
      $(".boots").append(listCity);
  }
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