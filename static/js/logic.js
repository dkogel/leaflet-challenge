
// store geojson link in queryURL

queryURL =  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

//perform a get request to queryURL
d3.json(queryURL).then(data => mapFeatures(data.features));


// create map object
let map = L.map("map", {
    center: [47, -101],
    zoom: 4
});

// add markers to map
// (needs reverse b/c geoJson list coorindates as [LONG, LAT])

function mapFeatures(Data) {
  Data.map( function(d) {
    let coordinates = d.geometry.coordinates
    let lat_long = coordinates.slice(0,2).reverse()
    let depth = coordinates.slice(2,3)
    console.log(depth)
    //indicates magnitude by size and depth by color
    L.circle(lat_long, {
      color: "black",
      fillColor: getColor(depth),
      weight: .1,
      fillOpacity: 1,
      radius: d.properties.mag * 23000
    })
    .addTo(map)

  });
};


function getColor(d) {
  return d > 700  ? '#081d58' :
  d > 350  ? '#253494' :
  d > 175  ? '#225ea8' :
  d > 87.5 ? '#1d91c0' :
  d > 44   ? '#41b6c4' :
  d > 22   ? '#7fcdbb' :
  d > 11   ? '#c7e9b4' :
  d > 5    ? '#edf8b1' :
             '#ffffd9';

};




L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_KEY
}).addTo(map);







