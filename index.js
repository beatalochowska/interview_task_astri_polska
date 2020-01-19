import "ol/ol.css";
import { Map, View } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { defaults as defaultControls, ScaleLine } from "ol/control";
import TileWMS from "ol/source/TileWMS";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { Draw, Snap } from "ol/interaction";

const layers = [
  new TileLayer({
    source: new TileWMS({
      url: "https://ahocevar.com/geoserver/wms",
      params: {
        LAYERS: "ne:NE1_HR_LC_SR_W_DR",
        TILED: true
      }
    })
  })
];

const raster = new TileLayer({
  source: new OSM()
});

var source = new VectorSource();
var vector = new VectorLayer({
  source: source,
  style: new Style({
    fill: new Fill({
      color: "rgba(255, 255, 255, 0.2)"
    }),
    image: new CircleStyle({
      radius: 7,
      fill: new Fill({
        color: "#ffcc33"
      })
    })
  })
});

const map = new Map({
  controls: defaultControls().extend([
    new ScaleLine({
      units: "degrees"
    })
  ]),
  layers: [raster, vector],
  target: "map",
  view: new View({
    projection: "EPSG:3857",
    center: [0, 0],
    zoom: 2
  })
});

var draw, snap; // global so we can remove them later

function addInteractions() {
  draw = new Draw({
    source: source,
    type: "Point"
  });
  map.addInteraction(draw);
  snap = new Snap({ source: source });
  map.addInteraction(snap);
}

addInteractions();
