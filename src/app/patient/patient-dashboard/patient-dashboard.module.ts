import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientDashboardRoutingModule } from './patient-dashboard-routing.module';
import { PatientDashboardComponent } from './patient-dashboard.component';
import { PatientprofileComponent } from './patientprofile/patientprofile.component';
import { ViewdoctorsComponent } from './viewdoctors/viewdoctors.component';
import { SearchPipe } from './search.pipe';
import { FormsModule } from '@angular/forms';

import { MakepaymentComponent } from './makepayment/makepayment.component';
import { PaymenthistoryComponent } from './paymenthistory/paymenthistory.component';
import { MybookingsComponent } from './mybookings/mybookings.component';

@NgModule({
  declarations: [PatientDashboardComponent, PatientprofileComponent, ViewdoctorsComponent, SearchPipe, MakepaymentComponent, PaymenthistoryComponent, MybookingsComponent],
  imports: [
    CommonModule,
    PatientDashboardRoutingModule,
    FormsModule
  ]
})
export class PatientDashboardModule { }
