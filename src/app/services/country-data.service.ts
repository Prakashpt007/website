import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CountryDataService {

  constructor(private http: HttpClient) { }

  getCountryData(url: string) {
    // var customHeaders = new HttpHeaders();
    // // You can add other headers if needed
    // customHeaders = customHeaders.set('Authorization', 'Bearer ' + 'dddd');

    return this.http.get(url);



  }

}
