import {Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {LocationHistoryService} from '../_services/location-history.service';
import {MatSidenav, MatTableDataSource, MatDialog} from '@angular/material';
import {Bracelet} from '../_models/Bracelet';
import {User} from '../_models/User';
import {History} from '../_models/History';
import {ActivatedRoute} from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { EmailComposerComponent } from '../email-composer/email-composer.component';
import { FormControl, Validators } from '@angular/forms';

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

  markers: Observable<any[]>;
  markersArray: Array<any> = [];
  distanceArray: Array<any>;
  infowindow: any;

  locationHistory = [];

  currentSelectedHistory: History;

  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild('mapElement') mapElm: ElementRef;

  displayedColumns: string[] = ['place', 'time' , 'locate'];
  dataSource = new MatTableDataSource([]);

  closeResult = '';


  constructor(
    public dialog: MatDialog,
    private locationService: LocationHistoryService,
    private route: ActivatedRoute
  ) {

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

    this.loadLocations(function (instance) {
      const braceletId = instance.route.snapshot.params['braceletid'];
      if (braceletId) {
        console.log('Received id to locate' + braceletId);
        instance.loadWithBraceletID(braceletId);
      }
    });


    this.map.on('click', () => {
      this.sidenav.close();
    });

    this.map.on('click', (evt) => {
      this.map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => {
        console.log(layer);
        this.getInfoWithID(layer.N.identifier);
        this.setCenter(layer.N.lat, layer.N.lng);
      });
    });


  }



  openDialog(): void {
    const dialogRef = this.dialog.open(EmailComposerComponent, {
      width: '400px',
      data: 'THIS IS AN EMAIL COMPOSER'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked');
        // DO SOMETHING
      }
    });
  }

  loadWithBraceletID(id: string) {
    try {
      console.log(this.locationHistory);
      const braceletHistory: History = this.locationHistory.filter(history =>
        // console.log(history[0]);
        history.bracelet._id === id
      )[0];

      this.getInfoWithID(braceletHistory._id);
      this.setCenter(Number(braceletHistory.latitude), Number(braceletHistory.longitude));
    } catch (e) {

    }
  }

  loadLocations(callback: (any) => void) {
    this.locationService.getAll().subscribe(locations => {
      console.log(locations);
      this.locationHistory = locations;
      this.pinLocations();
      callback(this);
    });
  }

  pinLocations() {
    this.clearAll();
    this.locationHistory.forEach(location => {
      if (location != null) {
        console.log('Adding location  : ' + location.longitude + ' - ' + location.latitude);
        this.addPoint(Number(location.latitude), Number(location.longitude), location._id);
      }
    });
  }

  getInfoWithID(id: String) {
    const history = this.locationHistory.filter(hist => hist._id === id);
    console.log(history[0]);
    this.currentSelectedHistory = history[0];

    console.log(this.currentSelectedHistory.bracelet._id);
    this.locationService.getAllById(this.currentSelectedHistory.bracelet._id).subscribe(locations => {
        var histyies : History[] = [];
        Object.assign(histyies,locations);
        console.log(histyies);
        this.dataSource = new MatTableDataSource(histyies);
      })

    this.loadSideNavWithUser(history[0].user, history[0].bracelet);
    this.sidenav.open();
  }

  getBraceletHistory(id: string) {
    return this.locationService.getAllById(id);
  }

  loadSideNavWithUser(user: User, bracelet: Bracelet) {

  }

  clearAll() {
    this.markersArray.forEach(item => {
      this.map.removeLayer(item);
    });
    this.markersArray = [];
  }

  setCenter(lat: number, lng: number) {
    const view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat([lng, lat]));
    // view.addMarker(ol.proj.fromLonLat([this.longitude, this.latitude]));
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
    vectorLayer.set('lat', lat);
    vectorLayer.set('lng', lng);


    this.map.addLayer(vectorLayer);

    this.markersArray.push(vectorLayer);

  }

  locateCurrentSelected() {
    console.log(this.currentSelectedHistory.latitude, this.currentSelectedHistory.longitude);
    this.setCenter(Number(this.currentSelectedHistory.latitude), Number(this.currentSelectedHistory.longitude));
  }

  getRowHistory(row: any) {
    console.log(row._id);
  }
}
