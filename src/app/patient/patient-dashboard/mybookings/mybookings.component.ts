import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferService } from 'src/app/transfer.service';

@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.component.html',
  styleUrls: ['./mybookings.component.css']
})
export class MybookingsComponent implements OnInit {

  constructor(private hc:HttpClient, private ts:TransferService) { }
  bookings:any;
  ngOnInit() {
    this.hc.get(`/patientdashboard/mybookings/${this.ts.currentUsername[0].name}`).subscribe(res=>{
      this.
      bookings=res['message'];
    })
  }

}
