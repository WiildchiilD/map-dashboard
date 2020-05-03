import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models/User';
import {environment} from '../../environments/environment';
import {Model} from '../_models/Model';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Model[]>(`${environment.apiUrl}/models`);
  }

}
