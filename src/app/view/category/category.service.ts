import { Injectable } from '@angular/core';
import {HttpParams, HttpClient, HttpHeaders} from '@angular/common/http';
import { PathAPI } from '../../common/api_apth';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient,
  ) { }
  categoryParrent = '';

  getListCategory() {
    return this.http.get(PathAPI.GET_CATEGORIES);
  }

  getListSubCategory(categorySiteId) {
    const params = new HttpParams().set('categoryId', categorySiteId);
    // @ts-ignore
    return this.http.get(PathAPI.GET_CATEGORIES, {params});
  }
}
