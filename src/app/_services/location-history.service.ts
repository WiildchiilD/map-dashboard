import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Model} from '../_models/Model';
import {environment} from '../../environments/environment';
import {History} from '../_models/History';

@Injectable({
  providedIn: 'root'
})
export class LocationHistoryService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<History[]>(`${environment.apiUrl}/bracelet/position/all`);
  }
}
