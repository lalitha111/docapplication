import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-patientregistration',
  templateUrl: './patientregistration.component.html',
  styleUrls: ['./patientregistration.component.css']
})
export class PatientregistrationComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  areas:string[]=['Gachibowli','Shamshabad','Kukatpally','Mallapur','HiTech City','Habsiguda','Jubilee Hills','Secunderabad','Banjara Hills','Manikonda'];
    constructor(private formBuilder: FormBuilder, private router:Router, private hc:HttpClient) { }

    ngOnInit() {
      this.registerForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(11),Validators.pattern]],
        duname: ['', Validators.required,Validators.pattern],
        email: ['', Validators.required,Validators.pattern],
        password: ['', [Validators.required, Validators.minLength(6),Validators.pattern]],
        mobileno: ['', [Validators.required, Validators.minLength(10),Validators.pattern]],
        date: [''],
        gender: [''],
        area: ['', Validators.required]
    });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }


  patientReg(){
    this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        
    this.hc.post('nav/register/patient',this.registerForm.value).subscribe((res)=>{
      
      if(res["message"]=="registration success")
      {
        alert(res["message"])
        this.router.navigate(['nav/login/'])
      }
      else if(res["message"]=="Duplicate name")
      {
        alert('name already exists')
      }
    })

   
  }

}