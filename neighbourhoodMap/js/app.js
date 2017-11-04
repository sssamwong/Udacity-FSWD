var map;
function initMap() {
	// Constructor creates a new map
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 22.2860793, lng: 114.2111942},
		zoom: 10
	});
}
