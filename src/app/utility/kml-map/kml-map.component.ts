import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from "@angular/core";
import * as Leaflet from "leaflet";
import * as geojson from "geojson";
import {ToastrService} from "ngx-toastr";


Leaflet.Icon.Default.imagePath = "assets/";
@Component({
    selector: 'app-kml-map',
    templateUrl: './kml-map.component.html',
    styleUrls: ['./kml-map.component.scss'],
    standalone: true
})

export class KmlMapComponent {
    @Input() coordinates = [];
    @Input() locationName: string = "";
    map!: any;

    primaryColor!: string;

    constructor () { }
    ngOnInit () {
        // Get the computed value of the --primary-color variable
        this.primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--bs-primary');

        // console.log(`Primary Color: ${this.primaryColor}`);
    }

    ngAfterViewInit (): void {

        if (this.coordinates.length > 0) {
            //Create Map
            const minLat = this.coordinates[0];
            const minLng = this.coordinates[2];
            const maxLat = this.coordinates[1];
            const maxLng = this.coordinates[3];

            // Calculate other two corners
            const corner1 = Leaflet.latLng(minLat, minLng);
            const corner2 = Leaflet.latLng(maxLat, minLng);
            const corner3 = Leaflet.latLng(maxLat, maxLng);
            const corner4 = Leaflet.latLng(minLat, maxLng);


            //Create Map
            this.map = Leaflet.map("map", {
                center: Leaflet.latLng(corner1),
                zoom: 7,
            });

            var openStreetLayer = new Leaflet.TileLayer(
                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                {
                    minZoom: 4,
                    maxZoom: 18,
                    attribution:
                        '<a href=”http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                }
            );
            openStreetLayer.addTo(this.map);
            const boundingBox = Leaflet.polygon([corner1, corner2, corner3, corner4, corner1], {
                color: `${ this.primaryColor }`,
                fillColor: `${ this.primaryColor }`,
                fillOpacity: 0.3,
            }).addTo(this.map);

            boundingBox.bindPopup(this.locationName);
            this.map.fitBounds(boundingBox.getBounds());

        }
    }

}
