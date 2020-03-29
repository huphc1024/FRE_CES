import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PathAPI} from '../common/api_apth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  getLogin() {
    return this.http.get(PathAPI.GET_LOGIN);
  }
}
