import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { toLonLat } from "ol/proj";
import Draw from "ol/interaction/Draw";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";

const VIEW_DEFAULT_SETTINGS = {
  projection: "EPSG:3857",
  center: [0, 0],
  zoom: 2
};

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
  view: new View(VIEW_DEFAULT_SETTINGS)
});

map.on("click", function(event) {
  const [lon4326, lat4326] = event.coordinate;
  const locTxt4326 = `Latitude: ${lat4326} Longitude: ${lon4326}`;

  const coords = toLonLat(event.coordinate);
  const [lon3857, lat3857] = coords;
  const locTxt3857 = `Latitude: ${lat3857} Longitude: ${lon3857}`;

  document.getElementById("clickedPoint4326").innerHTML = locTxt4326;
  document.getElementById("clickedPoint3857").innerHTML = locTxt3857;
});

map.addInteraction(
  new Draw({
    source: source,
    type: "Point"
  })
);
