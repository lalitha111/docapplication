import { Component, OnInit } from '@angular/core';
import { TransferService } from 'src/app/transfer.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctorprofile',
  templateUrl: './doctorprofile.component.html',
  styleUrls: ['./doctorprofile.component.css']
})
export class DoctorprofileComponent implements OnInit {

  constructor(private ts:TransferService,private hc:HttpClient,private router:Router) { }
  currentUser:any;

currectUser=this.ts.currentUsername[0].name;
objectToUpdate:any;
b:boolean=true;


  ngOnInit() {
    //console.log(this.register.currentUsername)
    this.hc.get(`doctordashboard/profile/${this.currectUser}`).subscribe(res=>{
      
      if(res['message']=="unauthorized access")
      {
        alert(res['message']);
        console.log(res['message'])
        this.router.navigate(['/nav/login'])
      }
      else{
        this.currentUser=res['message']
      }
    }
    )
    
  }
  edit(data)
    {
      this.objectToUpdate=data;
      console.log(this.objectToUpdate);  
      
        this.b=false;
      
    }
    submitEditData(modifiedData){
      this.hc.put('doctordashboard/profile',modifiedData).subscribe(res=>{
        alert(res["message"])
    })
    this.b=true;
    }

}
