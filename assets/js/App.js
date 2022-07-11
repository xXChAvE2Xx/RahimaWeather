document.addEventListener('DOMContentLoaded', function (event) {
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    var crd = pos.coords;
    const urlLatLong = `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=${config.appikey}&lang=es&units=metric`;

    fetchData(urlLatLong);
  }

  function error(err) {
    alertify.error('ERROR(' + err.code + '): ' + err.message);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
});

const fetchWeatherZip = () => {
  const zipcode = document.getElementById('zip').value;
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},mx&appid=${config.appikey}&lang=es&units=metric`;
  fetchData(url);
};

const fetchData = (url) => {
  fetch(url)
    .then((res) => {
      if (res.status != '200') {
        if (res.status == '404') {
          alertify.error(`No se encontro información.`);
        }
        console.log(res.status);
      } else {
        return res.json();
      }
    })
    .then((data) => {
      console.log(data);
      let temp = data.main.temp;
      let desc = data.weather[0].description;
      let city = data.name;
      let icon = data.weather[0].icon;

      let feelsLike = data.main.feels_like;
      let pressure = data.main.pressure;
      let humidity = data.main.humidity;

      currentWeather(temp, desc, city, icon);
      infoWeather(feelsLike, pressure, humidity);
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

const infoWeather = (feelsLike, pressure, humidity) => {
  const pFeelsLike = document.getElementById('feels_like');
  const pPressure = document.getElementById('pressure');
  const pHumidity = document.getElementById('humidity');

  pFeelsLike.innerText = feelsLike;
  pPressure.innerText = pressure + 'hPa';
  pHumidity.innerText = humidity + '%';
};
