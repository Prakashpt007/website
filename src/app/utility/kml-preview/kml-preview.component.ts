import {Component, Input, SimpleChanges} from '@angular/core';
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
	selector: 'app-kml-preview',
	standalone: true,
	templateUrl: './kml-preview.component.html',
	styleUrl: './kml-preview.component.scss'
})
export class KmlPreviewComponent {

	@Input() data!: {type: string; features: {type: string; properties: {}; geometry: {coordinates: number[][][]; type: string;};}[];};
	@Input() plottedarea!: any;

	map!: any;


	constructor () { }

	ngOnChanges (changes: SimpleChanges) {
		if (changes["data"]) {
			let data = changes["data"].currentValue;

			if (data != undefined) {
				let geoJson = data;

				this.map = Leaflet.map("map", {
					center: Leaflet.latLng(
						geoJson.features[0].geometry.coordinates[0][0][1],
						geoJson.features[0].geometry.coordinates[0][0][0]
					),
					zoom: 18,
				});
				var openStreetLayer = new Leaflet.TileLayer(
					// "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png",
					// "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
					"http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}",
					{minZoom: 14, maxZoom: 20, attribution: 'google'}

					// https://stackoverflow.com/questions/34595374/how-to-use-a-different-tile-provider-in-openlayer3
				);
				openStreetLayer.addTo(this.map);

				this.addGeoJSonKml(geoJson);
			}

		}
	}

	ngOnInit (): void {


	}


	addGeoJSonKml (data: any) {
		var geoJsonFeatures: geojson.FeatureCollection = data;
		Leaflet.geoJSON(geoJsonFeatures, {style: polystyle}).addTo(this.map).bindPopup(`Plotted Area: ${ this.plottedarea }`);

	}
}
