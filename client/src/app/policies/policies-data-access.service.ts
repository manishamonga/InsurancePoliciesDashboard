import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';


export interface IPolices {
  policyId: string;
  dateOfPurchase: string;
  customerId: string;
  fuelType: string;
  vehicleSegment: string;
  premium: string;
  collision: number;
  gender: string;
  region: string;
  comprehensive: number;
  bodilyInjuryLiability?: number;
  personalInjuryProtection?: number;
  propertyDamageLiability?: number;
  customerIncomeGroup?: string;
  maritalStatus?: string;
}

export interface IRequestParams {
  policyId?: string;
  customerId?: string;

}

@Injectable({
  providedIn: 'root'
})
export class PoliciesDataAccessService {
  // tslint:disable-next-line:variable-name
  private readonly _baseURI: string = 'http://localhost:3000/api/customers';

  // tslint:disable-next-line:variable-name
  constructor(private _httpClient: HttpClient) { }

  public getPolicies(params?: IRequestParams): Observable<IPolices[]> {
    if (params) {
      let reqParams = new HttpParams();
      if (params.policyId) {
        reqParams = reqParams.set('policyId', params.policyId);
      } else if (params.customerId) {
        reqParams = reqParams.set('customerId', params.customerId);
      }

      return this._httpClient
        .get<IPolices[]>(this._baseURI, {
          params: reqParams
        });
    } else {
      return this._httpClient
        .get<IPolices[]>(this._baseURI);
    }

  }

  public updateCustomerPolicies(policy: IPolices): Observable<any> {
    const customerId = policy.customerId;
    const body = {
      premium: policy.premium
    };
    return this._httpClient.put(this._baseURI + `/${customerId}`, {body});
  }


}
