import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientDashboardComponent } from './patient-dashboard.component';
import { PatientprofileComponent } from './patientprofile/patientprofile.component';
import { ViewdoctorsComponent } from './viewdoctors/viewdoctors.component';
import { MakepaymentComponent } from './makepayment/makepayment.component';
import { PaymenthistoryComponent } from './paymenthistory/paymenthistory.component';
import { MybookingsComponent } from './mybookings/mybookings.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {
    path: 'patientdashboard',
    component: PatientDashboardComponent,
    children: [{
      path: 'profile',
      component: PatientprofileComponent,
    },
    {
      path: 'viewdoctors',
      component: ViewdoctorsComponent
    },
    {
      path: 'mybookings',
      component: MybookingsComponent
    },
    {
      path: 'makepayment',
      component: MakepaymentComponent
    },
    {
      path: 'paymenthistory',
      component: PaymenthistoryComponent
    },
    {
      path:'logout',
      component:LogoutComponent
    }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientDashboardRoutingModule { }
