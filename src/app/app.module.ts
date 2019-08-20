import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { PatientregistrationComponent } from './registration/patientregistration/patientregistration.component';
import { DoctorregistrationComponent } from './registration/doctorregistration/doctorregistration.component';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';
import { AuthorizationService } from './authorization.service';
import { DoctorsComponent } from './doctors/doctors.component';
import { SearchPipe } from './search.pipe';
import { ContactusComponent } from './contactus/contactus.component';
import { ChangepwdComponent } from './changepwd/changepwd.component';
import { ResetpwdComponent } from './resetpwd/resetpwd.component';
import { OtpComponent } from './otp/otp.component';
import { SampleComponent } from './sample/sample.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ControlMessagesComponent } from './control-messages.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AboutusComponent,
    LoginComponent,
    RegistrationComponent,
    PatientregistrationComponent,
    DoctorregistrationComponent,
    DoctorsComponent,
    SearchPipe,
    ContactusComponent,
    ChangepwdComponent,
    ResetpwdComponent,
    OtpComponent,
    SampleComponent,
    ControlMessagesComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    PatientModule,
    DoctorModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthorizationService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
