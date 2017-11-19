$(function(){
	$('.sidebarBtn').click(function(){
		$('.sidebar').toggleClass('active');
		$('.sidebarBtn').toggleClass('toggle');
		$('#map').toggleClass('comeOut');
	});
})

// Default point of interests

var initialPOI = [
	{title: 'Wannam Siu Wok Noodle', location: {lat: 22.370813, lng: 114.1357875}, ref: 0, url: true},
	{title: 'Tsim Sha Tsui Espuma', location: {lat: 22.299594, lng: 114.1723658}, ref: 1, url: true},
	{title: 'Taishoken Maruichi', location: {lat: 22.2865469, lng: 114.2164531}, ref: 2, url: true},
	{title: 'Meokbang Korean BBQ & Bar', location: {lat: 22.2799897, lng: 114.1820578}, ref: 3, url: true},
	{title: 'Kwai Fong Peking Garden Restaurant', location: {lat: 22.3577271, lng: 114.1264391}, ref: 4, url: true},
	{title: 'Yakiniku Shichirin', location: {lat: 22.2814449, lng: 114.1253643}, ref: 5, url: true},
	{title: 'Beeger2', location: {lat: 22.2838502, lng: 114.1254129}, ref: 6, url: true},
	{title: 'Solera Spanish Cuisine Concepts', location: {lat: 22.2967212, lng: 114.014821}, ref: 7, url: true}
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

	//Looping through the array of POI to intialize the markers
	for (var i = 0; i < initialPOI.length; i++) {
		var position = initialPOI[i].location;
		var title = initialPOI[i].title;
		var id = initialPOI[i].ref;

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
			markerClickedHandler(this);
		});
		map.fitBounds(bounds);
	}
}

// This do a nearby search that will use title
function searchPOI(marker) {
	var bounds = map.getBounds();
	var placesService = new google.maps.places.PlacesService(map);
	placesService.textSearch({
		query: marker.title,
		bounds: bounds
	}, function(results, status){
		if (status === google.maps.places.PlacesServiceStatus.OK){
			createMarkersForPlaces(results[0]);
		}
	})
}

function createMarkersForPlaces(places){
	var bounds = new google.maps.LatLngBounds();
	var placeInfoWindow = new google.maps.InfoWindow();
	var place = places;
	var icon = {
		url: place.icon,
		size: new google.maps.Size(0,0),
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(3, 35),
		scaledSize: new google.maps.Size(25,25)
	};
	// Create a marker for each place.
	var marker = new google.maps.Marker({
		map: map,
		icon: icon,
		title: place.name,
		position: place.geometry.location,
		id: place.place_id
	})
	getPlacesDetails(marker, placeInfoWindow);
}

// This is the place details search
function getPlacesDetails(marker, infowindow) {
	var service = new google.maps.places.PlacesService(map);
	service.getDetails({
		placeId: marker.id
	}, function(place, status){
		if (status === google.maps.places.PlacesServiceStatus.OK){
			infowindow.marker = marker;
			var infoWindowHTML = '<div>';
			if (place.name) {
				infoWindowHTML += '<strong>' + place.name + '</strong>';
			}
			if (place.photos) {
				infoWindowHTML += '<br><br><img src="' + place.photos[0].getUrl(
					{maxHeight: 150, maxWidth: 300}) + '">';
			}
			infoWindowHTML += '</div>';
//			console.log('here' + marker.getPosition().lat());
			infowindow.setContent(infoWindowHTML);
			infowindow.open(map, marker);
			infowindow.addListener('closeclick', function() {
				infowindow.marker = null;
			});
		}
	})
}

// AJAX for the infowindow using foursquare API

function addingFoursquareAPI (marker){
	var client_id= 'SQBOBMCCS1DFBV1OKHWLHZDOFEAM1IM3AJRFBJQVXZGW5FNP';
	var client_secret= '2FXHOQ053U4F3ZIPMG442CVSFJD0ZJXZMG5J0KBLZQR3LFGH';
	var requestURL = 'https://api.foursquare.com/v2/venues/explore?';
	var d = new Date();
	var todayYYYYMMDD = d.getFullYear()+ '' + (d.getMonth()+1) + '' + d.getDate();
	var place = marker.title;

	$.ajax({
		dataType: 'jsonp',
		url: requestURL + 'll=' + marker.getPosition().lat() + ',' + marker.getPosition().lng() + '&query=' + marker.title + '&client_id=' + client_id + '&client_secret=' + client_secret + '&v=' + todayYYYYMMDD,
		success: function(data) {
			console.log('hello');
		}
	})
};

// This function sets the marker to bounce when it's clicked
function toggleBounce(marker) {
	if (marker.getAnimation() !== null) {
		marker.setAnimation(null);
	} else {
		marker.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function(){
			marker.setAnimation(null);
		}, 1000);
	}
};

// This function handle the click the marker click event
function markerClickedHandler(marker){
	searchPOI(marker);
	toggleBounce(marker);
	addingFoursquareAPI(marker);
	map.setZoom(12);
	map.setCenter(marker.getPosition());
}

function hideMarkers() {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	};
}

function showMarkers(rawMarker) {
	var bounds = new google.maps.LatLngBounds();
	for (var i = 0; i < rawMarker.length; i++) {
		var position = rawMarker[i].location;
		var title = rawMarker[i].title;
		var id = rawMarker[i].ref;

		var marker = new google.maps.Marker({
			map: map,
			position: position,
			title: title,
			id: id
		})
		markers.push(marker);
		marker.addListener('click', function(){
			markerClickedHandler(this);
		});
//		marker.setMap(map);
		bounds.extend(marker.position);
	}
}

var model = function() {
	this.showClickedInfoWindow = function (marker){
		console.log(marker);
		var infoWindow = new google.maps.InfoWindow();
		markerClickedHandler(marker, infoWindow)
	}

	this.hideMarkers = function(marker) {
		hideMarkers(marker);
	}

	this.showMarkers = function(rawMarker){
		showMarkers(rawMarker);
	}
}

var viewModel = function() {
	var self = this;

	self.poiList = ko.observableArray([]);
	self.userSearchKey = ko.observable('');

	initialPOI.forEach(function(poiItem){
		self.poiList.push(poiItem);
	});

	self.showInfoWindow = function(poi){
		clickedMarkerRef = poi.ref;
		new model().showClickedInfoWindow(markers[clickedMarkerRef]);
	};

	self.filterPOI = ko.computed(function() {
		var search = self.userSearchKey().toLowerCase();
		return ko.utils.arrayFilter(self.poiList(), function(poi){
			return poi.title.toLowerCase().indexOf(search) >= 0;
		});
	});

	self.updateMarkers = function(){
		new model().hideMarkers();
		new model().showMarkers(self.filterPOI());
	}
}

ko.applyBindings(new viewModel());
