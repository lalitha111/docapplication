import { Component, OnInit } from '@angular/core';
import { TransferService } from 'src/app/transfer.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-paymenthistory',
  templateUrl: './paymenthistory.component.html',
  styleUrls: ['./paymenthistory.component.css']
})
export class PaymenthistoryComponent implements OnInit {
  paymentData:any;
  constructor(private ts:TransferService, private hc:HttpClient) { }

  ngOnInit() {
    this.hc.get(`/patientdashboard/paymenthistory/${this.ts.currentUsername[0].name}`).subscribe(res=>{
      this.paymentData=res['data']
    })
    
  }
  
  

}
