import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { PathAPI } from '../../common/api_path';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

  constructor(
    private http: HttpClient,
  ) { }

  getShopeeProductDetail(itemId, shopId) {
    const param = new HttpParams()
      .set('itemId', itemId)
      .set('shopId', shopId);
    return this.http.get(PathAPI.GET_SHOPEE_PRODUCT_DETAIL, { params: param });
  }
}
