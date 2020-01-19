import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { toLonLat } from "ol/proj";

import Draw from "ol/interaction/Draw";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";

import { defaults as defaultControls } from "ol/control";
import MousePosition from "ol/control/MousePosition";
import { createStringXY } from "ol/coordinate";

const mousePositionControl4326 = new MousePosition({
  coordinateFormat: createStringXY(4),
  projection: "EPSG:4326",
  // comment the following two lines to have the mouse position
  // be placed within the map.
  className: "custom-mouse-position",
  target: document.getElementById("EPSG:4326"),
  undefinedHTML: "&nbsp;"
});

const mousePositionControl3857 = new MousePosition({
  coordinateFormat: createStringXY(4),
  projection: "EPSG:3857",
  // comment the following two lines to have the mouse position
  // be placed within the map.
  className: "custom-mouse-position",
  target: document.getElementById("EPSG:3857"),
  undefinedHTML: "&nbsp;"
});

const raster = new TileLayer({
  source: new OSM()
});

const source = new VectorSource({ wrapX: false });

const vector = new VectorLayer({
  source: source
});

const map = new Map({
  controls: defaultControls().extend([
    mousePositionControl4326,
    mousePositionControl3857
  ]),
  layers: [raster, vector],
  target: "map",
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

let draw; // global so we can remove it later

map.on("click", function(evt) {
  const coords = toLonLat(evt.coordinate);
  console.log(evt.coordinate);
  const lat4326 = evt.coordinate[1];
  const lon4326 = evt.coordinate[0];
  const lat3857 = coords[1];
  const lon3857 = coords[0];
  const locTxt4326 = "Latitude: " + lat4326 + " Longitude: " + lon4326;
  const locTxt3857 = "Latitude: " + lat3857 + " Longitude: " + lon3857;
  // coords is a div in HTML below the map to display
  document.getElementById("clickedPoint3857").innerHTML = locTxt3857;
  document.getElementById("clickedPoint4326").innerHTML = locTxt4326;
});

function addInteraction() {
  draw = new Draw({
    source: source,
    type: "Point"
  });

  map.addInteraction(draw);
}

addInteraction();
