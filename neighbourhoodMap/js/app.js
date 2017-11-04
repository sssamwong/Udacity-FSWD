$(document).ready(function(){
	$('.sidebarBtn').click(function(){
		$('.sidebar').toggleClass('active');
		$('.sidebarBtn').toggleClass('toggle');
	})
})

var map;
function initMap() {
	// Constructor creates a new map
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 22.2817824, lng: 114.1567264},
		zoom: 12
	});
}
