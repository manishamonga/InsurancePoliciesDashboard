import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IPolices} from '../policies/policies-data-access.service';
export interface IPolicyChartData {
  month: number;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class PolicyChartDetailsService {

  // tslint:disable-next-line:variable-name
  private readonly _baseURI: string = 'http://localhost:3000/api/chartData';

  // tslint:disable-next-line:variable-name
  constructor(private _httpClient: HttpClient) { }

  public getPoliciesChartData(region?: string): Observable<IPolicyChartData[]> {
    if (region) {
      return this._httpClient
        .get<IPolicyChartData[]>(this._baseURI, {
          params: new HttpParams().set('region', region)
        });
    } else {
      return this._httpClient
        .get<IPolicyChartData[]>(this._baseURI);
    }
  }
}
