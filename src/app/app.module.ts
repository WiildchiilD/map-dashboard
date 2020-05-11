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
  MatPaginatorModule, MatSelectModule, MatSidenavModule,
  MatSlideToggleModule,
  MatTableModule
} from '@angular/material';
import { ModelsComponent } from './models/models.component';
import { DialogComponent } from './models/dialog/dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModelsService} from './_services/models.service';
import { NavcontentComponent } from './map/navcontent/navcontent.component';
import {TimeagoModule} from 'ngx-timeago';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';


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
    DialogComponent,
    NavcontentComponent,
    ConfirmationDialogComponent
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
    TimeagoModule.forRoot(),
    ReactiveFormsModule,
    MatSelectModule
  ],
  providers: [
    ScriptLoadService,
    UserService,
    ModelsService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [ DialogComponent, ConfirmationDialogComponent ]
})
export class AppModule {
}
