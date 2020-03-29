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
    getListShopee(catId, loadMore) {
        const param = new HttpParams()
        .set('categoryId', catId)
        .set('loadMore', loadMore);
        return this.http.get(PathAPI.GET_GERSHOPEEPRODUCT, {params: param});
    }
}
