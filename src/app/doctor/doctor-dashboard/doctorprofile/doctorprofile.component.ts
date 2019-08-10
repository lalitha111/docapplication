import { Component, OnInit } from '@angular/core';
import { TransferService } from 'src/app/transfer.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-doctorprofile',
  templateUrl: './doctorprofile.component.html',
  styleUrls: ['./doctorprofile.component.css']
})
export class DoctorprofileComponent implements OnInit {

  constructor(private ts:TransferService,private hc:HttpClient) { }
  currentUser:any;

currectUser=this.ts.currentUsername[0].name;
objectToUpdate:any;
b:boolean=true;


  ngOnInit() {
    //console.log(this.register.currentUsername)
    this.hc.get(`doctordashboard/profile/${this.currectUser}`).subscribe(res=>{
      this.currentUser=res['data']}
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
