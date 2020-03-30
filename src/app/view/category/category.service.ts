import { Injectable } from '@angular/core';
import {HttpParams, HttpClient, HttpHeaders} from '@angular/common/http';
import { PathAPI } from '../../common/api_path';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient,
  ) { }
  categoryParrent = '';
  listCategories = [
    {
      categoryName: 'Quần Áo',
      categorySiteId: 'TIKI'
    },
    {
      categoryName: 'Quần Áo 1 ',
      categorySiteId: 'TIKI1'
    },
    {
      categoryName: 'Quần Áo 2',
      categorySiteId: 'TIKI2'
    },
    {
      categoryName: 'Quần Áo 3',
      categorySiteId: 'TIKI3'
    },
    {
      categoryName: 'Quần Áo 4',
      categorySiteId: 'TIKI4'
    }
  ]

  getListCategory() {
    return this.http.get(PathAPI.GET_CATEGORIES);
  }

  getListSubCategory(categorySiteId) {
    const params = new HttpParams().set('categoryId', categorySiteId);
    return this.http.get(PathAPI.GET_CATEGORIES, {params});
  }

  getListShop(cId) {
    const params = new HttpParams().set('categoryId', cId);
    return this.http.get(PathAPI.GET_SHOP, {params});
  }
}
