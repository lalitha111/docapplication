import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorDashboardModule } from './doctor-dashboard/doctor-dashboard.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    DoctorDashboardModule
  ]
})
export class DoctorModule { }
