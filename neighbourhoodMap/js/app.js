$(document).ready(function(){
	$('.sidebarBtn').click(function(){
		$('.sidebar').toggleClass('active');
		$('.sidebarBtn').toggleClass('toggle');
		$('#map').toggleClass('comeOut');
	})
})

var initialPOI = [
	{localLanguage: '雲南小鍋米線', title: 'Wannam Siu Wok Noodle', location: {lat: 22.370813, lng: 114.1357875}},
	{localLanguage: '', title: 'Espuma', location: {lat: 22.299594, lng: 114.1723658}},
	{localLanguage: '大勝軒 丸一', title: 'Taishoken Maruichi', location: {lat: 22.2865469, lng: 114.2164531,
	{localLanguage: '炑八韓烤', title: 'Meokbang Korean BBQ & Bar', location: {lat: 22.2799897, lng: 114.1820578}},
	{localLanguage: '北京樓', title: 'Peking Garden Restaurant', location: {lat: 22.3577271, lng: 114.1264391}},
	{localLanguage: '七輪燒肉', title: 'Yakiniku Shichirin', location: {lat: 22.2814449, lng: 114.1253643}},
	{localLanguage: '', title: 'Beeger2', location: {lat: 22.2838502, lng: 114.1254129}}
]

var map;
function initMap() {
	// Constructor creates a new map
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 22.2817824, lng: 114.1567264},
		zoom: 12
	});
}


