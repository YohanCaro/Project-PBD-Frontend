import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from "@angular/common/http";

import { URL_QUERIES, URL_TABLES } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) {

  }

  getTable(text:string) {
    return this.http.get<any>(URL_TABLES + text,{})
  }

  getQuery(text:string) {
    let params = new HttpParams().set('filter', 12);
    return this.http.get<any>(URL_QUERIES + text,
      { params: params}
    )
  }

  postQuery(text:string, data:string) {
    let par = new HttpParams().set('filter', data);
    return this.http.post<any>(URL_QUERIES + text, par,
      { params: par}
    )
  }

}
