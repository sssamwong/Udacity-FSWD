$(document).ready(function(){
	$('.sidebarBtn').click(function(){
		$('.sidebar').toggleClass('active');
		$('.sidebarBtn').toggleClass('toggle');
		$('#map').toggleClass('comeOut');
	})
})

// Default point of interests

var initialPOI = [
	{localLanguage: '雲南小鍋米線', title: 'Wannam Siu Wok Noodle', location: {lat: 22.370813, lng: 114.1357875}},
	{localLanguage: '', title: 'Espuma', location: {lat: 22.299594, lng: 114.1723658}},
	{localLanguage: '大勝軒 丸一', title: 'Taishoken Maruichi', location: {lat: 22.2865469, lng: 114.2164531}},
	{localLanguage: '炑八韓烤', title: 'Meokbang Korean BBQ & Bar', location: {lat: 22.2799897, lng: 114.1820578}},
	{localLanguage: '北京樓', title: 'Peking Garden Restaurant', location: {lat: 22.3577271, lng: 114.1264391}},
	{localLanguage: '七輪燒肉', title: 'Yakiniku Shichirin', location: {lat: 22.2814449, lng: 114.1253643}},
	{localLanguage: '', title: 'Beeger2', location: {lat: 22.2838502, lng: 114.1254129}}
]

var map;
// Create a new blank array for all listing markers
var markers = [];

function initMap() {
	// Constructor creates a new map
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 22.2817824, lng: 114.1567264},
		zoom: 11
	});

	var defaultIcon = makeMarkerIcon('0091ff');
	var bounds = new google.maps.LatLngBounds();
	var largeInfoWindow = new google.maps.InfoWindow();

	//Looping through the array of POI to intialize the markers
	for (var i = 0; i < initialPOI.length; i++) {
		var position = initialPOI[i].location;
		var title = initialPOI[i].title;

		var marker = new google.maps.Marker({
			map: map,
			position: position,
			title: title,
			animation: google.maps.Animation.DROP,
			id: i
		})
		//Push the marker to the markers array
		markers.push(marker);
		// Extend the boundaries of the map for each marker
		bounds.extend(marker.position);
		// Create click event for each infowindow
		marker.addListener('click', function(){
			populateInfoWindow(this, largeInfoWindow);
		})
		map.fitBounds(bounds);
	}

	function makeMarkerIcon(markerColor) {
		var markerImage = new google.maps.MarkerImage(
			'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor + 
			'|40|_|%E2%80%A2',
			new google.maps.Size(21, 34),
			new google.maps.Point(0, 0),
			new google.maps.Point(10, 34),
			new google.maps.Size(21,34));
		return markerImage;
	}

}

// This populates the infowindow when the marker is clicked. Only one infowindow will open based on the marker position..
function populateInfoWindow(marker, infowindow) {
	if (infowindow.marker != marker) {
		infowindow.marker = marker;
		infowindow.setContent('<div>' + marker.title + '</div>');
		infowindow.open(map, marker);
		// Clear the marker property when the infowindow is closed
		infowindow.addListener('closeclick', function(){
			infowindow.setMarker(null);
		});
	}
}

var model = function() {
	this.showClickedInfoWindow = function (marker){
		var position = marker.location;
		var title = marker.title;
		var infoWindow = new google.maps.InfoWindow();
		var clickedMarker = new google.maps.Marker({
			map: map,
			position: position,
			title: title,
		});
		populateInfoWindow(clickedMarker, infoWindow);
	}
}

var viewModel = function() {
	var self = this;

	self.poiList = ko.observableArray([]);

	initialPOI.forEach(function(poiItem){
		self.poiList.push(poiItem);
	});

	self.showInfoWindow = function(poi){
		console.log(this);
		new model().showClickedInfoWindow(this);
//		model().showClickedInfoWindow(this);
	};

}

ko.applyBindings(new viewModel())
