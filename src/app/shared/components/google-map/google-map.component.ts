import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  DoCheck,
} from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

const location = { lat: 41.78, lng: 44.8 };

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit {
  private map: google.maps.Map | undefined;
  @Input() doctorsQuantity: number = 0;

  constructor() {}

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    let loader = new Loader({
      apiKey: 'AIzaSyBmol-76ApjsIFXrmeVAHpeCMEG-n1q2k8',
    });
    loader
      .load()
      .then((google) => {
        this.map = new google.maps.Map(
          document.getElementById('map') as HTMLDivElement,
          {
            center: location,
            zoom: 14,
            mapTypeId: 'hybrid',
            heading: 90,
            tilt: 45,
            styles: [],
          }
        );
        return google;
      })
      .then((google) => {
        for (let i = 0; i < this.doctorsQuantity; ++i) {
          new google.maps.Marker({
            position: {
              lat: location.lat + Math.random() * 0.01,
              lng: location.lng + Math.random() * 0.01,
            },
            map: this.map,
          });
        }
      });
  }
}
