import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferService } from 'src/app/transfer.service';

@Component({
  selector: 'app-myappointments',
  templateUrl: './myappointments.component.html',
  styleUrls: ['./myappointments.component.css']
})
export class MyappointmentsComponent implements OnInit {

  constructor(private hc:HttpClient, private ts:TransferService) { }
  bookings:any;

  ngOnInit() {
    this.hc.get(`/doctordashboard/myappointments/${this.ts.currentUsername[0].name}`).subscribe(res=>{
      this.
      bookings=res['message'];
    })
  }

}
