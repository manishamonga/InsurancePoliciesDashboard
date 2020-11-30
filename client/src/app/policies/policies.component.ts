import { Component, OnInit } from '@angular/core';
import {IPolices, IRequestParams, PoliciesDataAccessService} from './policies-data-access.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';

export interface IPolicyColumn {
  field: string;
  header: string;
  sortable?: boolean;
}

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent implements OnInit {
  public cols: IPolicyColumn[];
  public policy = {};
  public updatedPolicy: boolean;
  public policies = [];
  public loading = false;
  public displayDialog: boolean;
  public selectedPolicy: IPolices;
  public myForm: FormGroup = new FormGroup({});
  public searchInput: FormControl = new FormControl('', Validators.maxLength(4));
  public filterBy: string[] = ['Filter on Policy ID', 'Filter on Customer ID'];
  public selectedFilter: string;
  // tslint:disable-next-line:variable-name
  private _params: IRequestParams = {};


  // tslint:disable-next-line:variable-name
  constructor(private _policiesDataAccessService: PoliciesDataAccessService) { }

  ngOnInit() {
    this.searchInput.valueChanges.pipe(debounceTime(1000)).subscribe(data => {
      this._filterCustomerOrder(data, this.selectedFilter);
    } );
    this.cols = [
      { field: 'policyId', header: 'Policy ID', sortable: true },
      { field: 'dateOfPurchase', header: 'DateOf Purchase', sortable: true },
      { field: 'customerId', header: 'Customer ID', sortable: true },
      { field: 'fuelType', header: 'Fuel Type', sortable: false },
      { field: 'vehicleSegment', header: 'Vehicle Segment', sortable: false },
      { field: 'premium', header: 'Premium', sortable: false },
      { field: 'gender', header: 'Gender', sortable: false },
      { field: 'region', header: 'Region', sortable: false }

    ];
    this._fetchPolices();
  }

  private _fetchPolices(params?: IRequestParams): void {
    this._policiesDataAccessService.getPolicies(params).subscribe(policies  => {
      this.policies = policies;
    });
  }

  private _filterCustomerOrder(value?: string, filterValue?: string): void {
    if (value && filterValue === 'Filter on Policy ID') {
      this._params.policyId = value;
    } else if (value && filterValue === 'Filter on Customer ID') {
      this._params.customerId = value;
    } else {
      delete this._params.policyId;
      delete this._params.customerId;
    }
    this.policies = [];
    this._fetchPolices(this._params);
  }

  public onRowSelect(event): void {
    this.updatedPolicy = false;
    this.policy = this.clonePolicy(event.data);
    this.displayDialog = true;
  }

  public clonePolicy(policyData: IPolices): {} {
    const policy = {};
    // tslint:disable-next-line:forin
    for (const prop in policyData) {
      policy[prop] = policyData[prop];
    }
    return policy;
  }

  public async save(policy: IPolices): Promise<void> {
    const updatePolicy = await this._policiesDataAccessService.updateCustomerPolicies(policy).subscribe();
    if (updatePolicy) {
      this.policies = [];
      this._fetchPolices();
    }
    this.policy = null;
    this.displayDialog = false;
  }

  public onFilter(filter?: string): void {
    this.selectedFilter = filter;
    if (this.selectedFilter) {
      this.searchInput.enable({ emitEvent: false });
    }
  }
}



