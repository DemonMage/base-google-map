//Global variables
var map;
var autocomplete;
var markers = [];

//Callback function that runs once the map has finished loading
//Reference: https://developers.google.com/maps/documentation/javascript/overview#Loading_the_Maps_API
function initMap() {
  var spaceNeedle = { lat: 47.621041, lng: -122.349363 };
  var mapOptions = {
    zoom: 18,
    center: spaceNeedle,
  };

  map = new google.maps.Map(document.getElementById("map"), mapOptions);

  //Change this to see 45 degree imagery where available
  //Reference: https://developers.google.com/maps/documentation/javascript/reference/map#Map.setTilt
  map.setTilt(0);

  initAutocomplete();
}

//Set up a basic autocomplete widget
//Reference: https://developers.google.com/maps/documentation/javascript/place-autocomplete#add-autocomplete
function initAutocomplete() {
  var options = {
    //Use this to constrain the suggestions
    //Reference: https://developers.google.com/maps/documentation/javascript/place-autocomplete#add-autocomplete:~:text=An%20optional%20AutocompleteOptions%20argument
    //types: [],
    //And use this to set what fields get returned which impacts cost per session
    //fields: [],
  };
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autocomplete"),
    options
  );

  autocomplete.addListener("place_changed", onPlaceChanged);
}

//When the user has selected a place add a marker and move the map to show that location
//Reference: https://developers.google.com/maps/documentation/javascript/place-autocomplete#get-place-information
function onPlaceChanged() {
  var place = autocomplete.getPlace();
  if (place.geometry) {
    map.panTo(place.geometry.location);
    map.setZoom(15);
    addMarker(place.geometry.location, place.formatted_address);
    console.log("Formatted address is: " + place.formatted_address);
    console.log("Place ID is: " + place.place_id);
    console.log("Lat/Long is: " + place.geometry.location);
  } else {
    document.getElementById("address").placeholder = "Enter a location";
  }
}

//Add a marker to a given location
//Reference: https://developers.google.com/maps/documentation/javascript/markers#add
function addMarker(location, markerTitle) {
  var newMarker = new google.maps.Marker({
    position: location,
    map: map,
    title: markerTitle,
  });

  markers.push(newMarker);
}
