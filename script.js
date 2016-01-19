// set up the map center and zoom level
var map = L.map('map', {
  center: [41.76, -72.67], // [41.5, -72.7] for Connecticut; [41.76, -72.67] for Hartford county or city
  zoom: 10, // zoom 9 for Connecticut; 10 for Hartford county, 12 for Hartford city
  zoomControl: false // add later to reposition
});

// optional : customize link to view source code; add your own GitHub repository
map.attributionControl
.setPrefix('View <a href="http://github.com/OpenDataCT/transit_map">code on GitHub</a>, created with <a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');

// optional: reposition zoom control other than default topleft 
L.control.zoom({position: "topright"}).addTo(map); 

var lightAll = new L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', { 
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>' 
}).addTo(map); //this displays layer by default 
controlLayers.addBaseLayer(lightAll, 'CartoDB LightAll'); 


