$(function(){
	$('.sidebarBtn').click(function(){
		$('.sidebar').toggleClass('active');
		$('.sidebarBtn').toggleClass('toggle');
		$('#map').toggleClass('comeOut');
	});
})

// Default point of interests

var initialPOI = [
	{title: 'Wannam Siu Wok Noodle', district: 'Kwai Chung', location: {lat: 22.370813, lng: 114.1357875}, ref: 0, url: true},
	{title: 'Espuma', district: 'Tsim Sha Tsui', location: {lat: 22.299594, lng: 114.1723658}, ref: 1, url: true},
	{title: 'Taishoken Maruichi', district: 'Taikoo', location: {lat: 22.2865469, lng: 114.2164531}, ref: 2, url: true},
	{title: 'Meokbang Korean BBQ & Bar', district: 'Causeway Bay', location: {lat: 22.2799897, lng: 114.1820578}, ref: 3, url: true},
	{title: 'Peking Garden Restaurant', district: 'Kwai Fong', location: {lat: 22.3577271, lng: 114.1264391}, ref: 4, url: true},
	{title: 'Yakiniku Shichirin', district: 'Kennedy Town', location: {lat: 22.2814449, lng: 114.1253643}, ref: 5, url: true},
	{title: 'Beeger2', district: 'Kennedy Town', location: {lat: 22.2838502, lng: 114.1254129}, ref: 6, url: true},
	{title: 'Solera', district: 'Discovery Bay', location: {lat: 22.2967212, lng: 114.014821}, ref: 7, url: true}
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
		var district = initialPOI[i].district;
		var ref = initialPOI[i].ref;

		var marker = new google.maps.Marker({
			map: map,
			position: position,
			title: title,
			district: district,
			animation: google.maps.Animation.DROP,
			ref: ref
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
		query: marker.title + marker.district,
		bounds: bounds
	}, function(results, status){
		if (status === google.maps.places.PlacesServiceStatus.OK){
			createMarkersForPlaces(results[0]);
		}
	})
}

function createMarkersForPlaces(places){
	var bounds = new google.maps.LatLngBounds();
	var placeInfoWindow = new google.maps.InfoWindow({
		maxWidth:200
	});
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
		id: place.place_id,
	});
	getPlacesDetails(marker, placeInfoWindow);
}

// This is the place details search
function getPlacesDetails(marker, infowindow) {
	var service = new google.maps.places.PlacesService(map);
	var comment = '';
	service.getDetails({
		placeId: marker.id
	}, function(place, status){
		if (status === google.maps.places.PlacesServiceStatus.OK){
			infowindow.marker = marker;
			var infoWindowHTML = '<div>';
			if (place.name) {
				infoWindowHTML += '<strong>' + place.name + '</strong>';
			};
			if (place.photos) {
				infoWindowHTML += '<br><br><img src="' + place.photos[0].getUrl(
					{maxHeight: 150, maxWidth: 300}) + '"><br><br>';
			};
			if (place.formatted_address) {
				infoWindowHTML += '<br><strong>Address</strong>: ' + place.formatted_address + '<br><br>';
			};
			addingFoursquareAPI(marker, infoWindowHTML, infowindow)
			infowindow.addListener('closeclick', function() {
				infowindow.marker = null;
			});
		}
	})
}

// AJAX for the infowindow using foursquare API
function addingFoursquareAPI (marker, infoWindowHTML, infowindow){
	var client_id= 'SQBOBMCCS1DFBV1OKHWLHZDOFEAM1IM3AJRFBJQVXZGW5FNP';
	var client_secret= '2FXHOQ053U4F3ZIPMG442CVSFJD0ZJXZMG5J0KBLZQR3LFGH';
	var requestURL = 'https://api.foursquare.com/v2/venues/explore?&intent=browse&';
	var d = new Date();
	var todayYYYYMMDD = d.getFullYear()+ '' + (d.getMonth()+1) + '' + d.getDate();
	var place = marker.title;
	var foursquareURL = requestURL + 'll=' + marker.getPosition().lat() + ',' + marker.getPosition().lng() + '&query=' + marker.title + '&client_id=' + client_id + '&client_secret=' + client_secret + '&v=' + todayYYYYMMDD + '&radius=250&limit=1';
	var tips;

	$.ajax({
		dataType: 'jsonp',
		url: foursquareURL,
		success: function(data) {
			if (data.response.totalResults != 0) {
				tips = data.response.groups[0].items[0].tips[0].text;
			} else {
				tips = 'Not available';
			}
			infoWindowHTML += '<span><strong>Review</strong>: ' + tips + '</span>';
			infoWindowHTML += '</div>';
			infowindow.setContent(infoWindowHTML);
			infowindow.open(map, marker);
		},
		error: function(){
			alert('Review cannot be loaded!!!')
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
	toggleBounce(marker);
	searchPOI(marker);
	map.setZoom(12);
	map.setCenter(marker.getPosition());
}

// This function hides all the markers
function hideMarkers() {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	};
}

// This function show the relevant the markers
function showMarkers(rawMarker) {
	var bounds = new google.maps.LatLngBounds();
	for (var i = 0; i < rawMarker.length; i++) {
		var position = rawMarker[i].location;
		var title = rawMarker[i].title;
		var ref = rawMarker[i].ref;
		var district = rawMarker[i].district;

		var marker = new google.maps.Marker({
			map: map,
			position: position,
			district: district,
			title: title,
			ref: ref
		})
		markers.push(marker);
		marker.addListener('click', function(){
			markerClickedHandler(this);
		});
		bounds.extend(marker.position);
	}
}

var model = function() {
	this.showClickedInfoWindow = function (marker){
		markerClickedHandler(marker);
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
