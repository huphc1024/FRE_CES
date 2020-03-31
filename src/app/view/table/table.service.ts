import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { PathAPI } from '../../common/api_path';
@Injectable({
    providedIn: 'root'
})
export class TableService {
    constructor(
        private http: HttpClient,
    ) { }
    getShopeeProduct(catId, loadMore) {
        const param = new HttpParams()
            .set('categoryId', catId)
            .set('loadMore', loadMore);
        return this.http.get(PathAPI.GET_SHOPEE_PRODUCT, { params: param });
    }

    getTikiProduct(catId, loadMore) {
        const param = new HttpParams()
            .set('categoryId', catId)
            .set('loadMore', loadMore);
        return this.http.get(PathAPI.GET_TIKI_PRODUCT, { params: param });
    }

    getSendoProduct(catId, loadMore) {
        const param = new HttpParams()
            .set('categoryId', catId)
            .set('loadMore', loadMore);
        return this.http.get(PathAPI.GET_SENDO_PRODUCT, { params: param });
    }
}
