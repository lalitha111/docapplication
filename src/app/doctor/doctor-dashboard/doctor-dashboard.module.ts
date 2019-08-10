import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorDashboardRoutingModule } from './doctor-dashboard-routing.module';
import { DoctorDashboardComponent } from './doctor-dashboard.component';
import { DoctorprofileComponent } from './doctorprofile/doctorprofile.component';
import { ViewrequestsComponent } from './viewrequests/viewrequests.component';
import { SearchPipe } from './search.pipe';
import { PaymentstatusComponent } from './paymentstatus/paymentstatus.component';
import { MyappointmentsComponent } from './myappointments/myappointments.component';

@NgModule({
  declarations: [DoctorDashboardComponent, DoctorprofileComponent, ViewrequestsComponent, SearchPipe, PaymentstatusComponent, MyappointmentsComponent],
  imports: [
    CommonModule,
    DoctorDashboardRoutingModule,
    FormsModule
  ]
})
export class DoctorDashboardModule { }
