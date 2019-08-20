import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferService } from 'src/app/transfer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.component.html',
  styleUrls: ['./mybookings.component.css']
})
export class MybookingsComponent implements OnInit {

  constructor(private hc:HttpClient, private ts:TransferService, private router:Router) { }
  bookings:any;
  ngOnInit() {
    this.hc.get(`/patientdashboard/mybookings/${this.ts.currentUsername[0].name}`).subscribe(res=>{
      
      if(res['message']=="unauthorized access")
      {
        alert(res['message']);
        console.log(res['message'])
        this.router.navigate(['/nav/login'])
      }
      else{
        this.bookings=res['message'];
      }
    })
  }

}
