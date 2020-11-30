import { Component, OnInit } from '@angular/core';
import {IPolicyChartData, PolicyChartDetailsService} from './policy-chart-details.service';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';


@Component({
  selector: 'app-chart-policy-details',
  templateUrl: './chart-policy-details.component.html',
  styleUrls: ['./chart-policy-details.component.scss']
})
export class ChartPolicyDetailsComponent implements OnInit {
  public selectedRegion = 'Select a Region';
  public regions = ['North', 'South', 'East', 'West'];
  public policyData: IPolicyChartData[] = [];
  public yaxisArr = [];
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: this.yaxisArr, label: 'Policies bought per month' }
  ];
  public barChartColors: Array<any> = [
    {  backgroundColor: '#bc5090'}
];

  // tslint:disable-next-line:variable-name
  constructor(private _policyChartDetailsService: PolicyChartDetailsService) {
    this._fetchPolicyDetails();
  }

  ngOnInit() {
  }

  public filterRegion(region: string): void {
  if (this.barChartLabels && this.yaxisArr) {
    this.barChartLabels = [];
    this.yaxisArr = [];
  }
  this.selectedRegion = region;
  this._fetchPolicyDetails(this.selectedRegion);
  }

  private _fetchPolicyDetails(params?: string): void {
    this._policyChartDetailsService.getPoliciesChartData(params).subscribe(policies => {
      policies.map(policyData => {
        const monthName = this._getMonthNameFromMonthNumber(policyData.month);
        this.barChartLabels.push(monthName);
        this.yaxisArr.push(policyData.count);
      });
    });
  }

  private _getMonthNameFromMonthNumber(monthNumber): string {
    // tslint:disable-next-line:prefer-const
    let monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December' ];
    return monthNames[monthNumber - 1];
  }

}
