import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) {

  }

  getTable(text:string) {
    return this.http.get<any>(environment.urlTable + text,{})
  }

  getQuery(text:string) {
    let params = new HttpParams().set('filter', 12);
    return this.http.get<any>(environment.urlQueries + text,
      { params: params}
    )
  }

  postQuery(text:string, data:string) {
    let par = new HttpParams().set('filter', data);
    return this.http.post<any>(environment.urlQueries + text, par,
      { params: par}
    )
  }

  getReport(filter:string, query:string) {
    let params = new HttpParams().appendAll({'filter':filter, 'type':'xlsx', 'query':query})
    let headers = new HttpHeaders().set('Content-Type','application/json')

    return this.http.get<any>(environment.urlReport,
      {params, headers, responseType: 'blob' as 'json'}
    )
  }

  postReport(filter:string, query:string) {
    let params = new HttpParams().appendAll({'filter':filter, 'type':'xlsx', 'query':query})
    let headers = new HttpHeaders().set('Content-Type','application/json')

    return this.http.post<any>(environment.urlReport, {},
      { params: params, headers, responseType: 'blob' as 'json'}
    )
  }

}
