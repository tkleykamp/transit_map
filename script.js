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


	var dataUrl ="http://65.213.12.244/realtimefeed/vehicle/vehiclepositions.json"

	$.getJSON(dataUrl, function(data, textstatus) {
		$.each(data, function(i, entry) {
		
    L.geoJson(data, {
		onEachFeature: function (feature, layer) {
		layer.bindPopup ('<h4>' + feature.properties.pharmacy + '</h4>' + '</br>' + feature.properties.address + '</br>' + feature.properties.phone)}
	}).addTo(map)
		
		});
	});
