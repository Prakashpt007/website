
import {Component, Input} from "@angular/core";
import * as Leaflet from "leaflet";
import * as geojson from "geojson";


function polystyle (feature: any) {
    return {
        fillColor: '#2935e8',
        weight: 2,
        opacity: 1,
        color: 'white',  //Outline color
        fillOpacity: 0.5
    };
}

@Component({
    selector: 'app-geo-plot-template',
    standalone: true,
    imports: [],
    templateUrl: './geo-plot-template.component.html',
    styleUrls: ['./geo-plot-template.component.scss']
})


export class GeoPlotTemplateComponent {
    @Input() geoJson!: {type: string; features: {type: string; properties: {}; geometry: {coordinates: number[][][]; type: string;};}[];};
    map!: any;

    constructor () { }
    ngOnInit () {
    }

    ngAfterViewInit (): void {

        if (this.geoJson != undefined) {

            this.map = Leaflet.map("map", {
                center: Leaflet.latLng(
                    this.geoJson.features[0].geometry.coordinates[0][0][1],
                    this.geoJson.features[0].geometry.coordinates[0][0][0]
                ),
                zoom: 16,
            });
            var openStreetLayer = new Leaflet.TileLayer(
                // "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png",
                // "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                "http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}",
                {minZoom: 3, maxZoom: 18, attribution: 'google'}

                // https://stackoverflow.com/questions/34595374/how-to-use-a-different-tile-provider-in-openlayer3
            );
            openStreetLayer.addTo(this.map);
            // End

            // Add KML to the Map
            this.addGeoJSonKml(this.geoJson);
        }
    }

    addGeoJSonKml (data: any) {
        var geoJsonFeatures: geojson.FeatureCollection = data;
        Leaflet.geoJSON(geoJsonFeatures, {style: polystyle}).addTo(this.map);
    }

}
