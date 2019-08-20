import { Component, OnInit } from '@angular/core';
import { TransferService } from 'src/app/transfer.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patientprofile',
  templateUrl: './patientprofile.component.html',
  styleUrls: ['./patientprofile.component.css']
})
export class PatientprofileComponent implements OnInit {

  constructor(private ts:TransferService,private hc:HttpClient, private router:Router) { }
  currentUser:any;
  b:boolean=true;
  objectToUpdate:any;
currectUser=this.ts.currentUsername[0].name;


  ngOnInit() {
    //console.log(this.register.currentUsername)
    this.hc.get(`patientdashboard/profile/${this.currectUser}`).subscribe(res=>{
      if(res['message']=="unauthorized access")
      {
        alert(res['message']);
        console.log(res['message'])
        this.router.navigate(['/nav/login'])
      }
      else{
        this.currentUser=res['message'];
      }
      
    }
    )}

    edit(data)
    {
      this.objectToUpdate=data;
      console.log(this.objectToUpdate);  
      
        this.b=false;
      
    }
    submitEditData(modifiedData){
      this.hc.put('patientdashboard/profile',modifiedData).subscribe(res=>{
        alert(res["message"])
    })
    this.b=true;
    }


}
