import { Component, OnInit } from '@angular/core';
import { TransferService } from 'src/app/transfer.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewrequests',
  templateUrl: './viewrequests.component.html',
  styleUrls: ['./viewrequests.component.css']
})
export class ViewrequestsComponent implements OnInit {

  patients:any[]=[];
  currentUser:any[];
  acceptdata:any;
  status:string;
  constructor(private hc:HttpClient,private ts:TransferService, private router:Router) { }
  ngOnInit() {
    this.hc.get(`/doctordashboard/viewrequests/${this.ts.currentUsername[0].name}`).subscribe(res=>{
      
      if(res['message']=="unauthorized access")
      {
        alert(res['message']);
        console.log(res['message'])
        this.router.navigate(['/nav/login'])
      }
      else{
        this.patients=res['message'];
      }
    })
    this.currentUser=this.ts.currentUsername; 
  }
  accept(data,appdate,apptime)
  {
    data.reqstatus="request accepted";

    this.ts.setResponse(data).subscribe(res=>{
      //alert(res['message'])
    })
    var acceptedrequests={
      "rqt":"",
      "appdate":appdate,
      "apptime":apptime,
      "patientname": data.patientname,
      "patientnumber":data.patientnumber,
      "patientemail":data.patientemail,
      "patientarea":data.patientarea,
      "doctorname":this.currentUser[0].name,
      "doctornumber":this.currentUser[0].number,
      "doctoremail":this.currentUser[0].email,
      "doctorarea":this.currentUser[0].area,
      "doctorspec":this.currentUser[0].specialization,
      "doctorexp":this.currentUser[0].experience

     

    }
    this.hc.put('/doctordashboard/viewdoctors',acceptedrequests).subscribe((res)=>{
      alert(res['message'])
    })
    this.hc.post('/doctordashboard/viewrequests',acceptedrequests).subscribe((res)=>{
      alert(res['message']);


      
    })

  }
  reject(data)
  {
    data.reqstatus="request rejected";
    this.ts.setResponse(data).subscribe(res=>{
      alert(res['message'])
    })
  }
}
