import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PoliciesComponent} from './policies/policies.component';
import {ChartPolicyDetailsComponent} from './chart-policy-details/chart-policy-details.component';

const routes: Routes = [
  {
    path: 'policies',
    component: PoliciesComponent,
    canActivate: []
  },
  {
    path: 'chart',
    component: ChartPolicyDetailsComponent,
    canActivate: []
  },
  { path: '**', redirectTo: '/policies' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
