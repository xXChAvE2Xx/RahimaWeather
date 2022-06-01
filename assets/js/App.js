const fetchWeather = () => {
  const zipcode = document.getElementById('zip').value;
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},mx&appid=${config.appikey}&lang=es&units=metric`;

  fetch(url)
    .then((res) => {
      if (res.status != '200') {
        console.log(res.status);
      } else {
        return res.json();
      }
    })
    .then((data) => {
      let temp = data.main.temp;
      let desc = data.weather[0].description;
      let city = data.name;
      let icon = data.weather[0].icon;

      let feelsLike = data.main.feels_like;
      let pressure = data.main.pressure;
      let humidity = data.main.humidity;
      let seaLevel = data.main.sea_level;

      currentWeather(temp, desc, city, icon);
      infoWeather(feelsLike, pressure, humidity, seaLevel);
    });
};

const currentWeather = (temp, desc, city, urlIcon) => {
  const spanTemp = document.getElementById('temp');
  const spanCity = document.getElementById('city');
  const spanDesc = document.getElementById('desc');
  const imgIcon = document.getElementById('icono');

  spanTemp.innerText = temp;
  spanCity.innerText = city;
  spanDesc.innerText = desc;
  imgIcon.src = `http://openweathermap.org/img/wn/${urlIcon}@2x.png`;
};

const infoWeather = (feelsLike, pressure, humidity, seaLevel) => {
  const pFeelsLike = document.getElementById('feels_like');
  const pPressure = document.getElementById('pressure');
  const pHumidity = document.getElementById('humidity');
  const pSeaLevel = document.getElementById('sea');

  pFeelsLike.innerText = feelsLike;
  pPressure.innerText = pressure;
  pHumidity.innerText = humidity;
  pSeaLevel.innerText = seaLevel;
};
