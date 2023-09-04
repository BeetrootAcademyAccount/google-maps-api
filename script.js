const submit = document.querySelector("#submitCity");
const showPath = document.querySelector("#showPath");
let map;
let sourceAutocomplete;
let destinationAutocomplete;
let directionsService;
let directionsRenderer;

function initMap() {
  const location = { lat: -25.5, lng: 131.4 };
  const mapSelector = document.getElementById("map");
  map = new google.maps.Map(mapSelector, {
    zoom: 4,
    center: location,
  });

  placeMarker(location, map);

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.set(map);
  sourceAutocomplete = new google.maps.places.Autocomplete(
    document.getElementById("source")
  );
  destinationAutocomplete = new google.maps.places.Autocomplete(
    document.getElementById("destination")
  );
  showPath.addEventListener("click", () => {
    calculateRoute(directionsRenderer);
  });
}

//Add marker by city
submit.addEventListener("click", () => {
  const city = document.getElementById("city").value;
  console.log(city);
  geocodeCity(city);
});

//Add route

function geocodeCity(city) {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: city }, (results, status) => {
    if (status === "OK" && results.length > 0) {
      var location = results[0].geometry.location;
      placeMarker(location, map);
    } else {
      console.log("Geocode was not successful");
    }
  });
}

function placeMarker(location, map) {
  const marker = new google.maps.Marker({
    position: location,
    map: map,
  });

  map.setCenter(location);
}

function calculateRoute(dRenderer) {
  const source = document.getElementById("source").value;
  const destination = document.getElementById("destination").value;
  console.log(source, destination);
  const request = {
    origin: source,
    destination: destination,
    travelMode: "DRIVING",
  };
  directionsService.route(request, (result, status) => {
    console.log(result);
    if (status === "OK") {
      dRenderer.setDirections(result);
    } else {
      console.log("Unable to get route");
    }
  });
}
