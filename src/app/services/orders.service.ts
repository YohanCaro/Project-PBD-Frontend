import { Injectable } from '@angular/core';

import axios from 'axios';
import { AxiosInstance } from "axios";
import { URL_TABLES } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private axiosClient!: AxiosInstance;
  productData : any={};

  constructor() {

  }

  async getTable(text:string) {
    return axios.get(URL_TABLES + text)
  }

}
