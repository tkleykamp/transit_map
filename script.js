// set up the map center and zoom level
//initialize the leaflet map, set options and view
    var map = L.map('map');

		L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'

		}).addTo(map);

	

	function onLocationFound(e) {
			var radius = e.accuracy / 2;
			
			L.circleMarker(e.latlng).addTo(map)
				.bindPopup("You are here").openPopup();
			
			
			//L.circle(e.latlng, radius).addTo(map);
		}

		function onLocationError(e) {
			alert(e.message);
		}

		map.on('locationfound', onLocationFound);
		map.on('locationerror', onLocationError);

		map.locate({setView: true, maxZoom: 12});

//transit data source
var endpointURL = "http://65.213.12.244/realtimefeed/vehicle/vehiclepositions.json";

// Load data from JSON feed (insert your endointURL above), display with clickable blue markers
$.getJSON(endpointURL.entity, function (data) {
	$.each(data, function(i, entry)
  // Create new layerGroup for the markers, with option to append ".addTo(map);" to display by default
  var layerGroup = new L.LayerGroup(data);
  // Add layerGroup to your layer control and insert your label to appear in legend
  controlLayers.addOverlay(layerGroup, 'JSON feed - blue markers'); // Insert your own legend label
  // Start a loop to insert JSON data into container
  for (var i = 0; i < entity.vehicle.position; i++) {
    var container = entity.vehicle.position[i];
    var marker = new L.marker([container.latitude, container.longitude]);
    // marker.bindPopup(popupHTML(container));
    // Add the marker to the layerGroup
    marker.addTo(layerGroup);
  }
});
