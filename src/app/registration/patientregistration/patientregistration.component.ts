import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { observable } from 'rxjs';

@Component({
  selector: 'app-patientregistration',
  templateUrl: './patientregistration.component.html',
  styleUrls: ['./patientregistration.component.css']
})
export class PatientregistrationComponent implements OnInit {

  constructor(private router: Router,private hc:HttpClient) { }

  ngOnInit() {
  }

  patientReg(data){
    this.hc.post('nav/register/patient',data).subscribe((res)=>{
      
      if(res["message"]=="registration success")
      {
        alert(res["message"])
        this.router.navigate(['nav/login/'])
      }
      else if(res["message"]=="Duplicate Username")
      {
        alert('name already exists')
      }
    })
   
  }

}
