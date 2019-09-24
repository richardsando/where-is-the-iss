const api_url =  'https://api.wheretheiss.at/v1/satellites/25544';
// const fetch = require('node-fetch');

const map = L.map('mapid').setView([0, 0], 1);
const myIcon = L.icon({
  iconUrl: './icon.svg',
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
});


let iss = L.marker([0, 0], {icon: myIcon}).addTo(map);

async function getISSData() {  
  map.removeLayer(iss);
  const response = await fetch(api_url);
  const data = await response.json();
  const {latitude, longitude, velocity} =  data;
  console.log(latitude, longitude);
  const lon = document.getElementById('lon');
  const lat = document.getElementById('lat');
  const latText = `${latitude}`;
  const lonText = `${longitude}`;
  const vel = document.getElementById('vel');
  const velText = `${velocity}`;
  vel.innerText = velText;
  lon.innerText = lonText;
  lat.innerText = latText;
  map.setView([latitude,longitude],2);
  map.getZoom();
  
  updateISSMarker(latitude,longitude,myIcon);

  return data;
}

const updateISSMarker = (lat, long, marker) => {
  iss = L.marker([lat, long], {icon: marker}).addTo(map);
  map.addLayer(iss);
};

const mapId = document.getElementById('mapid');

const showMap = () => {
  const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const tiles = L.tileLayer(tileURL, {attribution});
  tiles.addTo(map);
};

// Final Steps: Call your showMap() and getISSData() functions

showMap();
getISSData();
setInterval(getISSData,2000);
// debugger
// getISSData();

// use setInterval to call your getISSData() function every 2000 ms