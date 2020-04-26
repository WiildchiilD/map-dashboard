import {Component, AfterViewInit, ViewChild, ElementRef, OnInit} from '@angular/core';
import {ScriptLoadService} from '../script-load.service';
import {FirebaseApp} from 'angularfire2';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs';

const your_API_key = 'AIzaSyAwVnwE1bEZf_Bkk_pSkGM0XlBSXJocVUY';
const url = `https://maps.googleapis.com/maps/api/js?key=${your_API_key}&libraries=geometry`;

declare var ol: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  latitude = 18.5204;
  longitude = 73.8567;

  map: any;

  // maps: any;
  // map: any;
  markersRef: AngularFireList<any>;
  markers: Observable<any[]>;
  markersArray: Array<any>;
  distanceArray: Array<any>;
  furthest: string;
  telAviv: any;
  infowindow: any;

  @ViewChild('mapElement') mapElm: ElementRef;

  constructor(private load: ScriptLoadService, private db: AngularFireDatabase) {

    this.markersRef = this.db.list('/markers');
    this.markers = this.markersRef.snapshotChanges(['child_added']);
    this.markersArray = [];
    this.distanceArray = [];
    this.furthest = null;
  }

  ngOnInit() {
    const mousePositionControl = new ol.control.MousePosition({
      coordinateFormat: ol.coordinate.createStringXY(4),
      projection: 'EPSG:4326',
      // comment the following two lines to have the mouse position
      // be placed within the map.
      className: 'custom-mouse-position',
      target: document.getElementById('mouse-position'),
      undefinedHTML: '&nbsp;'
    });


    this.map = new ol.Map({
      target: 'map',
      controls: ol.control.defaults({
        attributionOptions: {
          collapsible: false
        }
      }).extend([mousePositionControl]),
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([73.8567, 18.5204]),
        zoom: 8
      })
    });

    this.map.on('click', function (args) {
      console.log(args.coordinate);
      const lonlat = ol.proj.transform(args.coordinate, 'EPSG:3857', 'EPSG:4326');
      console.log(lonlat);

      const lon = lonlat[0];
      const lat = lonlat[1];
      alert(`lat: ${lat} long: ${lon}`);
    });

    this.addPoint(this.latitude, this.longitude);

  }

  setCenter() {
    const view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat([this.longitude, this.latitude]));
    view.addMarker(ol.proj.fromLonLat([this.longitude, this.latitude]));
    view.setZoom(8);
  }

  addPoint(lat: number, lng: number) {
    const vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857')),
        })]
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 0.5],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          src: 'assets/img/marker-30.png'
        })
      })
    });
    this.map.addLayer(vectorLayer);
  }

}
