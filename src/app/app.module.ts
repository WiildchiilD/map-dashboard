import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ScriptLoadService} from './script-load.service';

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';

import {AppComponent} from './app.component';
import {MapComponent} from './map/map.component';
import {UsersComponent} from './users/users.component';
import {BraceletsComponent} from './bracelets/bracelets.component';
import {RouterModule, Routes} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';

import {HttpClientModule} from '@angular/common/http';
import {UserService} from './_services/users.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatPaginatorModule, MatSidenavModule,
  MatSlideToggleModule,
  MatTableModule
} from '@angular/material';
import { ModelsComponent } from './models/models.component';
import { DialogComponent } from './models/dialog/dialog.component';
import {FormsModule} from '@angular/forms';
import {ModelsService} from './_services/models.service';


const config = {
  apiKey: '.',
  authDomain: 'yourapp.firebaseapp.com',
  databaseURL: 'https://yourapp.firebaseio.com',
  projectId: 'yourapp',
  storageBucket: 'yourapp.appspot.com',
  messagingSenderId: '.'
};


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    UsersComponent,
    BraceletsComponent,
    ModelsComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    RouterModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    MatSidenavModule,
    MatCheckboxModule,
  ],
  providers: [
    ScriptLoadService,
    UserService,
    ModelsService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [ DialogComponent ]
})
export class AppModule {
}
