import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferService } from 'src/app/transfer.service';

@Component({
  selector: 'app-paymentstatus',
  templateUrl: './paymentstatus.component.html',
  styleUrls: ['./paymentstatus.component.css']
})
export class PaymentstatusComponent implements OnInit {
data:any;
  constructor(private hc:HttpClient, private ts:TransferService) { }
paymentData:any;
  ngOnInit() {
    this.hc.get(`/doctordashboard/paymentstatus/${this.ts.currentUsername[0].name}`).subscribe(res=>{
      this.paymentData=res['data']
    })
    
  }

}
