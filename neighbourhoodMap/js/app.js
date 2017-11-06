$(document).ready(function(){
	$('.sidebarBtn').click(function(){
		$('.sidebar').toggleClass('active');
		$('.sidebarBtn').toggleClass('toggle');
		$('#map').toggleClass('comeOut');
	})
})

// Default point of interests

var initialPOI = [
	{localLanguage: '雲南小鍋米線', title: 'Wannam Siu Wok Noodle', location: {lat: 22.370813, lng: 114.1357875}, ref: 0},
	{localLanguage: '', title: 'Espuma', location: {lat: 22.299594, lng: 114.1723658}, ref: 1},
	{localLanguage: '大勝軒 丸一', title: 'Taishoken Maruichi', location: {lat: 22.2865469, lng: 114.2164531}, ref: 2},
	{localLanguage: '炑八韓烤', title: 'Meokbang Korean BBQ & Bar', location: {lat: 22.2799897, lng: 114.1820578}, ref: 3},
	{localLanguage: '北京樓', title: 'Peking Garden Restaurant', location: {lat: 22.3577271, lng: 114.1264391}, ref: 4},
	{localLanguage: '七輪燒肉', title: 'Yakiniku Shichirin', location: {lat: 22.2814449, lng: 114.1253643}, ref: 5},
	{localLanguage: '', title: 'Beeger2', location: {lat: 22.2838502, lng: 114.1254129}, ref: 6},
	{localLanguage: '', title: 'Solera Spanish Cuisine Concepts', location: {lat: 22.2967212, lng: 114.014821}, ref: 7}
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

//	var defaultIcon = makeMarkerIcon('0091ff');
	var bounds = new google.maps.LatLngBounds();
	var largeInfoWindow = new google.maps.InfoWindow();

	//Looping through the array of POI to intialize the markers
	for (var i = 0; i < initialPOI.length; i++) {
		var position = initialPOI[i].location;
		var title = initialPOI[i].title;
		var id = initialPOI[i].ref

		var marker = new google.maps.Marker({
			map: map,
			position: position,
			title: title,
			animation: google.maps.Animation.DROP,
			id: id
		})
		//Push the marker to the markers array
		markers.push(marker);
		// Extend the boundaries of the map for each marker
		bounds.extend(marker.position);
		// Create click event for each infowindow
		marker.addListener('click', function(){
			markerClickedHandler(this, largeInfoWindow);
		});

		map.fitBounds(bounds);
	}
}

// This populates the infowindow when the marker is clicked. Only one infowindow will open based on the marker position.
function populateInfoWindow(marker, infowindow) {
	if (infowindow.marker != marker) {
		infowindow.setContent('');
		infowindow.marker = marker;
		infowindow.setContent('<div>' + marker.title + '</div>');
		infowindow.open(map, marker);
		// Clear the marker property when the infowindow is closed
		infowindow.addListener('closeclick', function(){
			infowindow.setMarker(null);
		});
	}
}

// This function sets the marker to bounce when it's clicked
function toggleBounce(marker) {
	if (marker.getAnimation() !== null) {
		marker.setAnimation(null);
	} else {
		marker.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function(){
			marker.setAnimation(null);
		}, 3000);
	}
};

// This function handle the click the marker click event
function markerClickedHandler(marker, infoWindow){
	populateInfoWindow(marker, infoWindow);
	toggleBounce(marker);
	map.setZoom(12);
	map.setCenter(marker.getPosition());
}

var model = function() {
	this.showClickedInfoWindow = function (marker){
		var infoWindow = new google.maps.InfoWindow();
		markerClickedHandler(marker, infoWindow)
	}
}

var viewModel = function() {
	var self = this;

	self.poiList = ko.observableArray([]);

	initialPOI.forEach(function(poiItem){
		self.poiList.push(poiItem);
	});

	self.showInfoWindow = function(poi){
		clickedMarkerRef = poi.ref;
		new model().showClickedInfoWindow(markers[clickedMarkerRef]);
	};

}

ko.applyBindings(new viewModel())
