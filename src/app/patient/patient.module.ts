import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import {PatientDashboardModule } from './patient-dashboard/patient-dashboard.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PatientRoutingModule,
    PatientDashboardModule
  ]
})
export class PatientModule { }
