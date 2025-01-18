
import {HttpClient} from '@angular/common/http';
import {Component, Input, SimpleChanges} from '@angular/core';
// import {LeafletModule} from '@asymmetrik/ngx-leaflet';
// import * as Leaflet from "leaflet";
import {map, Observable} from 'rxjs';

// Leaflet.Icon.Default.imagePath = "assets/images/";

@Component({
	selector: 'app-location-preview',
	standalone: true,
	// imports: [LeafletModule],
	templateUrl: './location-preview.component.html',
	styleUrl: './location-preview.component.scss'
})
export class LocationPreviewComponent {

	@Input() position!: any;

	// map!: Leaflet.Map;
	// markers: Leaflet.Marker[] = [];
	// options = {
	// 	layers: [
	// 		Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	// 			attribution:
	// 				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	// 		}),
	// 	],

	// 	//   layers: [
	// 	//   Leaflet.tileLayer(
	// 	//     "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
	// 	//     {
	// 	//       attribution:
	// 	//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	// 	//     }
	// 	//   ),
	// 	// ],
	// 	zoom: 16,
	// 	center: {lat: 21.1, lng: 79.1},
	// };

	// constructor (private http: HttpClient) { }
	// ngOnInit (): void { }

	// ngOnChanges (changes: SimpleChanges) {
	// 	if (changes["position"]) {
	// 		let data = changes["position"].currentValue;

	// 		if (data != undefined) {
	// 			this.initMarkers();
	// 			// this.getAddress();

	// 			// console.log(this.getAddress(this.position.lat, this.position.lng));

	// 		}
	// 	}
	// }

	// onMapReady ($event: Leaflet.Map) {
	// 	this.map = $event;
	// }

	// mapClicked ($event: any) {
	// 	console.log($event.latlng.lat, $event.latlng.lng);
	// }

	// markerClicked ($event: any, index: number) {
	// 	console.log($event.latlng.lat, $event.latlng.lng);
	// }

	// markerDragEnd ($event: any, index: number) {
	// 	console.log($event.target.getLatLng());
	// }

	// generateMarker (data: any, index: number) {
	// 	console.log(data);

	// 	return Leaflet.marker(data.position);
	// }

	// initMarkers () {
	// 	if (this.position.constructor.toString().indexOf("Array") > -1) {
	// 		for (let idx = 0; idx < this.position.length; idx++) {
	// 			const initialMarkers = [
	// 				{
	// 					position: this.position[idx],
	// 					draggable: true,
	// 				},
	// 			];
	// 			for (let index = 0; index < initialMarkers.length; index++) {
	// 				const data = initialMarkers[index];
	// 				const marker = this.generateMarker(data, index);
	// 				marker.addTo(this.map).bindPopup(`<b>${ data.position.lat },  ${ data.position.lng }</b>`);
	// 				this.map.panTo(data.position);
	// 				this.markers.push(marker);
	// 			}
	// 		}
	// 	} else {
	// 		const initialMarkers = [
	// 			{
	// 				position: this.position,
	// 				draggable: true,
	// 			},
	// 		];
	// 		for (let index = 0; index < initialMarkers.length; index++) {
	// 			const data = initialMarkers[index];
	// 			const marker = this.generateMarker(data, index);
	// 			marker.addTo(this.map).bindPopup(`<b>${ data.position.lat },  ${ data.position.lng }</b>`);
	// 			this.map.panTo(data.position);
	// 			this.markers.push(marker);
	// 		}
	// 	}
	// }
	// getAddress () {

	// 	this.http.get('https://nominatim.openstreetmap.org/reverse?lat=21.1208725&lon=79.04812622').subscribe({
	// 		next: (response: any) => {
	// 			// console.log(response);

	// 		},
	// 		error (err) {

	// 		},
	// 		complete () {

	// 		},
	// 	});
	// 	// const geocoder = (Leaflet.Control as any).Geocoder.nominatim();
	// 	// return new Promise((resolve, reject) => {
	// 	// 	geocoder.reverse({lat, lng}, this.map.getZoom(), (results: any) =>
	// 	// 		results.length ? resolve(results[0].name) : reject(null)
	// 	// 	);
	// 	// });
	// }


	// // $.get ('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=47.217954&lon=-1.552918', function (data) {
	// // 	console.log(data.address.road);
	// // });
	// // addressLookup (req?: any): Observable<any[]> {
	// // 	let url = `https://nominatim.openstreetmap.org/reverse?format=json&q=${ req }&viewbox=-25.0000%2C70.0000%2C50.0000%2C40.0000&bounded=1`;
	// // 	return this.http.get(url).pipe(
	// // 			map((data: any[]) => data.map((item: any) => new NominatimResponse(
	// // 				item.lat,
	// // 				item.lon,
	// // 				item.display_name
	// // 			))
	// // 			)
	// // 		);
	// // }

}
