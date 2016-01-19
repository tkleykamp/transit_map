// set up the map center and zoom level
var map = L.map('map', {
  center: [41.76, -72.67], // [41.5, -72.7] for Connecticut; [41.76, -72.67] for Hartford county or city
  zoom: 10, // zoom 9 for Connecticut; 10 for Hartford county, 12 for Hartford city
  zoomControl: false // add later to reposition
});

// optional : customize link to view source code; add your own GitHub repository
map.attributionControl
.setPrefix('View <a href="http://github.com/OpenDataCT/transit_map">code on GitHub</a>, created with <a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');

var controlLayers = L.control.layers( null, null, {
  position: "bottomright", // suggested: bottomright for CT (in Long Island Sound); topleft for Hartford region
  collapsed: false // false = open by default
}).addTo(map);


// optional: reposition zoom control other than default topleft 
L.control.zoom({position: "topright"}).addTo(map); 

var lightAll = new L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', { 
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>' 
}).addTo(map); //this displays layer by default 
controlLayers.addBaseLayer(lightAll, 'CartoDB LightAll'); 

//transit data source
var endpointURL = "http://65.213.12.244/realtimefeed/vehicle/vehiclepositions.json";

// Load data from JSON feed (insert your endointURL above), display with clickable blue markers
$.getJSON(endpointURL, function (data) {
  // Create new layerGroup for the markers, with option to append ".addTo(map);" to display by default
  var layerGroup = new L.LayerGroup();
  // Add layerGroup to your layer control and insert your label to appear in legend
  controlLayers.addOverlay(layerGroup, 'JSON feed - blue markers'); // Insert your own legend label
  // Start a loop to insert JSON data into container
  for (var i = 0; i < entity.vehicle.position.length; i++) {
    var container = entity.vehicle.position[i];
    var marker = new L.marker([container.latitude, container.longitude]);
    // marker.bindPopup(popupHTML(container));
    // Add the marker to the layerGroup
    marker.addTo(layerGroup);
  }
});
