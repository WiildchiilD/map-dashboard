import {Component, AfterViewInit, ViewChild, ElementRef, OnInit} from '@angular/core';
import {ScriptLoadService} from '../script-load.service';
import {FirebaseApp} from 'angularfire2';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs';

const your_API_key = 'AIzaSyAwVnwE1bEZf_Bkk_pSkGM0XlBSXJocVUY';
const url = `https://maps.googleapis.com/maps/api/js?key=${your_API_key}&libraries=geometry`;
import * as $ from 'jquery';
import {UserService} from '../_services/users.service';
import {LocationHistoryService} from '../_services/location-history.service';
import {forEach} from '@angular/router/src/utils/collection';
import {MatSidenav} from '@angular/material';

declare var ol: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  latitude = 12.674897;
  longitude = 42.6384761;

  map: any;

  events: string[] = [];
  opened: false;

  markersRef: AngularFireList<any>;
  markers: Observable<any[]>;
  markersArray: Array<any> = [];
  distanceArray: Array<any>;
  infowindow: any;

  locationHistory = [];

  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild('mapElement') mapElm: ElementRef;

  constructor(private locationService: LocationHistoryService) {

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
        zoom: 3,
        minZoom: 2,
      })
    });

    this.loadLocations();


    this.map.on('click', () => {
      this.sidenav.close();
    });

    this.map.on('click', (evt) => {
      this.map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => {

        console.log(layer.N.identifier);
        this.getInfoWithID(layer.N.identifier);

      });
    });


    // this.addPoint(this.latitude, this.longitude,"");

  }


  loadLocations() {
    this.locationService.getAll().subscribe(locations => {
      console.log(locations);
      this.locationHistory = locations;
      this.pinLocations();
    });
  }

  pinLocations() {
    this.clearAll();
    this.locationHistory.forEach(location => {
      if (location != null) {
        console.log('Adding location  : ' + location.longitude + ' - ' + location.latitude);
        this.addPoint(Number(location.longitude), Number(location.latitude), location._id);
      }
    });
  }

  getInfoWithID(id: String) {
    const history = this.locationHistory.filter(hist => hist._id === id);
    console.log(history);
    this.sidenav.open();
  }

  clearAll() {
    this.markersArray.forEach(item => {
      this.map.removeLayer(item);
    });
    this.markersArray = [];
  }

  setCenter() {
    const view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat([this.longitude, this.latitude]));
    view.addMarker(ol.proj.fromLonLat([this.longitude, this.latitude]));
    view.setZoom(8);
  }

  addPoint(lat: number, lng: number, identifier: String) {
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

    vectorLayer.set('identifier', identifier);

    this.map.addLayer(vectorLayer);

    this.markersArray.push(vectorLayer);

  }

}
