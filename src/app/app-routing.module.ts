import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import {UsersComponent} from './users/users.component';
import {BraceletsComponent} from './bracelets/bracelets.component';

const routes: Routes = [
  {path: '', component: MapComponent },
  { path: 'dashboard', component: MapComponent },
  { path: 'users', component: UsersComponent },
  { path: 'bracelets', component: BraceletsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
