import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Bracelet} from '../_models/Bracelet';

@Injectable({
  providedIn: 'root'
})
export class BraceletService {

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Bracelet[]>(`${environment.apiUrl}/bracelets`);
  }

  unPairDevice(braceletid: string) {
    return this.http.get<string>(`${environment.apiUrl}/bracelet/unpair/${braceletid}`);
  }

  pairDevice(braceletid: string, userid: string) {
    return this.http.get<string>(`${environment.apiUrl}/bracelet/affect/${braceletid}/to/${userid}`);
  }

}
