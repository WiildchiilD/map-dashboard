import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  constructor() {
  }
  login() {
    // this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    // this.afAuth.auth.signOut();
  }
}
