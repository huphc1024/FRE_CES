import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { PathAPI } from '../../common/api_apth';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient,
  ) { }
  dataCategory = [
    {
      name: 'Clothes',
      title: 'Clothes'
    },
    {
      name: 'Clothes1',
      title: 'Clothes1'
    },
    {
      name: 'Clothes2',
      title: 'Clothes2'
    },
    {
      name: 'Clothes3',
      title: 'Clothes3'
    },
    {
      name: 'Clothes4',
      title: 'Clothes4'
    },
    {
      name: 'Clothes5',
      title: 'Clothes5'
    },
    {
      name: 'Clothes6',
      title: 'Clothes6'
    },
    {
      name: 'Clothes7',
      title: 'Clothes7'
    },
    {
      name: 'Clothes8',
      title: 'Clothes8'
    },
  ];

  getListCategory() {
    return this.http.get(PathAPI.GET_CATEGORIES);
  }
}
