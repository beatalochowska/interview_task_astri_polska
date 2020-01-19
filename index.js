import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { toLonLat } from "ol/proj";
import Draw from "ol/interaction/Draw";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";

const raster = new TileLayer({
  source: new OSM()
});

const source = new VectorSource({ wrapX: false });

const vector = new VectorLayer({
  source: source
});

const map = new Map({
  layers: [raster, vector],
  target: "map",
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

map.on("click", function(evt) {
  const lat4326 = evt.coordinate[1];
  const lon4326 = evt.coordinate[0];
  const coords = toLonLat(evt.coordinate);
  const lat3857 = coords[1];
  const lon3857 = coords[0];
  const locTxt4326 = "Latitude: " + lat4326 + " Longitude: " + lon4326;
  const locTxt3857 = "Latitude: " + lat3857 + " Longitude: " + lon3857;

  document.getElementById("clickedPoint3857").innerHTML = locTxt3857;
  document.getElementById("clickedPoint4326").innerHTML = locTxt4326;
});

function addInteraction() {
  const draw = new Draw({
    source: source,
    type: "Point"
  });

  map.addInteraction(draw);
}

addInteraction();
