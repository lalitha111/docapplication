import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorDashboardComponent } from './doctor-dashboard.component';
import { DoctorprofileComponent } from './doctorprofile/doctorprofile.component';
import { ViewrequestsComponent } from './viewrequests/viewrequests.component';
import { PaymentstatusComponent } from './paymentstatus/paymentstatus.component';
import { MyappointmentsComponent } from './myappointments/myappointments.component';


const routes: Routes = [
  {
    path: 'doctordashboard',
    component: DoctorDashboardComponent,
    children: [{
      path: 'profile',
      component: DoctorprofileComponent,
    },
    {
      path: 'viewrequests',
      component: ViewrequestsComponent
    },
    {
      path:'myappointments',
      component: MyappointmentsComponent
    },
    {
      path: 'paymentstatus',
      component: PaymentstatusComponent
    }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorDashboardRoutingModule { }
